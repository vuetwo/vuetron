<template>
  <b-card
    style="max-width: 30rem;"
    border-variant="dark"
    bg-variant="dark" 
    text-variant="white"
    class="todo">
    <b-card-body :class="todo.status">
      <h3>
        {{ todo.title }}
      </h3>
      <p class="card-text">
        {{ todo.note }}
      </p>
    </b-card-body>
    <b-card-footer>
      <div v-if="todo.status === 'active'">
        <complete-todo-btn :todo="todo" />
      </div>
      <delete-todo-btn :todoId="todo._id" />
    </b-card-footer>
  </b-card>
</template>

<script>
import DeleteTodoBtn from '@/components/todo/assets/DeleteTodoBtn';
import CompleteTodoBtn from '@/components/todo/assets/CompleteTodoBtn';
export default {
  name: 'Todo',
  props: ['todo'],
  components: {
    'delete-todo-btn': DeleteTodoBtn,
    'complete-todo-btn': CompleteTodoBtn,
  }
}
</script>

<style scoped>
.todo {
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
}

.card {
  background: white;
}

.complete {
  text-decoration: line-through;
}
</style>
