import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  )
}
export default Root
