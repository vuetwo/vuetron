<template id="revertBtnTemplate">
  <b-btn class="revert-btn text-center" size="sm" variant="danger"
    v-b-popover.hover.right="revertBtnHelpText"
    @click="revertState">
    <icon name="history" />
    <br>
    <span>Revert</span>
  </b-btn>
</template>
  
<script>
  export default {
    name: 'RevertButton',
    props: ['eid'],
    data() {
      return {
        revertBtnHelpText: 'Revert application\'s Vuex state back to selected point.'
      };
    },
    computed: {
    },
    methods: {
      revertState() {
        this.$store.commit('revertClientState', this.eid);
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
</style>
