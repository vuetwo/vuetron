<template>
  <div>
    <div v-if="show && subscriptions">
      <ul>
        <li v-for="(value, key, index) in subscriptions" v-bind:key="index">
          <h3>{{ key }}</h3>
          <VueObjectView :value="value" />
        </li>
      </ul>
    </div>
    <div>
      <p><strong>Add Subscription</strong></p>
      <input type="text" placeholder="subscription path" v-model="newSub"/>
      <b-button @click="addSub" variant="success">Subscribe</b-button>
    </div>
  </div>
</template>
 
 <script>
 import VueObjectView from "vue-object-view";
export default {
  data() {
    return {
      newSub: null,
      show: true
    };
  },
  computed: {
    subscriptions() {
      this.show = false;
      this.$nextTick(() => this.show = true);
      return this.$store.state.subscriptions;
    }
  },
  methods: {
    addSub() {
      this.$store.commit('addSubscription', this.newSub);
    }
  },
  components: {
    VueObjectView,
  },
};
</script>