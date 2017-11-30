<template>
  <div id="user-selection" class="center-content">
    <h2>Choose a user</h2>
    <b-form-select v-model="selectedUser" :options="getUserOptions">
    </b-form-select>
    <div class="text-right user-btn">
      <b-btn variant="primary" size="lg" 
        @click="setUser">
        Save selection
      </b-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'UserSelection',
  data() {
    return {
      selectedUser: null
    };
  },
  computed: {
    ...mapGetters([
      'getUserOptions'
    ])
  },
  methods: {
    setUser() {
      this.$store.commit('SET_USER', this.selectedUser);
      this.$router.push('/todo');
    }
  }
}
</script>

<style scoped>
#user-selection {
  width: 500px;
  background: lightgray;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px #444444;
}

.user-btn {
  margin-top: 15px;
}

.center-content {
  margin:auto;
}
</style>
