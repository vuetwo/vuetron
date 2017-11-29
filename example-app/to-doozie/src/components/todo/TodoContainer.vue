<template>
  <div id="todo-container">
    <b-container fluid>
      <todo-options />
      <todo-list />
    </b-container>
  </div>
</template>

<script>
import TodoList from '@/components/todo/TodoList';
import TodoOptions from '@/components/todo/TodoOptions';
export default {
  name: 'TodoContainer',
  components: {
    'todo-list': TodoList,
    'todo-options': TodoOptions
  }
}
</script>

<style scoped>
#todo-container {
  background: lightgray;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px #444444;
}
</style>
