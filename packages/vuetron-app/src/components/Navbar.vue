<template id="template">
<div id="navContainer">
    <div>
        <router-link to="/subscription"><b-button class="routerButton">Subscription</b-button></router-link>
        <router-link to="/state"><b-button class="routerButton">State</b-button></router-link>
        <router-link to="/eventstream"><b-button class="routerButton">Event Stream</b-button></router-link>
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
    .routerButton {
        height: 100px;
        width: 150px;
        margin: 20px;
        background-color: #0B9BD7;
        border: none;
    }
    /* #template {
        height: 100%;
    }
    #navContainer {
        height: 100%;
    } */
    
</style>        