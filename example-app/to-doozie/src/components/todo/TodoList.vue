<template>
  <div id="todo-list">
    <h2>To-Doozie</h2>
    <div v-if="todos">
      <div v-for="(todo, index) in todos" :key="index">
        <b-row align-h="center">
          <b-col cols="12">
            <b-card-group deck>
              <todo :todo="todo" />
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/todo/Todo';
export default {
  name: 'TodoList',
  created() {
    this.$store
      .dispatch('getAllTodos', {self: this})
      .catch(err => console.log('request err', err));
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  components: {
    'todo': Todo
  }
}
</script>
