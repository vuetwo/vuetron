<template>
  <div id="profile">
    <div class="text-center" v-if="user">
      <h2>Profile info for: {{ user.name }}</h2>
      <p><strong>Username</strong>: {{ user.username }}</p>
      <p><strong>Team</strong>: {{ user.team }}</p>
      <p><strong>Side</strong>: {{ user.category }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: this.$store.state.user
    };
  }
}
</script>
