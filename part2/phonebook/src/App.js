import { useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7789', id: 1 },
    { name: 'Ada Lovelace', number: '123-456-7789', id: 2 },
    { name: 'Alan Turing', number: '123-456-7789', id: 3 },
    { name: 'Hans Zimmer', number: '123-456-7789', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      console.log('So sad, we already have them')
      alert(`${newName} is already in the phonebook`)
    } else {
      console.log('added person', newName)
      const nameObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = filter 
  ? persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    ) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Search text="filter shown with" value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form onSubmit={addPerson} 
        handlers={[handleNameChange, handleNumberChange]} 
        values={[newName, newNumber]} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App