
<!-- <template id="eventStreamTemplate">
  <div>
    <h1>{{ msg }}</h1>
      <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="index">
          <b-btn class="eventBtn" @click="() => {emitEventToggle(index)}">{{ event.title }}</b-btn>
          <div class ="eventCardWrapper"v-show="event.show">
            <b-card class="eventCard">{{ event.display }}</b-card>
         </div>
      </div>
       </div>
  </div>
</template> -->
<template>

    <!-- <b-row class="row2" cols="8" md="9" lg="10">
        <header id="eventStreamHeader">Event Stream</header>
      </b-row> -->
    
    <b-container class="padding-0">
        <nav class="navbar sticky-top navbar-light bg-faded">
            <h1 id="headerStyle" class="navbar-brand mb-0">Event Stream</h1>
          </nav>
        <div class="row" v-for="(event, index) in events" v-bind:event="event" v-bind:key="index">
            <b-btn class="eventBtn" @click="() => {emitEventToggle(index)}">{{ event.title }}</b-btn>
            <div class="eventCardWrapper"v-show="event.show">
              <b-card class="eventCard">
                <h5>{{ event.title }}</h5>
                {{ event.display }}
              </b-card>
           </div>
        </div>
         </div>
    </b-container>
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
   /* #eventStreamHeader {
    /* position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    font-size: 30px;
    text-align: center;
    line-height: 60px;    /* center text vertically */
    /* color: #0B9BD7;  */
    /* background-color: #2F4B5C; */
   /* } */
  #headerStyle {
    color: #0B9BD7;
  }
  .eventBtn {
    margin-left: 3.5%;
    margin-right: 3.5%;
    margin-top: -1px;     /* removes overlapping borders */ 
    margin-bottom: -1px;  /* removes overlapping borders */
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #2F4B5C;
    background-color: #31B689;
    border: 1px solid #2F4B5C;
    border-radius: 0px;
    border-left: none;
    border-right: none;
  }
  .eventBtn:focus {
    border-bottom: none;
  }
  .eventCard {
    width: 100%;
    border-radius: 0px;
    border-bottom: 1px solid #2F4B5C;
    color: #2F4B5C;
    background-color: #EBEBEB;
  }
  .eventCardWrapper {
    margin-left: 3.5%;
    margin-right: 3.5%;
    width: 100%;
  }
  .padding-0 {
    padding-right:0;
    padding-left:0;
  }
 </style>

 