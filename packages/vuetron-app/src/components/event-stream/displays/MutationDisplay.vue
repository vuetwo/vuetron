<template id="mutationDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}  </strong>
      <revert-btn v-if="event.status === 'active'" :evIdx="evIdx" />
    </p>
    <p><strong>Change Log:</strong></p>
    <mutations :changes="event.display.changes" />
  </div>
</template>
  
<script>
  import Mutations from '../../assets/Mutations.vue';
  import RevertBtn from '../../assets/RevertBtn.vue';
  export default {
    name: 'MutationDisplay',
    props: ['event', 'evIdx'],
    components: {
      'mutations': Mutations,
      'revert-btn': RevertBtn,
    }
  };
</script>

<style>
  
</style>

<style scoped>
  .card {
    background: transparent;
    border: none;
  }
  .card-body {
    padding: 0;

  }
</style>

 