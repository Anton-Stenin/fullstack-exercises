import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  const rows = persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)
  return <ul>{rows}</ul>
}

export default Persons