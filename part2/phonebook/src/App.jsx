import { useEffect, useState } from 'react'

import personsService from './services/persons'
import Notification from './components/Notfication'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import DisplayPersons from './components/DisplayPersons'


function App() {
  // state
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
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
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook,
        replace the old number with this new one?`)) {
          const changedPerson = { ...existingPerson, number: newNumber}
          personsService
          .update(`${changedPerson.id}`, changedPerson)
          .then(() => {
            personsService
            .getAll()
            .then(response => setPersons(response))
            setSuccessMessage(`${existingPerson.name}'s number has been changed to ${changedPerson.number}.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
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
      setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }
  const removePerson = (id) => {
    const personToRemove = persons.filter(person =>
      person.id === id)[0].name
    if (window.confirm(`Delete ${personToRemove}?`)) {
      personsService
      .remove(id)
      .then(() => {
        personsService
        .getAll()
        .then(response => setPersons(response))
        setSuccessMessage(`Removed ${personToRemove}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(() => {
        setErrorMessage(`${personToRemove} has already been deleted.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
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
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
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