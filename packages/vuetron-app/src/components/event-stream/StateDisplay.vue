<template id="stateDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}  </strong>
      <revert-btn v-if="event.status === 'active'" :evIdx="evIdx" />
    </p>
    <p><strong>Initial State:</strong></p>
    <vue-object-view :value="processInfo" :nowrap="nowrapBool" />
  </div>
</template>
  
<script>
  import VueObjectView from 'vue-object-view';
  import RevertBtn from './assets/RevertBtn.vue';
  export default {
    name: 'StateDisplay',
    props: ['event', 'evIdx'],
    data() {
      return {
        processedInfo: null,
        nowrapBool: false
      };
    },
    computed: {
      processInfo() {
        this.processedInfo = Object.assign({}, this.event.display);
        return this.processedInfo;
      }
    },
    components: {
      'vue-object-view': VueObjectView,
      'revert-btn': RevertBtn
    }
  };
</script>

<style>
  
</style>

<style scoped>
  
</style>

 