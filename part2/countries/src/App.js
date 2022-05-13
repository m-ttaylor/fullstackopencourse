import axios from 'axios'
import {useState, useEffect} from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country, weather, setWeatherData}) => {
  const weatherHook = () => {
    if (country) {
      const [lat, long] = country.latlng
      const w2 = ''
      console.log('effect')
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`)
        .then(response => {
          console.log('promise fulfilled')
          setWeatherData(response.data)
        })
    } else {
      return ({})
    }
  }
  useEffect(weatherHook, [])

  return (
    <>
    <p>{weather.temp} ˚C</p>
    <img src={weather.icon} />
    <p>{weather.wind}</p>
    </>
  )
}
const HideableButton = ({hidden, code, handler}) => {
  if (hidden) {
    return (
      <button hidden onClick={handler(code)}>hide</button>
    )
  } else {
    return (
      <button onClick={handler(code)}>hide</button>
    )
  }
}

const Country = ({country, weather, setWeatherData, toggleDetailsHandler, details, alwaysShowDetails}) => {

  if (alwaysShowDetails || (details && details[country.ccn3])) {

    return (
      <div key={country.ccn3}>
        <h1>
          {country.name.common} 
          <HideableButton hidden={alwaysShowDetails} code={country.ccn3} handler={toggleDetailsHandler} />
        </h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <img src={country.flags.png} />
        <h3>languages:</h3>
        <ul>
        {Object.values(country.languages).map((lang, i) => 
          <li key={i}>{lang}</li>)
        }
        </ul>
        <h3>Weather in {country.capital[0]}</h3>
        <Weather weather={weather} setWeatherData={setWeatherData} country={country} />
      </div>
    )
  }
  return (<li>{country.name.common} <button onClick={toggleDetailsHandler(country.ccn3)}>show</button></li>)
}

const Countries = ({ countries, weather, setWeatherData, toggleDetailsHandler, details }) => {
  const alwaysShowDetails = countries.length <= 1
  return (
    <ul>
    {countries.map(country => 
      <Country alwaysShowDetails={alwaysShowDetails} 
        weather={weather}
        setWeatherData={setWeatherData}
        toggleDetailsHandler={toggleDetailsHandler} 
        details={details} key={country.ccn3} 
        country={country} />
    )}
    </ul>
  )
}
  
const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [details, setDetails] = useState({})
  const [weatherData, setWeatherData] = useState({})

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])  

  function toggleDetailsHandler(code) {
    return () => {
      console.log('Toggling details', details)
      const detailsObj = {...details}
      if (detailsObj[code] !== undefined) {
        detailsObj[code] = !detailsObj[code]
      } else {
        detailsObj[code] = true
      }
      setDetails(detailsObj)
    }
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  const filteredCountries = filter ? 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ) : countries

  let countriesToShow
  countriesToShow = (filteredCountries.length <= 10) ? filteredCountries : filteredCountries.slice(0,10)
  
  const weatherToShow = weatherData.main ?
    { temp: weatherData.main['temp'],
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0]['icon']}@2x.png`,
      wind: `${weatherData.wind['speed']} m/s`
    } : {}
  
  return (
    <div>
      filter countries <input value={filter} onChange={handleFilterChange} />
      <Countries 
        details={details} 
        toggleDetailsHandler={toggleDetailsHandler}
        weather={weatherToShow}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        countries={countriesToShow} />
    </div>
  )
}

export default App
