import { useState, useEffect } from 'react'
import axios from "axios"

const Weather = ({ countryInfo }) => {
  const [weatherData, setweatherData] = useState(null)

  // variable api_key now has the value set in startup
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {    
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryInfo.capital[0]},${countryInfo.cca2}&limit=1&appid=${api_key}`)
    .then(response => {
      const lat = response.data[0].lat
      const lon = response.data[0].lon
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=imperial&lang=en&appid=${api_key}`)
        .then(response => {
          setweatherData(response.data)
        })
    })
  },[countryInfo, api_key])

  if(!weatherData) {
    return null
  } else {
    // helper function
    const titleCase = (text) => {
      return text.replace(/\b\w/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    }
    const temp = weatherData.current.temp
    const weather = titleCase(weatherData.current.weather[0].description)
    const icon = weatherData.current.weather[0].icon
  
    return (
      <>
        <h3>Weather</h3>
        <p>Temperature is {temp}° F</p>
        <p>{weather}</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={weather}></img>
      </>
    )
  }

  
  
}

export default Weather