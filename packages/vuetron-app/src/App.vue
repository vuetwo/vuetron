<template>
  <b-container class="app" fluid>
    <b-row class="app">
      <b-col id="vuetron-navbar" class="navbar" v-show="showNavbar" cols="4" lg="2">
        <navbar></navbar>
      </b-col>
      <main v-bind:class="{ 'display padding-0 col-8 col-lg-10': showNavbar, 'display padding-0 col-xs-12 col-lg-12': !showNavbar }">
        <router-view></router-view>
      </main>
    </b-row>
  </b-container>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  export default {
    computed: {
      showNavbar () {
        return this.$store.state.displayNavbar;
      }
    },
    components: {
      navbar: Navbar
    }
  }
</script>

<style>
  .app {
    height: 100%;
  }
  .navbar {
    height: 100% !important;
    background-color:#2F4B5C;
  }
  .display {
    background-color: #EDDBB4;
    overflow: scroll;
  }
  .padding-0{
    padding-right:0;
    padding-left:0;
  }

  #vuetron-navbar {
    display: block;
  }

  #toggle-nav-btn {
    color: #31B689;
  }

  /* custom bootstrap styles */
  .nav-header{
    color: #31B689 !important;
  }

  .btn:hover {
    cursor: pointer;
  }
  .btn-success {
    background-color: #31B689;
  }
  .btn-success:hover {
    background-color: #227f5e;
  }
  .btn-transparent {
    background-color: transparent;
  }
  .btn-transparent:hover {
    background-color: transparent;
  }
</style>
