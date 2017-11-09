<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <h1 id="headerStyle" class="navbar-brand mb-0">Subscription</h1>
    </nav> 
    <div>
      <p><strong>Add Subscription</strong></p>
      <b-input-group>
        <b-form-input type="text" placeholder="subscription path" v-model="newSub" @keydown.native.enter="addSub"/>
        <b-input-group-button slot="right">
          <b-button @click="addSub" variant="success">Subscribe</b-button>
        </b-input-group-button>
      </b-input-group>
    </div>
    <div v-if="show && subscriptions">
      <hr>
      <b-list-group>
        <b-list-group-item v-for="(value, key, index) in subscriptions" v-bind:key="index">
          <h3>{{ key }} - <b-button @click="() => {remSub(key)}" variant="warning">Unsubscribe</b-button></h3>
          <span><strong>Mutations: </strong></span>
          <VueObjectView :value="value" />
        </b-list-group-item>
      </b-list-group>
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
        this.$nextTick(() => (this.show = true));
        return this.$store.state.subscriptions;
      }
    },
    methods: {
      addSub() {
        if (this.newSub) {
          this.$store.commit('addSubscription', this.newSub);
          this.newSub = null;
        }
      },
      remSub(key) {
        this.$store.commit('removeSubscription', key);
      }
    },
    components: {
      VueObjectView
    }
  };
</script>

<style scoped>
  #headerStyle {
    color: #0B9BD7;
  }
</style>
