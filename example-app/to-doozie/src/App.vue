<template>
  <div id="app">
    <navbar />
    <div class="bounce">
      <img src="./assets/vbot-icon-light.png" alt="spinning icon"
        class="vbot-icon spin" />
    </div>
    <b-container class="content" fluid>
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
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
@keyframes ani {
  0% {
    left: 0;
  }
  50% {
    left: 70%;
  }
  100% {
    left: 5%;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  background: #001453 url('./assets/space-background.jpg') repeat-y;
  background-size: 100% 100%;
}

.spin {
  -webkit-animation:spin 2s linear infinite;
  -moz-animation:spin 2s linear infinite;
  animation:spin 2s linear infinite;
}

.bounce {
  position: absolute;
  /* x-transition: all 5s ease-in-out; */
  animation: ani 5s infinite;
}

.vbot-icon {
  max-height: 150px;
  /* margin: 30px auto; */
}

.content {
  margin-top: 225px;
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
