<template>
  <div>
   <h1>{{ msg }}</h1>
   <div v-if="show && clientState">
    <VueObjectView :value="clientState" />
   </div>
   <div>{{ clientState }}</div>
  </div>
</template>
 
 <script>
import VueObjectView from "vue-object-view";

export default {
  data() {
    return {
      msg: "Hello Sam",
      show: true // required for properly re-rendering object view on change
    };
  },
  computed: {
    clientState() {
      this.show = false; 
      this.$nextTick(() => {
        this.show = true;
      });
      return this.$store.state.clientState;
    }
  },
  components: {
    VueObjectView
  }
};
</script>