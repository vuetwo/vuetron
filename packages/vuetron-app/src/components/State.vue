<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <h1 id="headerStyle" class="navbar-brand mb-0">State</h1>
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
  },
  components: {
    VueObjectView,
  },
};
</script>
<style scoped>
   #headerStyle {
    color: #0B9BD7;
  }
</style>
