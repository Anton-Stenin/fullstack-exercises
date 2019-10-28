import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const personsToShow =
    (filter === '')
      ? persons
      : persons.filter(person => person.name.includes(filter))

  const updatePersonsNumber = (personToUpdate) => {
    const id = personToUpdate.id
    const changedPerson = { ...personToUpdate, number: newNumber }
    console.log(`changed person:`, changedPerson)

    personService
      .update(id, changedPerson)
      .then(returnedPerson => setPersons(
        persons.map(
          person =>
            {
              console.log(`the person mapped is now:`, person)
              return person.id !== id ? person : returnedPerson;
            }
        )
      )
      )
    setNewNumber('')
    setNewName('')
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (personsToShow.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        console.log(`person to update:`, personToUpdate)
        updatePersonsNumber(personToUpdate)
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService.create(personObject).then(
      newPerson => {
        setPersons(persons.concat(newPerson))
        setNewNumber('')
        setNewName('')
      }
    )
  }

  const deletePerson = (personToDelete) => {
    console.log(`person to delete is `, personToDelete)
    if (window.confirm(`Would you really like to delete ${personToDelete.name}?`)) {
      console.log(`person with id ${personToDelete.id} is deleted`)
      personService.deletePerson(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
