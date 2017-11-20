
<template id="apiDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}</strong>
    </p>
    <p><strong>Request Method</strong>: {{ event.display.requestObj[0].method.toUpperCase() }}</p>
    <b-list-group>
      <b-list-group-item>
        <p><strong>Request</strong>:</p>
        <VueObjectView :value="processRequest" :nowrap="nowrapBool" />
      </b-list-group-item>
      <b-list-group-item>
        <p><strong>Response</strong>:</p>
        <VueObjectView :value="processResponse" :nowrap="nowrapBool" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
  
<script>
  import VueObjectView from 'vue-object-view';
  export default {
    name: 'APIDisplay',
    props: ['event'],
    data() {
      return {
        processedRequest: null,
        processedResponse: null,
        nowrapBool: false
      };
    },
    computed: {
      processRequest() {
        this.processedRequest = Object.assign({}, this.event.display.requestObj);
        return this.processedRequest;
      },
      processResponse() {
        this.processedResponse = Object.assign({}, this.event.display.responseObj);
        return this.processedResponse;
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

 