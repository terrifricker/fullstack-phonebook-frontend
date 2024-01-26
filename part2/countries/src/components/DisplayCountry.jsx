import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayCountry = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLowerCase()}`)
      .then(response => {
        setCountryInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [country]);

  if (!countryInfo) {
    return null;
  }

  return (
    <>
      <h3>{countryInfo.name.common}</h3>
      <p>Capital: {countryInfo.capital[0]}</p>
      <p>Area: {countryInfo.area}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(countryInfo.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>{countryInfo.flag}</p>
    </>
  );
};

export default DisplayCountry