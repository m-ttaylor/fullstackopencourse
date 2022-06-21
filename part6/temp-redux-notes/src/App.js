import { useEffect } from 'react'
import ConnectedNewNote from './components/NewNote'
import ConnectedNotes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <ConnectedNewNote />
      <VisibilityFilter />
      <ConnectedNotes />
    </div>
  )
}

export default App