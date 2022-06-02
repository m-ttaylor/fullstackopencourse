import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'
import phonebookService from './services/phonebook'

const Notification = ({ message, errorState }) => {
  const notificationStyle = {
    color: errorState ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notifyOfError = (errorMessage) => {
    setErrorState(true)
    setNotification(errorMessage)
    setTimeout(() => {
      setNotification(null)
      setErrorState(false)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name).includes(newName)) {
      const oldPerson = persons.find(person => person.name === newName)
      console.log(
        `${newName} already present in phonebook, prompting user for more instructions`
      )
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        phonebookService
          .updateEntry(oldPerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNotification(
              `Updated ${newName}'s number`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            notifyOfError(`The information of ${newName} has already been removed from the server`)
          })
      }
    } else {
      console.log(`adding person '${newName}'`)

      phonebookService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(({response}) => {
          notifyOfError(response.data.error)
          console.log(response.data.error)
        })
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

  const handleDelete = (id, name) => () => {
    console.log(`deleting id: ${id}, name: ${name}`)
    if (window.confirm(`Really delete ${name}?`)) {
      phonebookService
        .deleteEntry(id)
        .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          notifyOfError(`The information of ${name} has already been removed from the server`)
          setPersons(persons.filter(n => n.id !== id ))
        })
    }
  }

  const personsToShow = filter 
  ? persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    ) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} errorState={errorState}/>
      <Search text="filter shown with" value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form onSubmit={addPerson} 
        handlers={[handleNameChange, handleNumberChange]} 
        values={[newName, newNumber]} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App