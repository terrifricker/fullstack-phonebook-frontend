import { useEffect, useState } from 'react'
import axios from 'axios'
import Person from './components/Person'

function App() {
  // state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  // fetch data
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }, [])

  // helper function
  const isDuplicatePerson = (newPerson) => {
    let currentNames = []
    for (const person of persons) {
      currentNames.push(person.name)
    }
    return (currentNames.includes(newPerson))
  }

  // event handlers
  const addPerson = (event) => {
    event.preventDefault()
    if (isDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App