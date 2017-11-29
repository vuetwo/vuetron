<template>
  <b-btn variant="primary" size="sm" class="add-todo-btn" @click="() => $emit('toggle')">
    <icon name="plus" class="add-btn-icon" />
    <span class="add-btn-text">Add Todo</span>
  </b-btn>
</template>

<script>
export default {
  name: 'AddTodoBtn'
}
</script>

<style scoped>
.add-btn-icon {
  vertical-align: middle;
  margin-right: 5px;
}

.add-btn-text {
  vertical-align: middle;
  font-weight: bold;
}
</style>