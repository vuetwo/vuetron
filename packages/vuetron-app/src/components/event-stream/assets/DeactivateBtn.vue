<template id="deactivateBtnTemplate">
  <b-btn class="deactivate-btn" variant="transparent"
    v-b-popover.hover.right="deactivateBtnHelpText"
    @click="deactivateSingleEvent">
    <icon name="times" />
  </b-btn>
</template>
  
<script>
  export default {
    name: 'DeactivateButton',
    props: ['evIdx'],
    data() {
      return {
        deactivateBtnHelpText: 'Updates application to reflect state if selected mutation had not occurred.'
      };
    },
    computed: {
    },
    methods: {
      deactivateSingleEvent() {
        this.$store.commit('deactivateStateEvent', this.evIdx);
      }
    },
    components: {
    }
  };
</script>

<style>
  
</style>

<style scoped>
  .deactivate-btn {
    color: #7f7f7f;
  }
</style>
