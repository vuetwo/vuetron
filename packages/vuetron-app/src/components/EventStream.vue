<template>
  <div>
    <h1>{{ msg }}</h1>
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="index">
        <h1 @click="() => {emitEventToggle(index)}">{{ event.title }}</h1>
        <div v-show="event.show">
          <p>{{ event.display }}</p>
        </div>
      </div>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      msg: "Hello Louis"
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  methods: {
    emitEventToggle(evIdx) {
      this.$store.commit("toggleEventShow", evIdx);
    }
  }
};
</script>
 