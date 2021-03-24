import { connect } from 'react-redux'
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching } from '../reducers'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { Component } from 'react'

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchTodos, requestTodos } = this.props
    requestTodos(filter)
    fetchTodos(filter)
  }

  render() {
    const { todos, toggleTodo, isFetching } = this.props

    if (isFetching && todos.length === 0) {
      return <p>Loading...</p>
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
  }
}

const mapStateToTodoListProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
}

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, actions)(VisibleTodoList)
)

export default VisibleTodoList
