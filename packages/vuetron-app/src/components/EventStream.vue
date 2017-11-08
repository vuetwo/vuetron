
<template id="eventStreamTemplate">
  <div>
    <h1>{{ msg }}</h1>
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="index">
        <h1 @click="() => {emitEventToggle(index)}">{{ event.title }}</h1>
        <div v-show="event.show">
          <p>{{ event.display }}</p>
        </div>
      </div>
  </div>
</template>
 
 <script>
 export default {
   data() {
        return {
          msg: 'Hello Louis'
        }
    },
   computed: {
     events () {
      return this.$store.state.events;
     }
   },
   methods: {
     emitEventToggle(evIdx) {
      this.$store.commit("toggleEventShow", evIdx);
    }
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
   #eventStreamTemplate {
    float: right;
    height: 100%;
    width: 80%;
    background-color: #31B689;
    overflow: scroll;
  }

   /* #display {
    float: right;
    height: 100%;
    width: 80%;
    background-color: #31B689;
    overflow: scroll;
  } */

   /* #eventStreamBody {
     
   } */
 </style>

 