<template>
  <div class="sidebar">
      <div id="navbar-logo" class="text-center">
        <img alt="vuetron-logo" class="text-center" src="http://i1153.photobucket.com/albums/p520/samanthasalley/vuetron/vuetron-logo-light-new-v2_zpsfksut9qb.png" />
      </div>
      <b-list-group id="navbar-links" class="text-center">
        <b-list-group-item v-for="(routeObj, index) in routes" :key="index" class="router-item"
        :class="[ currentRoute.path === routeObj.path ? 'active' : '' ]">
          <router-link :to="routeObj.path" class="route-link">
            {{ routeObj.name }}
          </router-link>
        </b-list-group-item>
      </b-list-group>
  </div>
</template>


<script>
export default {
  data() {
    return {
      routes: [
        { path: "/", name: 'Home' },
        { path: "/eventstream", name: 'Event Stream' },
        { path: "/subscription", name: 'Subscriptions' },
        { path: "/state", name: 'State' },
        { path: "/vuevision", name: 'Vue Vision' }
      ]
    };
  },
  computed: {
    currentRoute () {
      return this.$route;
    }
  }
};
</script>

<style>
</style>

<style scoped>
  a {
    text-decoration: none;
    color: #06F7B4;
  }

  .sidebar {
    height: 100%;
  }

  .router-item {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .router-item.active {
    background: #001453;
  }

  .list-group {
    height: 70%;
    min-height: 600px;
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .list-group-item {
    background: transparent;
    border: none;
  }

  .route-link {
    font-size: 1.3rem;
  }

  #navbar-logo {
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
  }
</style>        
