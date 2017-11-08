<!-- <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script> -->

<template>
  <div>
      <router-view></router-view>
      <!-- <event-stream></event-stream>
      <subscription></subscription>   -->
      <!-- <state></state> -->
  </div>
</template>

<script>
import EventStream from './EventStream.vue';
import Subscription from './Subscription.vue';
import State from './State.vue';

export default {
  components: {
    eventStream: EventStream,
    subscription: Subscription,
    state: State
  }
}
</script>
