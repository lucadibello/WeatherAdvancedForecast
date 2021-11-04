import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather'

interface WeatherWidgetProps {
  lat: number,
  lon: number,
  cityName: string,
}

export default function WeatherWidget (props: WeatherWidgetProps) {
  let {data, isLoading, errorMessage} = useOpenWeather({
    key: process.env.REACT_APP_OPENWEATHER_TOKEN,
    lat: props.lat,
    lon: props.lon,
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel={props.cityName}
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  )
}