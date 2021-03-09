import { createStore } from 'redux'
import { loadState, saveState } from './localStorage'
import debounce from 'lodash/debounce'
import todoApp from './reducers'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState)
  store.subscribe(
    debounce(() => {
      console.log('save')
      saveState({
        todos: store.getState().todos,
      })
    }, 1000)
  )
  return store
}

export default configureStore
