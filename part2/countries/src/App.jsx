import { useEffect, useState } from 'react'
import axios from 'axios'

import SearchForm from './components/Search'
import DisplayFilteredList from './components/DisplayFilteredList'
import DisplayCountry from './components/DisplayCountry'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState('')
  
  // function to get all countries once at beginning of app
  useEffect ( () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response =>
        setAllCountries(response.data))
  }, [])

  // whenever searchTerm is updated, update filteredCountries
  useEffect ( () => {
    if(searchTerm) {
      setFilteredCountries(filterCountries())
    }
  }, [searchTerm])

  // when filteredCountries length is one, update country
  useEffect(() => {
    if(filteredCountries) {
      if(filteredCountries.length === 1) {
        setCountry(filteredCountries[0].name.common)
      }
    }
  }, [filteredCountries])

  // helper function to filter countries by search term
  const filterCountries = () => {
    if(!allCountries) {
      return []
    }
    if(!searchTerm) {
      return []
    }
    return allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // event handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <h1>Find Country Information</h1>
      <SearchForm
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <DisplayFilteredList
        filteredCountries={filteredCountries}
      />
      <DisplayCountry
        country={country}
      />
    </>
  )
}

export default App
