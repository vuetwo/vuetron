<template>
  <b-btn variant="transparent" 
    size="sm" 
    class="delete-todo-btn"
    @click="() => {this.deleteTodo(todoId)}">
    <icon name="trash" />
  </b-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DeleteTodoBtn',
  props: ['todoId'],
  methods: {
    ...mapActions([
      'deleteTodo'
    ])
  }
}
</script>
