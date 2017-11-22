<template>
  <div id="subscriptions">
    <navbar title="Subscriptions" />
    <b-container id="subs-content" fluid>
      <b-row v-if="showSubs">
        <b-col cols="12">
          <p><strong>Add Subscription</strong></p>
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <add-sub-input location="main" v-on:toggle="toggleSubs" />
        </b-col>
        <b-col cols=12>
          <hr>
          <display-subscriptions v-on:toggle="toggleSubs" />
        </b-col>
      </b-row>
      <b-row v-if="!showSubs" class="full-height-middle">
        <a class="add-sub-icon text-center" v-b-modal.addSubModal>
          <div class="add-sub-logo">
            <icon name="plus" scale="6" />
          </div>
          <div class="add-sub-text">
            <h2>Add Subscription</h2>
          </div>
        </a>
      </b-row>
    </b-container>
    <b-modal id="addSubModal"
             ref="subModal"
             title="Add Your First Subscription"
             :hide-footer="true">
      <add-sub-input location="modal" v-on:toggle="toggleSubs" v-on:close="closeModal" />
    </b-modal>
  </div>
</template>
 
<script>
  import { mapGetters } from 'vuex';

  import VueObjectView from "vue-object-view";
  import Navbar from '../navigation/Navbar.vue';
  import AddSubBtn from "./assets/AddSubBtn.vue";
  import AddSubInput from "./assets/AddSubInput.vue";
  import DisplaySubscriptions from "./DisplaySubscriptions.vue";

  export default {
    data() {
      return {
        newSub: '',
        showSubs: this.$store.getters.subsBool
      }
    },
    methods: {
      toggleSubs() {
        this.showSubs = this.$store.getters.subsBool;
      },
      closeModal() {
        this.$refs.subModal.hide();
      }
    },
    components: {
      'navbar': Navbar,
      'add-sub-btn': AddSubBtn,
      'add-sub-input': AddSubInput,
      'vue-object-view': VueObjectView,
      'display-subscriptions': DisplaySubscriptions
    }
  };
</script>

<style scoped>
  a.add-sub-icon {
    height: 300px;
    width: 300px;
    margin: 15px auto;
    color: #001453;
    background-color: rgba(5, 248, 180, 0.31);
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
  }
  .add-sub-icon:hover {
    box-shadow: 0px 0px 5px #001453;
  }

  .add-sub-logo {
    text-align: center;
  }

  .add-sub-text {
    text-align: center;
    padding: 20px;
  }

  .full-height-middle {
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #subscriptions {
    color: #2f4b5c;
    height: 100%;
  }

  #subs-content {
    height: 100%;
    margin-top: 10px;
  }

  .unsub-btn {
    cursor: pointer;
    color: red;
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
