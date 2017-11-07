<template>
  <div>
   <!-- <h1>{{ msg }}</h1> -->
   <h1>{{ clientState }}</h1>
  </div>
</template>
 
 <script>
 export default {
  //  data() {
  //    return {
  //      msg: 'Hello Sam'
  //    }
  //  },
   computed: {
     clientState() {
       return this.$store.state.clientState;
     }
   }
 }
 </script>