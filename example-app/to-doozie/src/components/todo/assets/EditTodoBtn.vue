<template>
  <b-btn variant="transparent" 
    size="sm" 
    class="edit-todo-btn"
    @click="() => {this.$emit('toggleedit')}">
    <icon name="pencil" />
  </b-btn>
</template>

<script>
export default {
  name: 'EditTodoBtn'
}
</script>
