<template>
  <div>
      <button>HI IM A BUTTON IN STATE!</button>
      <b-button>HI IM A BUTTON IN STATE!</b-button>
  </div>
    
  <!-- <div v-if="show && clientState">
    <VueObjectView :value="clientState" /> 
  </div> -->
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
