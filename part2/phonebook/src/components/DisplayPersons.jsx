import Person from './Person'

const DisplayPersons = ({personsToDisplay}) => {

  return(
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToDisplay.map(person =>
          <Person key={person.id} person={person} />)}
      </ul>
    </>
  )
}

export default DisplayPersons
