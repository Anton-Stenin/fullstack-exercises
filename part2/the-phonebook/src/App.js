import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const messageStyle = {
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const normalMessageStyle = {
  ...messageStyle,
  color: 'green'
}

const errorMessageStyle = {
  ...messageStyle,
  color: 'red'
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState()

  useEffect(() => {
    // console.log('effect')
    personService
      .getAll()
      .then(
        initialPersons => setPersons(initialPersons)
      )
  }, [])

  console.log('render', persons.length, 'persons')

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  function resetInputAndMessage() {
    setNewNumber('')
    setNewName('')
    setTimeout(() => setMessage(null), 5000)
  }

  const personsToShow =
    (filter === '')
      ? persons
      : persons.filter(person => person.name.includes(filter))

  const updatePersonsNumber = () => {
    const personToUpdate = persons.find(person => person.name === newName)
    console.log(`person to update:`, personToUpdate)
    const id = personToUpdate.id
    const changedPerson = { ...personToUpdate, number: newNumber }
    console.log(`changed person:`, changedPerson)

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person => person.id !== id ? person : returnedPerson));
        setMessageStyle(normalMessageStyle)
        setMessage(`${returnedPerson.name} phone number is changed`)
        resetInputAndMessage()
      }
      )
      .catch(
        error => {
          setPersons(persons.filter(person => person.id !== id))
          setMessageStyle(errorMessageStyle)
          setMessage(`Information on ${personToUpdate.name} has already been removed from the server`)
          resetInputAndMessage()
        }
      )
  }

  const createNewPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(
        newPerson => {
          setPersons(persons.concat(newPerson))
          setMessageStyle(normalMessageStyle)
          setMessage(`Added ${newPerson.name}`)
          resetInputAndMessage()
        }
      )
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (personsToShow.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePersonsNumber()
        return
      }
    }
    createNewPerson()
  }

  const deletePerson = (personToDelete) => {
    console.log(`person to delete is `, personToDelete)
    if (window.confirm(`Would you really like to delete ${personToDelete.name}?`)) {
      console.log(`person with id ${personToDelete.id} is deleted`)
      personService.deletePerson(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
      setMessageStyle(normalMessageStyle)
      setMessage(`${personToDelete.name} is deleted`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={messageStyle} />
      <Filter value={filter} onChangeHandler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App


