<template>
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}</strong>
    </p>
    <p>
      <strong>Request Method</strong>: {{ event.display.requestObj[0].method.toUpperCase() }}
    </p>
    <b-list-group>
      <b-list-group-item>
        <p><strong>Request</strong>:</p>
        <vue-object-view :value="processRequest" :nowrap="nowrapBool" 
          :setOpen="false" />
      </b-list-group-item>
      <b-list-group-item>
        <p><strong>Response</strong>:</p>
        <vue-object-view :value="processResponse" 
          :nowrap="nowrapBool" :setOpen="false" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
  
<script>
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
    }
  };
</script>

<style>

</style>

<style scoped>
</style>

 