<template>
  <div id="app">
    <navbar />
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar';
export default {
  name: 'app',
  components: {
    'navbar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* CUSTOM BOOTSTRAP STYLING */
.btn-transparent {
  background-color: transparent;
}
.btn-transparent:hover {
  background-color: transparent;
}
.btn-transparent:active {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-transparent:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-transparent:active:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
