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
    props: ['eid'],
    data() {
      return {
        deactivateBtnHelpText: 'Update application to reflect state if selected mutation had not occurred.'
      };
    },
    computed: {
    },
    methods: {
      deactivateSingleEvent() {
        console.log('clicked', this.eid);
        this.$store.commit('deactivateStateEvent', this.eid);
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
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
