<template id="homeTemplate">
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
        <icon name="navicon" />
      </b-btn>
      <h1 class="nav-header navbar-brand mb-0">Home</h1>
      <div></div>
    </nav>
    <div class="home-content">
      <b-row id="welcome-banner">
        <b-col cols="12">
          <div class="text-center">
            <h3>Welcome to</h3>
            <img alt="vuetron-logo-lg" id="vuetron-logo-lg"
              src="http://i1153.photobucket.com/albums/p520/samanthasalley/vuetron/vuetron-logo-dark3x_zpshpqvhhxw.png" />
          </div>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col cols="6" class="split-right">
          <div>
            <p><strong>Event Stream</strong></p>
            <span>Real-time event tracking with support for Vuex state changes, Vue $emit events, fetch API requests.  Enables Vuex state reversion</span>
          </div>
        </b-col>
        <b-col cols="6">
          <p><strong>Subscriptions</strong></p>
          <p>Debugging a particular piece of state? Add a subscription and track only the state changes you care about!</p>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col cols="6" class="split-right">
          <p><strong>State</strong></p>
          <p>Click through the entire Vuex state of your application.</p>
        </b-col>
        <b-col cols="6">
          <p><strong>Vue Vision</strong></p>
          <p>Get a clear picture of your application's component hierarchy.  Collapse sections you're not interested in to focus only on a specific part of your app.</p>
        </b-col>
      </b-row>
      <hr>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "Home"
  };
</script>

<style scoped>
  #welcome-banner {
    margin-bottom: 30px;
  }

  .navbar {
    margin-bottom: 20px;
  }

  .home-content {
    color: #2F4B5C;
    padding: 0 30px 0 45px;
  }

  .split-right {
    border-right: 1px solid darkgray;
  }
</style>

 