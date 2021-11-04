import React from 'react';

import {
  Alert,
  Box,
  Container,
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
import { useSnackbar } from 'notistack';
import WeatherWidget from './WeatherWidget';

export default function Homepage () {
  // Application states
  const [location, setLocation] = React.useState<UserLocation | null>(null);
  const [city, setCity] = React.useState<NearbyCity | null>(null);
  const [isLocationBusy, setLocationBusy] = React.useState<boolean>(false);

  // Notification handler
  const { enqueueSnackbar } = useSnackbar();

  const updateExactLocation = React.useCallback((errorCallback: () => void) => {
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
        enqueueSnackbar("No nearby cities has been found, please select a city manually!", {
          variant: 'error'
        })
      }
      // set location busy to false
      setLocationBusy(false);
    }, () => {
      // Error handler
      errorCallback();
      setLocationBusy(false);
    })
  }, [enqueueSnackbar])
  
  // Try to update user location / get data from cache
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
      updateExactLocation(() => {
        // Notify user
        enqueueSnackbar("An error accurred while detecting user location. Have you allowed the location permission?", {
          variant: 'info'
        })
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Box sx={{backgroundColor: "#1975D1"}}>
        <Container>
          <Box sx={{pt: "10vh"}} />
          <Paper>
            <ForecastForm city={city} onSearch={async (cityName) => {
              // Get coordinates using API

              // FIXME: get exact country
              let data = await WeatherService.getCoordinates(cityName);
              if (data.length > 0) {
                // Set city
                setCity(data[0]);
                // Update cache
                CacheService.cacheData(CITY_CACHE_KEY, JSON.stringify(data[0]), () => {});
              }
            }}/>
          </Paper>
          <Box sx={{pt: "10vh"}} />

          {/* Ask user to enable location */}
          {LocationService.isLocationAvailable() &&
            <Alert color={location==null ? "error" : "info"}>
              Update your location to get the information you need faster :)
              <LoadingButton
                color={location==null ? "error" : "info"}
                onClick={() => updateExactLocation(() => {
                    // Notify user
                    enqueueSnackbar("An error accurred while detecting user location. Please select a city manually!", {
                      variant: 'error'
                    })
                })}
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
      { city != null &&
        <Container sx={{mb:"10vh"}}>
          <WeatherWidget
            lat={city.lat}
            lon={city.lon} 
            cityName={city.name}
          />
        </Container>
      }
    </div>
  );
}

