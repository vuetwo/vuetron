<template>
  <b-container class="app" fluid>
    <b-row class="app">
      <b-col id="vuetron-sidebar" class="navbar" v-show="showSidebar" cols="4" md="3" lg="2">
        <sidebar></sidebar>
      </b-col>
      <main v-bind:class="{ 'display padding-0 col-8 col-md-9 col-lg-10': showSidebar, 'display padding-0 col-12 col-md-12 col-lg-12': !showSidebar }">
        <router-view></router-view>
      </main>
    </b-row>
  </b-container>
</template>

<script>
  import Sidebar from './components/navigation/Sidebar.vue';
  export default {
    computed: {
      showSidebar () {
        return this.$store.state.displaySidebar;
      }
    },
    components: {
      sidebar: Sidebar
    }
  }
</script>

<style>
  .app {
    height: 100%;
  }

  .display {
    overflow: scroll;
  }

  .padding-0{
    padding-right:0;
    padding-left:0;
  }

  #vuetron-sidebar {
    height: 100% !important;
    display: block;
    background: #364984;
    padding: 0;
  }

  /* custom styles for object view */
  .vue-object-view {
    color: #001453;
  }
  .vue-object-view-open {
    color: #001453;
    cursor: pointer;
  }
  .vue-object-view-open:focus {
    outline: none;
  }
  .vue-object-view-expand {
    background: transparent;
    color: #001453;
    border: none;
    cursor: pointer;
  }

  /* custom bootstrap styles */
  .btn:hover {
    cursor: pointer;
  }
  .btn-success {
    background-color: rgba(5, 248, 180, 0.61);
    border-color: rgba(5, 248, 180, 0.61);
    color: #001453;
  }
  .btn-success:hover {
    background-color: rgba(5, 248, 180, 0.31);
    border-color: rgba(5, 248, 180, 0.31);
    color: #001453;
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
