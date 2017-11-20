<template>
  <b-container class="app" fluid>
    <b-row class="app">
      <b-col id="vuetron-navbar" class="navbar" v-show="showNavbar" cols="4" md="3" lg="2">
        <navbar></navbar>
      </b-col>
      <main v-bind:class="{ 'display padding-0 col-8 col-md-9 col-lg-10': showNavbar, 'display padding-0 col-12 col-md-12 col-lg-12': !showNavbar }">
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
    /* background-color:#2F4B5C; */
    background: rgba(60,81,92,1);
    background: -moz-linear-gradient(left, rgba(60,81,92,1) 0%, rgba(52,78,92,1) 26%, rgba(47,75,92,1) 49%, rgba(52,79,92,1) 75%, rgba(60,81,92,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(60,81,92,1)), color-stop(26%, rgba(52,78,92,1)), color-stop(49%, rgba(47,75,92,1)), color-stop(75%, rgba(52,79,92,1)), color-stop(100%, rgba(60,81,92,1)));
    background: -webkit-linear-gradient(left, rgba(60,81,92,1) 0%, rgba(52,78,92,1) 26%, rgba(47,75,92,1) 49%, rgba(52,79,92,1) 75%, rgba(60,81,92,1) 100%);
    background: -o-linear-gradient(left, rgba(60,81,92,1) 0%, rgba(52,78,92,1) 26%, rgba(47,75,92,1) 49%, rgba(52,79,92,1) 75%, rgba(60,81,92,1) 100%);
    background: -ms-linear-gradient(left, rgba(60,81,92,1) 0%, rgba(52,78,92,1) 26%, rgba(47,75,92,1) 49%, rgba(52,79,92,1) 75%, rgba(60,81,92,1) 100%);
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

  /* custom styles for object view */
  .vue-object-view {
    color: #2F4B5C;
  }
  .vue-object-view-open {
    color: #2F4B5C;
    cursor: pointer;
  }
  .vue-object-view-open:focus {
    outline: none;
  }
  .vue-object-view-expand {
    background: transparent;
    color: #2F4B5C;
    border: none;
    cursor: pointer;
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
  .btn-transparent:focus {
    box-shadow: none;
  }
</style>
