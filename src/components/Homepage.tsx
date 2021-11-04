import React from 'react';

import {
  Alert,
  Box,
  Container,
  Typography,
  Paper
} from '@mui/material'

import {
  LoadingButton
} from '@mui/lab'

import {
  Save as SaveIcon
} from '@mui/icons-material'

import BlueWave from './BlueWave';

import UserLocation from '../models/UserLocation';
import * as LocationService from '../services/LocationService';
import * as WeatherService from '../services/WeatherService';
import { LOCATION_CACHE_KEY, CITY_CACHE_KEY } from '../constants/Cache';
import * as CacheService from '../services/CacheService';
import NearbyCity from '../models/NearbyCity';
import ForecastForm from './ForecastForm';

export default function Homepage () {
  const [location, setLocation] = React.useState<UserLocation | null>(null);
  const [city, setCity] = React.useState<NearbyCity | null>(null);
  const [isLocationBusy, setLocationBusy] = React.useState<boolean>(false);

  const updateExactLocation = () => {
    // set busy state
    setLocationBusy(true);

    // Fetch location
    LocationService.getUserLocation(async (position: GeolocationPosition) => {
      // parse data
      let locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        _accuracy: position.coords.accuracy
      }

      // Update user location
      setLocation(locationData)

      // Update cache location
      CacheService.cacheData(LOCATION_CACHE_KEY, JSON.stringify(locationData), LocationService.getUserLocation)
      
      // get nearby cities
      let data = await WeatherService.getNearbyCities(position.coords.latitude, position.coords.longitude, 1);

      // check if data has been found
      if (data.length > 0) {
        // Set city in react state
        setCity(data[0]);
        // Set city in cache
        CacheService.cacheData(CITY_CACHE_KEY, JSON.stringify(data[0]), WeatherService.getNearbyCities)
      } else {
        // FIXME: add popup message / toast to notiy the user
        console.log("ERROR: NO NEARBY CITY HAS BEEN FOUND")
      }
      // set location busy to false
      setLocationBusy(false);
    }, () => {
      // Notify user
      console.log("AN ERROR HAS OCCURRED!!")
      // Error handler
      setLocationBusy(false);
    })
  }

  // Try to update user location
  // TODO: save this using a caching system cache
  React.useEffect(() => {
    // Check for cached data
    const cachedLocationData = CacheService.getCachedData(LOCATION_CACHE_KEY);
    const cachedCityData = CacheService.getCachedData(CITY_CACHE_KEY);

    // Check if data has been found
    if (cachedLocationData != null && cachedCityData != null) {
      // Found cached data, no additional actions required
      setLocation(cachedLocationData.data);
      setCity(cachedCityData.data);
    } else {
      // Fetch user position and city
      updateExactLocation();
    }
  },[])

  return (
    <div>
      <Box sx={{backgroundColor: "#1975D1"}}>
        <Container>
          <Box sx={{pt: "10vh"}} />
          <Paper>
            <ForecastForm city={city} onSearch={() => {
              console.log("Clicked search icon!!")
            }}/>
          </Paper>
          <Box sx={{pt: "10vh"}} />

          {/* Ask user to enable location */}
          {LocationService.isLocationAvailable() &&
            <Alert color={location==null ? "error" : "info"}>
              Update your location to get the information you need faster :)
              <LoadingButton
                color={location==null ? "error" : "info"}
                onClick={updateExactLocation}
                loading={isLocationBusy}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                sx={{
                  marginLeft: "10px"
                }}
              >
                {location === null ? "Set your location" : "Update your location"}
              </LoadingButton>
            </Alert>
          }
        </Container>
      </Box>

      <Box>
        <BlueWave />
      </Box>

      { /* Visualize forecast data here */}
      <Container sx={{border: "1px solid black"}}>
          <Typography variant="h6" component="h1">
            HERE WILL BE DISPLAYED THE FORECAST DATA
          </Typography>
      </Container>
    </div>
  );
}