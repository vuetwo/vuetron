
<template id="stateDisplayTemplate">
  <VueObjectView :value="processInfo" />
</template>
  
<script>
  import VueObjectView from 'vue-object-view';
  export default {
    name: 'StateDisplay',
    props: ['info'],
    data() {
      return {
        processedInfo: null
      };
    },
    computed: {
      processInfo() {
        this.processedInfo = Object.assign({}, this.info);
        return this.processedInfo;
      }
    },
    components: {
      VueObjectView
    }
  };
</script>

<style>
  
</style>

<style scoped>
  
</style>

 