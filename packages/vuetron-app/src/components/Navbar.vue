<template>
<div>
    <div>
        <div>
            <router-link to="/eventstream"><button class="btn btn-primary btn-block">EventStream</button></router-link>
            <router-link to="/subscription"><button class="btn btn-primary btn-block">Subscription</button></router-link>
            <router-link to="/state"><button class="btn btn-primary btn-block">State</button></router-link>
        </div>


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

<style>

</style>


