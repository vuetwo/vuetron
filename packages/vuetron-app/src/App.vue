<template>
  <div id="app">
    <Test :msg="msg" />
  </div>
</template>

<script>
import Test from "./components/Test.vue";

export default {
  components: {
    Test,
  },
  data() {
    return {
      msg: "Successful Test!"
    };
  },
};
</script>
