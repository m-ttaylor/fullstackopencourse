import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 1))
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