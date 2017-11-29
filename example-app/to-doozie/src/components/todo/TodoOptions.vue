<template>
  <div id="todo-options">
    <b-row v-if="!showForm">
      <b-col cols="12">
        <add-todo-btn v-on:toggle="toggleForm" />
      </b-col>
    </b-row>
    <todo-form v-if="showForm" v-on:toggle="toggleForm" />
  </div>
</template>

<script>
import TodoForm from '@/components/todo/TodoForm';
import AddTodoBtn from '@/components/todo/assets/AddTodoBtn';

export default {
  name: 'TodoOptions',
  data() {
    return {
      showForm: false
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    }
  },
  components: {
    'todo-form': TodoForm,
    'add-todo-btn': AddTodoBtn
  }
}
</script>
