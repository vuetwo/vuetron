<template>
  <div id="subscriptions">
    <navbar title="Subscriptions" />
    <b-container id="subs-content" fluid>
      <b-row>
        <b-col cols="12">
          <p><strong>Add Subscription</strong></p>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-input-group>
            <b-form-input type="text" placeholder="subscription path" v-model="newSub" @keydown.native.enter="addSub"/>
            <b-input-group-button slot="right">
              <b-button @click="addSub" variant="success" size="sm">Subscribe</b-button>
            </b-input-group-button>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row v-if="show && subscriptions">
        <hr>
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
                  <vue-object-view :value="value" />    
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
 
<script>
  import Navbar from './navigation/Navbar.vue';
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
      'navbar': Navbar,
      'vue-object-view': VueObjectView
    }
  };
</script>

<style scoped>
  #subscriptions {
    color: #2f4b5c;
  }

  #subs-content {
    margin-top: 10px;
  }

  #unsub-btn {
    color: red;
  }

  .fa-icon {
    cursor: pointer;
  }

  .form-control {
    background: #fcf9f2;
  }
  .form-control:focus {
      border: none;
      box-shadow: none;
  }

  .list-group {
    margin-top: 20px;
  }
  .list-group-item {
    background-color: #fcf9f2;
    margin-bottom: 10px;
  }
</style>
