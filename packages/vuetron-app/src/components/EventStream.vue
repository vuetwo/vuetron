
<template>
  <div>
    <header id="eventStreamHeader">Event Stream</header>      
    <h1>{{ msg }}</h1>
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="event.id">
        <h1 v-on:click="alertChanges(event)">{{ event.title }}</h1>
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
     alertChanges(event) {
       console.log('DISPLAY: ', event.display);
       return alert(event.display);
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
   /* #eventStreamBody {
     
   } */
 </style>
 