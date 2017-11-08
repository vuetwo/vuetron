<template id="template">
<div id="navContainer">
    <div>
        <router-link to="/subscription">Subscription</router-link>
        <router-link to="/state">State</router-link>
        <router-link to="/eventstream">Event Stream</router-link>
        <div>
            <!-- <router-view></router-view> -->
        </div>
        
        <!-- <router-view></router-view> -->
        <!-- <button class="navButton" v-on:click="eventstream">EventStream</button>
        <button class="navButton" v-on:click="subscription">Subscription</button> 
        <button class="navButton" v-on:click="state">State</button>  -->
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
<style scoped>
    /* #template {
        height: 100%;
    }
    #navContainer {
        height: 100%;
    } */
    
</style>        