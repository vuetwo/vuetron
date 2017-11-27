<template>
  <div>
    <navbar title="State" />
    <b-container v-if="show && clientState" fluid>
      <vue-object-view :value="clientState" /> 
    </b-container>
  </div>
</template>
 
<script>
  import Navbar from './navigation/Navbar.vue';
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
      'navbar': Navbar
    },
};
</script>
<style scoped>
</style>
