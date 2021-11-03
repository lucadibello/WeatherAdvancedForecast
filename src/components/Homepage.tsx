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
import { LOCATION_CACHE_KEY } from '../constants/Cache';
import * as CacheService from '../services/CacheService';




export default function Homepage () {
  const [location, setLocation] = React.useState<UserLocation | null>(null);

  const nearbyCities = () => {
    if (location != null) {
      WeatherService.getNearbyCities(
        location.latitude,
        location.longitude,
        10
      );
    }
  }

  // Try to update user location
  // TODO: save this using a caching system cache
  useEffect(() => {
    // Check for cached data
    const cachedLocationData = CacheService.getCachedData(LOCATION_CACHE_KEY);

    // Check if data has been found
    if (cachedLocationData != null) {
      // Found cached data, no additional actions required
      setLocation(cachedLocationData.data);
    } else {
      // Fetch user position
      LocationService.getUserLocation((position: GeolocationPosition) => {
        // Parse data into correct form
        let locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          _accuracy: position.coords.accuracy
        }
        
        // save data into location state
        setLocation(locationData);

        // save data into user cache
        CacheService.cacheData(LOCATION_CACHE_KEY, JSON.stringify(locationData), LocationService.getUserLocation)
      })
    }
  },[])

  return (
    <Box>
      {/* Ask user to enable location */}
      {location === null && 
        <Alert severity="error">
          Enable your location to get the information you need in less time :)
          <Button variant="outlined" color="error"  onClick={() => {
            LocationService.getUserLocation((position: GeolocationPosition) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                _accuracy: position.coords.accuracy
              })
            })
          }} sx={{
            marginLeft: "10px"
          }}>Enable location</Button>
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
    </Box>
  );
}