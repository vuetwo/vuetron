<template>
  <div id="app">
      <display id="display"></display>
      <navbar id="navbar"></navbar>
  </div>
</template>

<script>
import Display from './components/Display.vue';
import Navbar from './components/Navbar.vue';
export default {
  components: {
    display: Display,
    navbar: Navbar
    }
  }
</script>
<style>
  #app {
    height: 100%;
    /* background-color: #2F4B5C */
  }
  #navbar {
    float: left;
    height: 100%;
    width: 20%;
    background-color:#2F4B5C;
  }
  #display {
    float: right;
    height: 100%;
    width: 80%;
    background-color: #31B689;
    overflow: scroll;
  }
</style>
