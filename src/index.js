/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import expect from 'expect'
import { createStore, combineReducers } from 'redux'
import deepFreeze from 'deepfreeze'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// const counter = (state = 0, action) => {
//   // <-- reducer function
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }

// const Counter = ({ value, onIncrement, onDecrement }) => (
//   <div>
//     <h1>{value}</h1>
//     <button onClick={onIncrement}>+</button>
//     <button onClick={onDecrement}>-</button>
//   </div>
// )

// const store = createStore(counter)

// const render = () => {
//   ReactDOM.render(
//     <div>
//       <Counter
//         value={store.getState()}
//         onIncrement={() =>
//           store.dispatch({
//             type: 'INCREMENT',
//           })
//         }
//         onDecrement={() =>
//           store.dispatch({
//             type: 'DECREMENT',
//           })
//         }
//       />
//       <Counter
//         value={store.getState()}
//         onIncrement={() =>
//           store.dispatch({
//             type: 'INCREMENT',
//           })
//         }
//         onDecrement={() =>
//           store.dispatch({
//             type: 'DECREMENT',
//           })
//         }
//       />
//       <Counter
//         value={store.getState()}
//         onIncrement={() =>
//           store.dispatch({
//             type: 'INCREMENT',
//           })
//         }
//         onDecrement={() =>
//           store.dispatch({
//             type: 'DECREMENT',
//           })
//         }
//       />
//     </div>,
//     document.getElementById('root')
//   )
// }

// store.subscribe(render)
// render()

// const addCounter = (list) => [...list, 0]
// const removeCounter = (list, index) => [
//   ...list.slice(0, index),
//   ...list.slice(index + 1),
// ]
// const incrementCounter = (list, index) => [
//   ...list.slice(0, index),
//   list[index] + 1,
//   ...list.slice(index + 1),
// ]

// const testAddCounter = () => {
//   const listBefore = []
//   const listAfter = [0]
//   deepFreeze(listBefore)
//   expect(addCounter(listBefore)).toEqual(listAfter)
// }

// const testRemoveCounter = () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 20]
//   deepFreeze(listBefore)
//   expect(removeCounter(listBefore, 1)).toEqual(listAfter)
// }

// const testIncrementCounter = () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 11, 20]
//   deepFreeze(listBefore)
//   expect(incrementCounter(listBefore, 1)).toEqual(listAfter)
//
// testAddCounter()
// testRemoveCounter()
// testIncrementCounter()
// console.log('All tests passed')

// todo list

// const toggleTodo = (todo) => {
//   return { ...todo, completed: !todo.completed }
// }

// const testToggleTodo = () => {
//   const todoBefore = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: false,
//   }
//   const todoAfter = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: true,
//   }
//   deepFreeze(todoBefore)
//   expect(toggleTodo(todoBefore)).toEqual(todoAfter)
// }

// testToggleTodo()
// console.log('All tests passed')

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed,
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map((t) => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action)
//       return nextState
//     }, {})
//   }
// }

const todoApp = combineReducers({
  todos,
  visibilityFilter,
})

const store = createStore(todoApp)

const FilterLink = ({ filter, currentFilter, children }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        })
      }}
    >
      {children}
    </a>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed)
    default:
      return todos
  }
}

let nextTodoId = 0
class TodoApp extends React.Component {
  render() {
    const { todos, visibilityFilter } = this.props
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return (
      <div>
        <input
          ref={(node) => {
            this.input = node
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            })
            this.input.value = ''
          }}
        >
          Add Todo
        </button>
        <ul>
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                })
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Shows:
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
            All
          </FilterLink>{' '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
            Active
          </FilterLink>{' '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()

// const store = createStore(todos)
// console.log('Initial state:')
// console.log(store.getState())
// console.log('--------------')

// console.log('Dispatching ADD_TODO')
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux',
// })
// console.log('Current state:')
// console.log(store.getState())
// console.log('--------------')

// console.log('Dispatching ADD_TODO')
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Go shopping',
// })
// console.log('Current state:')
// console.log(store.getState())
// console.log('--------------')

// console.log('Dispatching TOGGLE_TODO')
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0,
// })
// console.log('Current state:')
// console.log(store.getState())
// console.log('--------------')

// const testAddTodo = () => {
//   const stateBefore = []
//   const action = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux',
//   }
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//   ]
//   deepFreeze(stateBefore)
//   deepFreeze(action)
//   expect(todos(stateBefore, action)).toEqual(stateAfter)
// }

// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Go shopping',
//       completed: false,
//     },
//   ]
//   const action = {
//     type: 'TOGGLE_TODO',
//     id: 1,
//   }
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Go shopping',
//       completed: true,
//     },
//   ]
//   deepFreeze(stateBefore)
//   deepFreeze(action)
//   expect(todos(stateBefore, action)).toEqual(stateAfter)
// }

// testAddTodo()
// testToggleTodo()
// console.log('All tests passed')
