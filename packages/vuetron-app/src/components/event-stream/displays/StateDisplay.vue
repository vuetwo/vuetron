<template id="stateDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}  </strong>
      <revert-btn v-if="event.status === 'active'" :eid="eid" />
    </p>
    <p><strong>Initial State:</strong></p>
    <vue-object-view :value="processInfo" :nowrap="nowrapBool" :setOpen="false" />
  </div>
</template>
  
<script>
  import RevertBtn from '../../assets/RevertBtn.vue';
  export default {
    name: 'StateDisplay',
    props: ['event', 'eid'],
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
      'revert-btn': RevertBtn
    }
  };
</script>

<style>
  
</style>

<style scoped>
  
</style>

 