<template id="homeTemplate">
  <div>
    <navbar title="Home" id="home-navbar" />
    <div class="home-content">
      <b-row id="welcome-banner">
        <b-col cols="12">
          <div class="text-center">
            <img alt="vuetron-logo-lg" id="vuetron-logo-lg"
              src="../../assets/vuetron-logo-dark-new-3x.png" />
            <br><br>
            <p><em>A tool for testing and debugging Vue.js applications</em></p>
          </div>
        </b-col>
      </b-row>
      <hr>
      <b-container fluid>
        <header class="text-center" id="test">
          <h4>Getting Started</h4>
        </header>
        <div class="text-center">
          <p>
            Make sure you have Vuetron <a href="https://github.com/vuetwo/vuetron/blob/master/docs/INSTALLATION.md" target="_blank">properly configured</a> in your app.
          </p>
          <p>
            Take a look at the options below and select where you want to begin.
          </p>
          <p>
            Use the caret icon in the navbar at any point to toggle the sidebar navigation.
          </p>
        </div>
      </b-container>
      <hr>
      <b-container fluid>
        <header class="text-center">
          <h4>App Components</h4>
        </header>
        <b-row>
          <site-nav-info :info="eventStreamData" />
          <site-nav-info :info="subscriptionData" />
        </b-row>
        <b-row>
          <site-nav-info :info="stateData" />
          <site-nav-info :info="vueVisionData" />
        </b-row>
      </b-container>
      <hr>
    </div>
  </div>
</template>
  
<script>
  import Navbar from '../navigation/Navbar.vue';
  import SiteNavInfo from './SiteNavInfo.vue';
  export default {
    name: "Home",
    data() {
      return {
        sidebarPop: false,
        eventStreamData: {
          redirectPath: '/eventstream',
          iconName: 'feed',
          infoTitle: 'Event Stream',
          infoBlurb: 'Real-time event tracking and time-travel debugging with support for Vuex state changes, Vue $emit events, fetch API requests.'
        },
        subscriptionData: {
          redirectPath: '/subscription',
          iconName: 'map-pin',
          infoTitle: 'Subscriptions',
          infoBlurb: 'Interested in a particular piece of state? Add a subscription and track only the state changes you care about!'
        },
        stateData: {
          redirectPath: '/state',
          iconName: 'globe',
          infoTitle: 'State',
          infoBlurb: 'Click through the entire Vuex state of your application.'
        },
        vueVisionData: {
          redirectPath: '/vuevision',
          iconName: 'sitemap',
          infoTitle: 'Vue Vision',
          infoBlurb: 'Get a clear picture of your application\'s component hierarchy.  Collapse sections you\'re not interested in to focus only on a specific section.'
        },
      };
    },
    computed: {
      showSidebarPop() {
        console.log('evaluating pop show');
        return this.sidebarPop;
      }
    },
    methods: {
      toggleSidebar() {
        console.log('sidebar before', this.sidebarPop); 
        return this.sidebarPop = !this.sidebarPop; 
        console.log('sidebar after', this.sidebarPop);
      }
    },
    components: {
      'navbar': Navbar,
      'site-nav-info': SiteNavInfo
    }
  };
</script>

<style>
  a.info {
    height: 300px;
    width: 300px;
    margin: 15px auto;
    color: #001453;
    background-color: rgba(5, 248, 180, 0.31);
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
  }
  .info:hover {
    box-shadow: 0px 0px 5px #001453;
  }

  .info-logo {
    text-align: center;
  }

  .info-text {
    text-align: center;
    padding: 20px;
  }
</style>

<style scoped>
  #welcome-banner {
    margin-bottom: 30px;
  }

  .home-content {
    color: #001453;
  }
</style>

 