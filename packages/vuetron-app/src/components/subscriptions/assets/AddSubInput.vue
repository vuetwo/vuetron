<template>
  <b-form-group label="New Subscription Path"
                :state="state"
                invalid-feedback="You must enter a path.">
    <b-input-group>
      <b-form-input type="text" 
                    placeholder="subscription path" 
                    v-model="newSub"
                    @keydown.native.enter="addSub"/>
      <b-input-group-button slot="right">
        <add-sub-btn v-on:click.native="addSub" />
      </b-input-group-button>
    </b-input-group>
  </b-form-group>
</template>


<script>
import AddSubBtn from "./AddSubBtn.vue";
export default {
    name: "AddSubInput",
    props: ['location'],
    data() {
      return {
        newSub: '',
        error: false
      }
    },
    computed: {
      state() {
        return this.newSub.length > 0 ? 'valid' : 'invalid';
      }
    },
    methods: {
      addSub() {
        if (this.newSub) {
          this.$store.commit('addSubscription', this.newSub);
          if (this.location === 'modal') {
            this.$emit('close');
          }
          this.$emit('toggle');
          this.clearForm();
        }
      },
      clearForm() {
        this.newSub = '';
      }
    },
    components: {
      'add-sub-btn': AddSubBtn
    }
};
</script>