import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
import Footer from './components/Footer'
import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
