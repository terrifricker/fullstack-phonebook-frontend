const AddForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
        <h2>Add a new</h2>
        <div>
        name:
        <input
            value={props.newName}
            onChange={props.handlePersonChange} />
        </div>
        <div>
        number:
        <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
        </form>
    )
}

export default AddForm




