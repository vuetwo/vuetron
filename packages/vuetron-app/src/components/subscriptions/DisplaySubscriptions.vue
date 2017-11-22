<template>
  <b-col cols="12">
    <b-list-group>
      <b-list-group-item v-for="(value, key, index) in subscriptions" v-bind:key="index">
        <b-row>
          <b-col cols="10" md="11">
            <h3>{{ key }}</h3>
          </b-col>
          <b-col cols="2" md="1" class="text-right">
            <h3><icon name="times" class="unsub-btn"
              @click.native="() => {remSub(key)}" 
              v-b-popover.hover.auto="'Unsubscribe'" /></h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <span><strong>Mutations: </strong></span>
            <mutations :changes="value" />
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>


<script>
import Mutations from '../event-stream/assets/Mutations.vue';
export default {
  computed: {
    subscriptions() {
      return this.$store.state.subscriptions;
    }
  },
  methods: {
    remSub(key) {
      this.$store.commit('removeSubscription', key);
      this.$emit('toggle');
    }
  },
  components: {
    'mutations': Mutations
  }
};
</script>