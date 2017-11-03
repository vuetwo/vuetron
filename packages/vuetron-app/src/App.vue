<template>
  <div id="app">
      <display></display>
      <navbar></navbar>
  </div>
</template>

<script>
import Display from './components/Display.vue';
import Navbar from './components/Navbar.vue';
export default {
  components: {
    display: Display,
    navbar: Navbar
    }
  }
</script>
