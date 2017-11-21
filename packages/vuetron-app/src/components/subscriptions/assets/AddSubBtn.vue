<template>
  <b-input-group-button slot="right">
    <b-button @click="addSub" variant="success" size="sm">Subscribe</b-button>
  </b-input-group-button>
</template>


<script>
export default {
    props: [
      'subscription'
    ],
    methods: {
      addSub() {
        if (this.subscription) {
          this.$store.commit('addSubscription', this.subscription);
        }
      }
    }
};
</script>