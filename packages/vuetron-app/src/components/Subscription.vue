<template>
  <div id="subscriptions">
    <nav class="navbar sticky-top navbar-light bg-faded">
      <div class="navbar-left">
        <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
          <icon name="navicon" />
        </b-btn>
      </div>
      <div class="navbar-middle">
        <h1 class="nav-header navbar-brand mb-0">Subscriptions</h1>
      </div>
      <div class="navbar-right">
      </div>
    </nav> 
    <b-container id="subs-content" fluid>
      <b-row>
        <b-col cols="12">
          <p><strong>Add Subscription</strong></p>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <b-input-group>
            <b-form-input type="text" placeholder="subscription path" v-model="newSub" @keydown.native.enter="addSub"/>
            <AddSubscriptionButton :subscription="newSub" v-on:click.native="clearForm"></AddSubscriptionButton>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row v-if="show">
          <hr>
        <DisplaySubscriptions></DisplaySubscriptions>
      </b-row>
    </b-container>
  </div>
</template>
 
<script>
  import AddSubscriptionButton from "./AddSubscriptionButton.vue"
  import DisplaySubscriptions from "./DisplaySubscriptions.vue"

  export default {
    data() {
      return {
        newSub: null,
        show: true
      };
    },
    methods: {
      addSub() {
        if (this.newSub) {
          this.$store.commit('addSubscription', this.newSub);
          this.clearForm();
        }
      },
      clearForm() {
        this.newSub = null;
        this.show = false;
        this.$nextTick(() => (this.show = true));
      },
    },
    components: {
      AddSubscriptionButton,
      DisplaySubscriptions
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
