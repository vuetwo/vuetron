<template>
  <b-col cols="12">
    <b-list-group>
      <b-list-group-item v-for="(value, key, index) in subscriptions" v-bind:key="index">
        <b-row>
          <b-col cols="10" md="11">
            <h3>{{ key }}</h3>
          </b-col>
          <b-col cols="2" md="1" class="text-right">
            <h3><icon name="times" id="unsub-btn"
              @click.native="() => {remSub(key)}" 
              v-b-popover.hover.auto="'Unsubscribe'" /></h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <span><strong>Mutations: </strong></span>
            <VueObjectView :value="value" />    
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>


<script>
import VueObjectView from "vue-object-view";
export default {
    computed: {
      subscriptions() {
        return this.$store.state.subscriptions;
      }
    },
    methods: {
      remSub(key) {
        this.$store.commit('removeSubscription', key);
      }
    },
    components: {
      VueObjectView,
    }
};
</script>