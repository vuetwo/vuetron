const actions = {
  getAllTodos (context) {
    return fetch('http://localhost:9000/api/todos', {
      method: 'get'})
      .then(response => response.json())
      .then(response => context.commit('GET_TODOS', response))
      .catch(err => err);
  },
  addNewTodo ({ commit }, newTodo) {
    const request = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    };
    return fetch('http://localhost:9000/api/todos', request)
      .then(response => response.json())
      .then(response => commit('ADD_TODO', response))
      .catch(err => err);
  },
  completeTodo ({ commit }, todo) {
    const completedTodo = Object.assign({}, todo);
    completedTodo.status = 'complete';
    const request = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({todo: completedTodo})
    };
    return fetch(`http://localhost:9000/api/todos/${completedTodo._id}`, request)
      .then(response => response.json())
      .then(response => commit('UPDATE_TODO', completedTodo))
      .catch(err => err);
  },
  deleteTodo ({ commit }, todoId) {
    return fetch(`http://localhost:9000/api/todos/${todoId}`, {
      method: 'delete'})
      .then(response => response.json())
      .then(response => commit('DELETE_TODO', todoId))
      .catch(err => err);
  }
};

export default actions;
