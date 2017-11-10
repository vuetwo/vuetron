
<template id="eventStreamTemplate">
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
        <icon name="navicon" />
      </b-btn>
      <h1 class="nav-header navbar-brand mb-0">Event Stream</h1>
      <b-dropdown no-caret variant="transparent"
        v-b-popover.hover.auto.left="'Filter events'">
        <template slot="button-content">
          <icon name="filter"></icon>
        </template>
        <b-dropdown-header>Event Types</b-dropdown-header>
        <b-container>
          <b-form-checkbox-group v-model="selected" 
            :options="checkEventTypes" stacked>
          </b-form-checkbox-group>
        </b-container>
      </b-dropdown>
    </nav>
    <b-row>
      <b-col cols="12">
        <div class="row" v-for="(event, index) in filteredEvents" 
          v-bind:event="event" v-bind:key="index">
          <b-btn class="eventBtn" @click="() => {emitEventToggle(index)}">{{ event.title }} - {{ event.timestamp | formatTime }}</b-btn>
          <div class="eventCardWrapper" v-show="event.show">
            <b-card class="eventCard">
              <h5>{{ event.title }}</h5>
              <div v-if="event.title ==='STATE CHANGE' || event.title ==='STATE INITIALIZED' ">
                <b-btn class="reverseBtn" @click="() => {recoverState(event)}">Recover State</b-btn>
              </div>
              <div>{{ event.display }}</div>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        eventTypes: new Set(),
        selected: []
      };
    },
    computed: {
      filteredEvents() {
        return this.$store.state.events.filter(ev => this.selected.indexOf(ev.title.split(' ').join('_')) !== -1);
      },
      checkEventTypes() {
        this.$store.state.events.forEach(ev => {
          let name = ev.title.split(' ').join('_')
          if(!this.eventTypes.has(name)) this.selected.push(name);
          this.eventTypes.add(name);
        });
        return Array.from(this.eventTypes);
      }
    },
    methods: {
      emitEventToggle(evIdx) {
        this.$store.commit('toggleEventShow', evIdx);
      },
      recoverState(event) {
        let recoverState = event.title === 'STATE CHANGE' ? event.state : JSON.stringify(event.display);
        this.$store.commit('revertClientState', recoverState);
      }
    },
    filters: {
      formatTime: function (ISODate) {
        let date = new Date(ISODate);
        let time = '';
        time += date.getHours();
        time += ':' + ('0' + date.getMinutes()).slice(-2);
        time += ':' + ('0' + date.getSeconds()).slice(-2);
        return time;
      }
    }
  };
</script>

<style>
  .btn-transparent {
    background-color: transparent;
  }
  .btn-transparent:focus {
    box-shadow: none;
  }
</style>

<style scoped>
  .fa-icon {
    color: #31B689;
  }
  .fa-icon:hover {
    opacity: 0.6;
    cursor: pointer;
  }

  .reverseBtn {
    width: 100%;
  }

  .eventBtn {
    margin-left: 3.5%;
    margin-right: 3.5%;
    margin-top: -1px; /* removes overlapping borders */
    margin-bottom: -1px; /* removes overlapping borders */
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #2f4b5c;
    background-color: #EDDBB4;
    border: 1px solid #2f4b5c;
    border-radius: 0px;
    border-left: none;
    border-right: none;
  }
  .eventBtn:focus {
    color: #2f4b5c !important;
    box-shadow: none;
  }
  .eventBtn:active {
    color: #2f4b5c !important;
    box-shadow: none !important;
    background-color: transparent !important;
  }

  .eventCard {
    width: 100%;
    border-radius: 0px;
    border-bottom: 1px solid #2f4b5c;
    color: #2f4b5c;
    background-color: #fcf9f2;
  }
  .eventCardWrapper {
    margin-left: 3.5%;
    margin-right: 3.5%;
    width: 100%;
  }
  .padding-0 {
    padding-right: 0;
    padding-left: 0;
  }
</style>

 