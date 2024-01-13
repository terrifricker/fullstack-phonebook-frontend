import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const DisplayAnecdote = ({ selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
    </>
  )
}

const HighestVoted = ({ votes }) => {
  let votesArray = Object.values(votes)
  let index = votesArray.indexOf(Math.max(...votesArray))
  if (Math.max(...votesArray)) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[index]}</p>
      </>
    )
  }
  return (
    <>
      <h2><em>Vote to show the Anecdote with the most votes</em></h2>
    </>
  )
}

const App = () => {

  // helper function
  const getRandomInt = (max) => Math.floor(Math.random() * max)

  // create an initialVotes object with keys 0 to array length -1
  // and all values equal to zero
  const initialVotes = () => {
    let voteObject = {}
    for (let i=0; i<anecdotes.length; i++) {
      voteObject[i] = 0
    }
    return voteObject
  }
  
  const updateVotes = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    }
    setVotes(newVotes)
  }

  // state
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes())

  return (
    <div>
      <DisplayAnecdote selected = {selected} />
      <button onClick={updateVotes}>vote</button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>next anecdote</button>
      <HighestVoted votes = {votes} />
    </div>
  )
}

export default App