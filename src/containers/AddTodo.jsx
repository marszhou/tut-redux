import { connect } from 'react-redux'
import { addTodo } from '../actions'
import React from 'react'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <>
      <input
        ref={(node) => {
          input = node
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        Add Todo
      </button>
    </>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
