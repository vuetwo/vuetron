<template id="template">
<div id="navContainer">
    <div>
        <button class="navButton" v-on:click="eventstream">EventStream</button>
        <button class="navButton" v-on:click="subscription">Subscription</button> 
        <button class="navButton" v-on:click="state">State</button> 
    </div>   
</div>
</template>

<script>
export default {
    // data() {
    //     return {
    //     }
    // },
  methods: {
      eventstream() {
          alert('eventstream is active');
      },
      subscription() {
          alert('subscription is active');
      },
      state() {
          alert('state is active');
      }
  }
}
</script>
<style scoped>
    /* #template {
        height: 100%;
    }
    #navContainer {
        height: 100%;
    } */
    
</style>        