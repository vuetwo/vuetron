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
