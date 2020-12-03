import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import expect from 'expect'
import { createStore } from 'redux'
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

const addCounter = (list) => [...list, 0]
const removeCounter = (list, index) => [
  ...list.slice(0, index),
  ...list.slice(index + 1),
]
const incrementCounter = (list, index) => [
  ...list.slice(0, index),
  list[index] + 1,
  ...list.slice(index + 1),
]

const testAddCounter = () => {
  const listBefore = []
  const listAfter = [0]
  deepFreeze(listBefore)
  expect(addCounter(listBefore)).toEqual(listAfter)
}

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20]
  const listAfter = [0, 20]
  deepFreeze(listBefore)
  expect(removeCounter(listBefore, 1)).toEqual(listAfter)
}

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20]
  const listAfter = [0, 11, 20]
  deepFreeze(listBefore)
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter)
}

testAddCounter()
testRemoveCounter()
testIncrementCounter()
console.log('All tests passed')
