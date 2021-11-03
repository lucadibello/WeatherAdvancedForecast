import { API_GEOCODE_REVERSE_URL } from "../constants/OpenWeather"

async function getNearbyCities(lat:number, lon: number, nCities: number) {
  await fetch(API_GEOCODE_REVERSE_URL+`?lat=${lat}&lon=${lon}&limit=${nCities}&appid=${process.env.REACT_APP_OPENWEATHER_TOKEN}`)
    .then(response => response.json())
    .then((response) => {
      console.log("Response data: ", response);
      if (response.length > 0) {
        return response[0];
      } else {
        return null;
      }
    })
}

export {
  getNearbyCities
}