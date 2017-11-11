<template>
  <div>
      <nav class="navbar sticky-top navbar-light bg-faded">
          <h1 id="headerStyle" class="navbar-brand mb-0">State</h1>
        </nav>
      <b-button>HI I'M A BUTTON IN STATE!</b-button>
      <div class="row" v-for="pic in instaPics" v-bind:pic="pic">
          <li>{{ pic }}</li>
          <!-- <li> {{ pic }}</li> -->
          <img src="https://static01.nyt.com/images/2016/06/28/dining/28COOKING-FRIEDCHICKENGUIDE13/28COOKING-FRIEDCHICKENGUIDE13-superJumbo.jpg" height="42" width="42"></img>
          
          <!-- <div class="eventCardWrapper"v-show="event.show"> -->
            <!-- <b-card class="eventCard"> -->
              <!-- <h5>{{ event.title }}</h5> -->
              <!-- {{ event.display }} -->
            <!-- </b-card> -->
         </div>
      </div>
  </div>
  <!-- <div v-if="show && clientState">
    <VueObjectView :value="clientState" /> 
  </div> -->
</template>
 
 <script>

import VueObjectView from "vue-object-view";

 
// Call fetch to see your interceptors in action. 
// fetch('https://codesmith-precourse.firebaseio.com/instagram/-JqL35o8u6t3dTQaFXSV.json', {
//   method: 'get'
// }).then(function(response){
//   for (let m = 0; m < response.length; m++) {
//     console.log(response[m]);
//   }
// }).catch(function(err){
//   console.log(err);
// });



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
    instaPics() {
      console.log("CHECK ARR", this.$store.state.instaPics);
      return this.$store.state.instaPics;
     },
     events () {
      return this.$store.state.events;
     }
  },
  components: {
    VueObjectView,
  },
};
</script>
<style scoped>
   #headerStyle {
    color: #0B9BD7;
  }
</style>
