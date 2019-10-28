import React from 'react'

const Person = ({ person, deletePerson }) => {
  // console.log(`deletePerson:`, deletePerson)
  return (
    <li key={person.id}>
      {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
    </li>
  )
}

export default Person