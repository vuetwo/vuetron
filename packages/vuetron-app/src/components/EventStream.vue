<template>
  <div>
      <h1>{{ msg }}</h1>
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="event.id">
        <h1>{{ event }}</h1>
      </div>
  </div>
</template>
 
 <script>
 export default {
   data() {
     return{
       msg: 'Hello Louis'
     }
   },
   computed: {
     events() {
       return this.$store.state.events;
     }
   }
 }
 </script>
 