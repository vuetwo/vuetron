<template id="mutateBtnTemplate">
  <b-btn class="mutate-btn" variant="transparent"
    v-b-popover.hover.right="mutateBtnHelpText"
    @click="mutateState">
    <icon name="undo" />
  </b-btn>
</template>
  
<script>
  export default {
    name: 'MutateButton',
    props: ['evIdx'],
    data() {
      return {
        mutateBtnHelpText: 'Re-commit selected mutation.'
      };
    },
    computed: {
    },
    methods: {
      mutateState() {
        this.$store.commit('mutateClientState', this.evIdx);
      }
    },
    components: {
    }
  };
</script>

<style>
  
</style>

<style scoped>
  .mutate-btn {
    color: darkgray;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
