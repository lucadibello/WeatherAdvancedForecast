interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface WeatherExtraAtTime {
  dt: number,
  dt_txt: string,
  clouds: {
    all: number
  }
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  },
  pop: number,
  rain: {
    "3h": number 
  },
  sys: {
    pod: string
  },
  visibility: number,
  weather: Array<Weather>,
  wind: {
    deg: number,
    gust: number,
    speed: number
  }
}

export default interface WeatherData {
  cod: string,
  message: number,
  cnt: number,
  list: Array<WeatherExtraAtTime>,
}