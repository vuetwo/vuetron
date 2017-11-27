<template>
  <div class="full-height">
    <navbar title="State" />
    <b-container v-if="notNull && show && clientState" fluid>
      <vue-object-view :value="clientState" /> 
    </b-container>
    <b-container v-if="!notNull" class="full-height" fluid>
      <b-row class="full-height-middle">
        <a class="no-state-logo text-center" v-b-modal.addSubModal>
          <div class="no-state-icon">
            <icon name="frown-o" scale="6" />
          </div>
          <div class="no-state-text">
            <h2>No State Found</h2>
            <p>Waiting for app connection...</p>
          </div>
        </a>
      </b-row>
    </b-container>
  </div>
</template>
 
<script>
  import Navbar from './navigation/Navbar.vue';
  export default {
    data() {
      return {
        show: true, // required for properly re-rendering object view on change
      };
    },
    computed: {
      clientState() {
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
        return this.$store.state.clientState;
      },
      notNull() {
        return Object.keys(this.$store.state.clientState).length > 0;
      }
    },
    components: {
      'navbar': Navbar
    },
};
</script>
<style scoped>
  .no-state-logo {
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
  }

  .no-state-icon {
    text-align: center;
  }

  .no-state-text {
    text-align: center;
    padding: 20px;
  }

  .full-height {
    height: 100%;
  }

  .full-height-middle {
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
