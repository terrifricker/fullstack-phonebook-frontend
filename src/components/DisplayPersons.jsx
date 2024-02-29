import Person from './Person'

const DisplayPersons = ({personsToDisplay, removePerson}) => {

  return(
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToDisplay.map(person =>
          <Person 
            key={person.id}
            person={person} 
            removePerson={() => removePerson(person.id)}/>)}
      </ul>
    </>
  )
}

export default DisplayPersons
