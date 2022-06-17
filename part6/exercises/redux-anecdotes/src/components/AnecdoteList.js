import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
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
    dispatch(upvoteAnecdote(id))
    dispatch(changeNotification(`you voted for '${anecdotes.find(a => a.id === id).content}'`))
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