const Filter = ({ searchTerm, handleSearchChange}) => {
    return(
        <>
            <h2>Filter by name</h2>
            <input
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </>
    )
}

export default Filter