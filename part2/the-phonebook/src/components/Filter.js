import React from 'react'

const Filter = (props) => {

  const value = props.value
  const onChangeHandler = props.onChangeHandler

  return (
    <div>
      filter shown with <input value={value} onChange={onChangeHandler} />
    </div>
  )
}

export default Filter