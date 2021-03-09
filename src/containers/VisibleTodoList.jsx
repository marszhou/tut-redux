import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { getVisibleTodos } from '../selectors'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const mapStateToTodoListProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.match.params.filter || 'all'),
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
  }
}

const VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList)
)

export default VisibleTodoList
