<template>
  <div>
    <router-view></router-view>
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
