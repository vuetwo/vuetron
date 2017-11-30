<template>
  <div class="todo-form">
    <b-form-group label="New Todo"
      :state="state"
      invalid-feedback="Please enter all required fields.">
      <b-form-input type="text" 
        placeholder="title" 
        v-model="title" />
      <b-form-input type="text" 
        placeholder="note" 
        v-model="note" />
      <b-form-select v-model="status" :options="statusOptions">
      </b-form-select>
    </b-form-group>
    <div class="text-right">
      <b-btn variant="primary" @click="dispatchAddTodo" class="new-todo-save">
        Save
      </b-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TodoForm',
  data() {
    return {
      title: '',
      note: '',
      status: null,
      statusOptions: [
        {value: null, text: 'Select a status', disabled: true},
        {value: 'active', text: 'Active'},
        {value: 'complete', text: 'Complete'}
      ]
    };
  },
  computed: {
    state() {
      return (this.title && this.note && this.status) ? 'valid' : 'invalid';
    }
  },
  methods: {
    dispatchAddTodo() {
      if (this.title && this.note && this.status) {
        const newTodo = {
          title: this.title,
          note: this.note,
          status: this.status
        };
        this.$store
          .dispatch('addNewTodo', newTodo)
          .then(() => this.$emit('toggle'))
          .catch(err => console.log('error saving todo', err));
      } else {
        alert('invalid todo');
      }
    }
  }
}
</script>

<style scoped>
.todo-form {
  width: 75%;
  margin: auto;
}

.new-todo-save {
  text-align: right;
}
</style>
