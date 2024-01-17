import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import DisplayPersons from './components/DisplayPersons'


function App() {
  // state
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  // fetch initial data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // helper functions
  const personsToDisplay = () => {
    if (!searchTerm) {
      return persons
    } else {
        return persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  }
  const isDuplicatePerson = (newPerson) => {
    let currentNames = []
    for (const person of persons) {
      currentNames.push(person.name)
    }
    return (currentNames.includes(newPerson))
  }
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

  // event handlers
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
      <h1>Phonebook</h1>
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <AddForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <DisplayPersons
        personsToDisplay={personsToDisplay()}
      />
    </div>
  )
}

export default App