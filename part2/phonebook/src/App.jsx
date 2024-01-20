import { useEffect, useState } from 'react'

import personsService from './services/persons'
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
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
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
  const addPerson = (event) => {
    event.preventDefault()
    let existingPerson = persons.find(person => person.name === newName)
    console.log("existing", existingPerson)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook,
        replace the old number with this new one?`)) {
          const changedPerson = { ...existingPerson, number: newNumber}
          console.log("new", changedPerson)
          console.log("id", changedPerson.id)
          personsService
          .update(`${changedPerson.id}`, changedPerson)
          .then(() => 
            personsService
            .getAll()
            .then(response => setPersons(response)))
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
      })
    }
    setNewName('')
    setNewNumber('')
  }
  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.filter(person => 
        person.id === id)[0].name}?`)) {
      personsService
      .remove(id)
      .then(() => 
        personsService
        .getAll()
        .then(response => setPersons(response)))
    }
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
        removePerson={removePerson}
      />
    </div>
  )
}

export default App