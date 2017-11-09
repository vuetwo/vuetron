<template>
<div>
    <h1 id="appTitle">Vuetron</h1>
    <div>
        <router-link to="/subscription"><b-button class="routerButton">Subscription</b-button></router-link>
        <router-link to="/state"><b-button class="routerButton">State</b-button></router-link>
        <router-link to="/eventstream"><b-button class="routerButton">Event Stream</b-button></router-link>
    </div>   
</div>
</template>

<script>
export default {
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
        margin-top: 20px;
        background-color: #0B9BD7;
        border: none;
        /* display: inline-block; */
        float: none;
        /* position: absolute;
        left: 50%;
        transform: translate(-50%,-50%); */
    }
    #appTitle {
        position: absolute;
        top: 0px;
        color: #0B9BD7;
    } 
</style>        