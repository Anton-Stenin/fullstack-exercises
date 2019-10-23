import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Countrie = ({ countrie, weather, setWeather }) => {
  const languages = countrie.languages.map(language => <li key={language.iso639_1}>{language.name}</li>);
  const capital = countrie.capital;

  useEffect(() => {
    console.log('Weather query in action')
    // const params = {
    //   access_key: '4d44715bee12c0b56160ee2d997adac2',
    //   query: capital
    // }
    axios
      .get(`http://api.weatherstack.com/current?access_key=4d44715bee12c0b56160ee2d997adac2&query=${capital}`)
      .then(responce => {
        console.log('weather promise fulfilled');
        console.log('data:', responce.data)
        setWeather(responce.data)
      })
  }, [capital, setWeather])

  const generalInfo = (
    <>
      <h2>{countrie.name}</h2>
      <p></p>
      <div>capital {capital}</div>
      <div>population {countrie.population}</div>
      <p></p>
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img width={200} src={countrie.flag} alt="Here is a flag of this countrie" />
    </>
  )

  console.log('weather', weather)

  if (weather !== undefined) {
    const current = weather.current;
    const temperature = current.temperature;
    const icon = current.weather_icons[0];
    const description = current.weather_descriptions[0];
    const wind = `${current.wind_speed} kph direction ${current.wind_dir}`

    const weatherContents = (
      <>
        <div>
          <b>temperature:</b> {temperature} Celsius
        </div>
        <div>
          <img src={icon} alt={description}></img>
        </div>
        <div>
          <b> wind:</b> {wind}
        </div>
      </>
    )

    return (
      <>
        {generalInfo}
        <h3>Weather in {countrie.capital}</h3>
        <div>{weatherContents}</div>
      </>
    )
  } else {
    return (
      <>
        {generalInfo}
      </>
    )
  }

}


function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countrie, setCountrie] = useState()
  const [weather, setWeather] = useState()

  useEffect(() => {
    console.log('effect in action')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(responce => {
        console.log('promise fulfilled')
        setCountries(responce.data)
      })
      .catch(err => console.log('catched error: ', err))
  }, [])

  console.log('render')

  const handleFilter = (e) => {
    console.log('countries to show', countriesToShow)
    console.log('handle filter at work')
    setFilter(e.target.value);
    setCountrie(undefined);
  }

  const countriesToShow = countries.filter(countrie => countrie.name.includes(filter))

  const contents = () => {
    console.log('countrie is', countrie)
    if (countrie !== undefined) {
      console.log('one countrie coming from button', countrie)
      return <Countrie countrie={countrie} weather={weather} setWeather={setWeather} />
    }
    if (countriesToShow.length > 10) {
      console.log('too many')
      return 'Too many matches, specify another filter'
    }
    if (countriesToShow.length > 1) {
      console.log('more than 1')
      return (
        <ul>
          {countriesToShow.map(countrie => {
            return (
              <li key={countrie.numericCode}>
                {countrie.name} <button onClick={() => {
                  console.log('button clicked')
                  return setCountrie(countrie);
                }}>show</button>
              </li>
            );
          })}
        </ul>
      )
    }
    if (countriesToShow.length === 1) {
      const countrie = countriesToShow[0]
      console.log('one countrie coming from filter', countrie)
      return <Countrie countrie={countrie} weather={weather} setWeather={setWeather} />
    }
    return `Non match`
  }


  return (
    <>
      <div>
        find countries
      <input value={filter} onChange={handleFilter} />
      </div>
      <div>
        {contents()}
      </div>
    </>
  );
}

export default App;
