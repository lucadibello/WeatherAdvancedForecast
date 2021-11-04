import { API_GEOCODE_REVERSE_URL, API_FORECAST_URL, API_GEOCODE_URL } from "../constants/OpenWeather"
import NearbyCity from "../models/NearbyCity";
import axios from "axios";

async function getNearbyCities(lat:number, lon: number, nCities: number): Promise<NearbyCity[]> {
  return await fetch(API_GEOCODE_REVERSE_URL+`?lat=${lat}&lon=${lon}&limit=${nCities}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json())
}

/*
async function getCoordinates (city: NearbyCity): Promise<NearbyCity[]> {
  return await fetch(API_GEOCODE_URL+`?q=${city.name},${city.country}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json())
}
*/

async function getCoordinates (city: string): Promise<NearbyCity[]> {
  return await fetch(API_GEOCODE_URL+`?q=${city}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json())
}

async function getForecastByCityName (city: NearbyCity | string){
  let cityName;
  if (typeof city == "string") {
    cityName = city;
  } else {
    cityName = city.name;
  }
  const res = await axios.get(API_FORECAST_URL+`?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
  const weather = res.data.list[0].weather[0].main
  return weather
  /*return await fetch(API_FORECAST_URL+`?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json());*/
}

export {
  getNearbyCities,
  getForecastByCityName,
  getCoordinates
}