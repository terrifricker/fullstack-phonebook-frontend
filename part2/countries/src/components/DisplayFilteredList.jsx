const DisplayFilteredList = ({ filteredCountries, showCountry }) => {
  
  const list = filteredCountries

  if (!list) {
    return null
  }
  if (list.length == 1) {
    return null
  }
  if (list.length > 10) {
    return <p>Enter more characters.  Too many countries match.</p>
  }
  if (list.length <= 10) {
    return (
      <ul>
        {list.map(country =>
          <li key={country.ccn3}>
            {country.name.common}
            <button id={country.name.common} type="button" onClick={showCountry}>Show</button>
          </li>)}
     </ul>
    )
  }
}

export default DisplayFilteredList