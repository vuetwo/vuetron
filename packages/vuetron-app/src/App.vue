<template>
  <!-- <div id="app">
      <display id="display"></display>
      <navbar id="navbar"></navbar>
  </div> -->
  <b-container class="app" fluid>
    <b-row class="app">
      <b-col class="navbar" cols='4' md='3' lg='2'>
          <navbar></navbar>
      </b-col>
      <b-col class="display" cols='8' md='9' lg='10'>
          <display></display>
      </b-col>
    </b-row>
  </b-container>
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
  /* #app {
    height: 100%;
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
  } */
  .app {
    height: 100%;
  }
  .navbar {
    height: 100%;
    /* float: left; */
    background-color:#2F4B5C;
  }
  .display {
    /* float: right; */
    background-color: #31B689;
    /* overflow: scroll; */
  }
</style>
