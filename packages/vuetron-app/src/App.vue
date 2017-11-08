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
#navbar {
  position: absolute;
  float: left;
  width: 19%;
  height: 80% ;
  background-color: #0B9BD7;

}
#display {
  float: right;
  width: 80%;
  height: 80% ;
  background-color: #31B689

}

#app {
  color: #2F4B5C;
  width: 100%;

}
</style>
