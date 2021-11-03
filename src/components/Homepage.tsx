import React, { useEffect } from 'react';

import {
  Alert,
  Box,
  Typography,
  Button
} from '@mui/material'

import UserLocation from '../models/UserLocation';
import * as LocationService from '../services/LocationService';
import * as WeatherService from '../services/WeatherService';
import { LOCATION_CACHE_KEY, CITY_CACHE_KEY } from '../constants/Cache';
import * as CacheService from '../services/CacheService';
import NearbyCity from '../models/NearbyCity';

export default function Homepage () {
  const [location, setLocation] = React.useState<UserLocation | null>(null);
  const [city, setCity] = React.useState<NearbyCity | null>(null);

  const updateExactLocation = () => {
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
    })
  }

  // Try to update user location
  // TODO: save this using a caching system cache
  useEffect(() => {
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
    <Box>
      {/* Ask user to enable location */}
      {LocationService.isLocationAvailable() && 
        <Alert color={location==null ? "error" : "warning"}>
          Update your location to get the information you need in less time :)
          <Button variant="outlined" color={location==null ? "error" : "warning"}  onClick={() => {
            updateExactLocation();
          }} sx={{
            marginLeft: "10px"
          }}>{location === null ? "Set your location" : "Update your location"}</Button>
        </Alert>
      }
      
      <Typography sx={{
        color: 'black'
      }} variant='h6' component='h1'>
        Ciao! API KEY: {process.env.REACT_APP_OPENWEATHER_TOKEN}
      </Typography>


      <Typography variant='h6' component='h1'>
        Current position: {JSON.stringify(location)}
      </Typography>
      
      <Typography variant='h6' component='h1'>
        Detected location: {JSON.stringify(city)}
      </Typography>
    </Box>
  );
}