import { useState } from 'react'

const Quote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
   
  const topVotes = Math.max(...votes)
  const topIndex = votes.findIndex((element) => element === topVotes)

  const updateSelected = () => {
    setSelected((Math.random()*6).toFixed(0))
  }

  const updateVote = () => {
    
    const tmp = [...votes]
    tmp[selected] += 1
    setVotes(tmp)
  }
  
  return (
    <div>
      <h1> Anecdote of the day</h1>
      <Quote text={anecdotes[selected]} votes={votes[selected]}/>
      <br />
      <button onClick={updateVote}>vote</button>
      <button onClick={updateSelected}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      <Quote text={anecdotes[topIndex]} votes={votes[topIndex]}/>
    </div>
  )
}

export default App