/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
