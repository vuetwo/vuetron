<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
        <icon name="navicon" />
      </b-btn>
      <div class="navbar-middle">
        <h1 class="nav-header navbar-brand mb-0">State</h1>
      </div>
      <div class="navbar-right">
      </div>
    </nav>
    <b-container v-if="show && clientState">
      <VueObjectView :value="clientState" /> 
    </b-container>
  </div>
</template>
 
 <script>

import VueObjectView from "vue-object-view";

export default {
  data() {
    return {
      show: true, // required for properly re-rendering object view on change
    };
  },
  computed: {
    clientState() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      return this.$store.state.clientState;
    },
    instaPics() {
      console.log("CHECK ARR", this.$store.state.instaPics);
      return this.$store.state.instaPics;
     },
     events () {
      return this.$store.state.events;
     }
  },
  components: {
    VueObjectView,
  },
};
</script>
<style scoped>
  .navbar {
    margin-bottom: 20px;
  }
</style>
