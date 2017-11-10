<template>
  <div>
      <h3 id="appTitle">Vuetron</h3>
      <b-list-group id="navbar-links" class="text-center">
        <b-list-group-item v-for="(routeObj, index) in routes" :key="index">
          <router-link :to="routeObj.path">
            <span class="route-link">{{ routeObj.name }}</span>
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
        { path: "/eventstream", name: 'Event Stream' },
        { path: "/subscription", name: 'Subscriptions' },
        { path: "/state", name: 'State' },
        { path: "/componentTree", name: 'Vue Vision' }
      ]
    };
  }
};
</script>

<style>
</style>

<style scoped>
  a {
    text-decoration: none;
    color: #31B689;
  }

  .list-group {
    width: 100%;
  }
  .list-group-item {
    background: transparent;
    border: none;
  }

  .route-link {
    font-size: 1.3rem;
  }

  .routerButton {
    height: 100px;
    width: 150px;
    margin-top: 20px;
    background-color: #0b9bd7;
    border: none;
    /* display: inline-block; */
    float: none;
    /* position: absolute;
          left: 50%;
          transform: translate(-50%,-50%); */
  }

  #appTitle {
    /* position: absolute;
    top: 0px; */
    color: #31B689;
  }
</style>        
