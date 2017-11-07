<template>
<div>
    <div>
        <button v-on:click="eventstream">EventStream</button>
        <button v-on:click="subscription">Subscription</button> 
        <button v-on:click="state">State</button> 
    </div>   
</div>
</template>

<script>
export default {
    // data() {
    //     return {
    //     }
    // },
  methods: {
      eventstream() {
          alert('eventstream is active');
      },
      subscription() {
          alert('subscription is active');
      },
      state() {
          alert('state is active');
      }
  }
}
</script>
