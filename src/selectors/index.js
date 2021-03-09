export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter((t) => !t.completed)
    case 'completed':
      return todos.filter((t) => t.completed)
    default:
      throw Error('没有这样的filter')
  }
}
