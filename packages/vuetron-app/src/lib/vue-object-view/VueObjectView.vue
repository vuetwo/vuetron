<template>
  <div class="vue-object-view">
    <objectTreeNode v-model="value" :primary="true" :nowrap="nowrap" :expandButtonText="expandButtonText" :setOpen="setOpen" />
  </div>
</template>

<script>
import objectTreeNode from './ObjectTreeNode.vue';

export default {
  name: 'vueObjectView',
  props: {
      value: [String, Number, Array, Function, Boolean, Object],
      primary: Boolean,
      expandButtonText: {
          type: String,
          default: '...'
      },
      nowrap: {
          type: Boolean,
          default: true
      },
    setOpen: {
      type: Boolean,
      default: true
    }
  },
  components: {
      objectTreeNode
  }
}
</script>

<style scoped>
    div.vue-object-view {
        text-align: left;
        font-family: courier;
        overflow: hidden;
    }
</style>
