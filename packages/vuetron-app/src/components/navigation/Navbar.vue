<template id="navbarTemplate">
  <nav class="navbar sticky-top navbar-light bg-faded">
    <b-btn @click="() => {this.$store.commit('toggleSidebarDisplay')}" variant="transparent" class="toggle-nav-btn">
      <icon v-if="showSidebar"
        name="caret-left" class="open" />
      <icon v-if="!showSidebar"
        name="caret-right" class="closed" />
    </b-btn>
    <h3 class="nav-header">{{ title }}</h3>
    <div></div>
  </nav>
</template>
  
<script>
  export default {
    name: "Navbar",
    props: {
      title: {
        type: String,
        required: true
      },
      rightComponent: {
        type: String,
        required: false,
        default: null
      }
    },
    computed: {
      showSidebar() {
        return this.$store.state.displaySidebar;
      }
    }
  };
</script>

<style scoped>
  .navbar {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
    background: white;
    border-bottom: 1px solid #001453;
  }

  .nav-header{
    color: #001453 !important;
  }

  .toggle-nav-btn {
    color: #D8D8D8;
  }
  .toggle-nav-btn:hover {
    color: #364984;
  }

  .fa-icon {
    width: auto;
    height: 1.5em;
    max-width: 100%;
    max-height: 100%;
  }
</style>

 