import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(({ anecdotes }) => {
    return [...anecdotes]
      .filter(({ content }) => 
        content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => a.votes <= b.votes ? 1 : -1 )
  })

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }

    dispatch(voteOnAnecdote(id, updatedAnecdote))
    dispatch(changeNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(changeNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList