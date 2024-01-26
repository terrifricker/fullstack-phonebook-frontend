const SearchForm = ({ searchTerm, handleSearchChange}) => {
  return(
    <>
        <h2>Country Search</h2>
        <input
            value={searchTerm}
            onChange={handleSearchChange}
        />
    </>
  )
}

export default SearchForm