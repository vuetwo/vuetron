const mutations = {
  'SET_USER': (state, selectedUser) => {
    state.user = Object.assign({}, selectedUser);
  },
  'GET_TODOS': (state, allTodos) => {
    state.todos = allTodos;
  },
  'ADD_TODO': (state, newTodo) => {
    const todos = state.todos.slice(0);
    todos.push(newTodo);
    state.todos = todos;
  },
  'UPDATE_TODO': (state, updatedTodo) => {
    const todos = state.todos.slice(0);
    const updated = todos.findIndex(td => td._id === updatedTodo._id);
    if (updated === -1) throw new Error('could not find updated todo');
    todos[updated] = updatedTodo;
    state.todos = todos;
  },
  'DELETE_TODO': (state, todoId) => {
    const todos = state.todos.slice(0);
    const deleted = todos.findIndex(td => td._id === todoId);
    if (deleted === -1) throw new Error('could not find deleted todo');
    todos.splice(deleted, 1);
    state.todos = todos;
  }
};

export default mutations;
