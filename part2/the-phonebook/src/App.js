import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  // console.log('filter props:', props)

  const value = props.value
  const onChangeHandler = props.onChangeHandler

  return (
    <div>
      filter shown with <input value={value} onChange={onChangeHandler} />
    </div>
  )
}

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} autoFocus={true} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <li key={person.id}>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons }) => {
  const rows = persons.map(person => <Person key={person.id} person={person} />)
  return <ul>{rows}</ul>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    console.log('effect')

    axios
      .get('http://localhost:3001/persons')
      .then(responce => {
        console.log('promise fulfilled')
        setPersons(responce.data)
      })
      .catch( err => console.log('catched error: ', err) ) 
  }, [])

  console.log('render', persons.length, 'persons' )

  const personsToShow =
    (filter === '')
      ? persons
      : persons.filter(person => person.name.includes(filter))

  const handleFilter = (event) => {
    console.log('filter is now:', event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (personsToShow.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
