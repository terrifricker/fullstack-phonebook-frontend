import { useEffect, useState } from 'react'
import axios from 'axios'
import Person from './components/Person'

function App() {
  // state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  // fetch initial data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // helper functions
  const isDuplicatePerson = (newPerson) => {
    let currentNames = []
    for (const person of persons) {
      currentNames.push(person.name)
    }
    return (currentNames.includes(newPerson))
  }
  const personsToDisplay = () => {
    if (!searchTerm) {
      return persons
    } else {
        return persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  }

  // event handlers
  const addPerson = (event) => {
    event.preventDefault()
    if (isDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={searchTerm}
          onChange={handleSearchChange} />
      </div>
      <form onSubmit={addPerson}>
        <h2>Add a new</h2>
        <div>
          name:
          <input
            value={newName}
            onChange={handlePersonChange} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToDisplay().map(person =>
          <Person key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default App