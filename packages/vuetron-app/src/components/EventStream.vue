
<template>
  <div>
    <header id="eventStreamHeader">Event Stream</header>      
    <h1>{{ msg }}</h1>    
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="event.id">
        <h1 v-on:click="alertChanges(event)">{{ event.title }}</h1>  
        <div>
          <b-modal>I am a Button</b-modal>
          <!-- <b-button href="#">I am a Link</b-button> -->
        </div> 
      </div>    
  </div>
</template>
 
 <script>
 import BootstrapVue from 'bootstrap-vue';
 import 'bootstrap/dist/css/bootstrap.css'
 import 'bootstrap-vue/dist/bootstrap-vue.css'

 Vue.use(BootstrapVue);
 import bModal from 'bootstrap-vue/es/components/modal/modal'
 import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

 export default {
   data() {
        return {
          msg: 'Hello Louis',
          checked: true       //n3 component library
        }
    },
   computed: {
     events () {
      return this.$store.state.events;
     }
   },
   methods: {
     alertChanges(event) {
       console.log('DISPLAY: ', event.display);
       return alert(event.display);
     },
   },
   components: {
     'b-modal': bModal
   },
   directives: {
     'b-modal': bModalDirective
   }
  }
 </script>
 <style scoped>
   #eventStreamHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    font-size: 30px;
    text-align: center;
    line-height: 60px;    /* center text vertically */
    color: #0B9BD7;
    background-color: #2F4B5C;
   }
   /* #eventStreamBody {
     
   } */
 </style>
 