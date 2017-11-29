<template>
  <b-btn variant="transparent" 
    size="sm" 
    class="complete-todo-btn"
    @click="() => {completeTodo(todo)}">
    <icon name="check" />
  </b-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'CompleteTodoBtn',
  props: ['todo'],
  methods: {
    ...mapActions([
      'completeTodo'
    ])
  }
}
</script>
