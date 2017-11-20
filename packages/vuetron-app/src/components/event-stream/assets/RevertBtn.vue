<template id="revertBtnTemplate">
  <b-btn class="revert-btn" size="sm" variant="secondary"
    v-b-popover.hover.right="revertBtnHelpText"
    @click="revertState">
    <icon name="undo" />
    <span>Revert</span>
  </b-btn>
</template>
  
<script>
  export default {
    name: 'RevertButton',
    props: ['evIdx'],
    data() {
      return {
        revertBtnHelpText: 'Reverts application\'s Vuex state back to selected point.'
      };
    },
    computed: {
    },
    methods: {
      revertState() {
        this.$store.commit('revertClientState', this.evIdx);
      }
    },
    components: {
    }
  };
</script>

<style>
  
</style>

<style scoped>
  .revert-btn {
    margin-left: 10px;
  }
  .revert-btn .fa-icon {
    vertical-align: middle;
  }
  .revert-btn span {
    padding-left: 5px;
  }
</style>
