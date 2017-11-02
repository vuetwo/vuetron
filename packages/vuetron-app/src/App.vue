<template>
  <div id="app">
  <div id="sidebar-wrapper">
      <ul><button v-on:click="timeline">Timeline</button></ul>
      <ul><button v-on:click="selectedPage">Subscription</button></ul>
      <ul><button v-on:click="stateView">Stateview</button></ul>
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue';
import Subscription from './components/Subscription.vue';
import Stateview from './components/Stateview.vue';

export default {
  components: {
    Timeline,
    Subscription,
    Stateview
  },
};
</script>
