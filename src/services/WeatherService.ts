import { API_GEOCODE_REVERSE_URL } from "../constants/OpenWeather"
import NearbyCity from "../models/NearbyCity";

async function getNearbyCities(lat:number, lon: number, nCities: number): Promise<NearbyCity[]> {
  return await fetch(API_GEOCODE_REVERSE_URL+`?lat=${lat}&lon=${lon}&limit=${nCities}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json());
}

export {
  getNearbyCities
}