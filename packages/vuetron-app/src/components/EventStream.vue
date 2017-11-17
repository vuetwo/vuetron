
<template id="eventStreamTemplate">
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
        <icon name="navicon" />
      </b-btn>
      <h1 class="nav-header navbar-brand mb-0">Event Stream</h1>
      <b-dropdown no-caret variant="transparent"
        v-b-popover.hover.auto.left="filterBtnHelpText">
        <template slot="button-content">
          <icon name="filter" class="event-filter-btn"></icon>
        </template>
        <b-dropdown-header>Event Types</b-dropdown-header>
        <b-container>
          <b-form-checkbox-group v-model="selected" 
            :options="checkEventTypes" 
            stacked
            buttons
            button-variant="filter"
            size="sm">
          </b-form-checkbox-group>
        </b-container>
      </b-dropdown>
    </nav>
    <b-row>
      <b-col cols="12">
        <div class="row" v-for="(event, index) in filteredEvents" 
          v-bind:event="event" v-bind:key="index">
          <div class="event-btn text-center" :class="[ event.status === 'inactive' ? 'inactive' : '', event.show ? 'event-btn-open' : '' ]" @click="() => {emitEventToggle(index)}">
            <span>{{ event.title }} - {{ event.timestamp | formatTime }}</span>
            <b-btn v-if="event.title ==='STATE CHANGE' && event.status === 'active'"
              class="deactivate-btn" variant="transparent"
              v-b-popover.hover.right="deactivateBtnHelpText"
              @click="() => {deactivateSingleEvent(index)}">
              <icon name="times" />
            </b-btn>
            <b-btn v-if="event.title === 'STATE CHANGE' && event.status === 'inactive'"
              class="mutate-btn" variant="transparent"
              v-b-popover.hover.right="mutateBtnHelpText"
              @click="() => {mutateState(index)}">
              <icon name="undo" />
            </b-btn>
          </div>
          <div class="event-card-wrapper" v-show="event.show">
            <b-card class="event-card">
              <span class="event-card-title"><strong>{{ event.title }}</strong></span>
              <b-btn v-if="(event.title ==='STATE CHANGE' || event.title ==='STATE INITIALIZED') && event.status === 'active' "
                class="revert-btn" size="sm" variant="secondary"
                v-b-popover.hover.right="revertBtnHelpText"
                @click="() => {revertState(index)}">
                <icon name="undo" />
                <span>Revert</span>
              </b-btn>
              <p v-if="event.title === 'STATE CHANGE'">
                <strong>Mutations:</strong>
              </p>
              <p v-if="event.title === 'EVENT EMITTED'">
                <strong>Event name:</strong>
              </p>
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
        selected: [],
        filterBtnHelpText: 'Filter events',
        revertBtnHelpText: 'Reverts application\'s Vuex state back to selected point.',
        mutateBtnHelpText: 'Re-commits selected mutation on application.',
        deactivateBtnHelpText: 'Updates application to reflect state if selected mutation had not occurred.'
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
      revertState(evIdx) {
        this.$store.commit('revertClientState', evIdx);
      },
      mutateState(evIdx) {
        this.$store.commit('mutateClientState', evIdx);
      },
      deactivateSingleEvent(evIdx) {
        this.$store.commit('deactivateStateEvent', evIdx);
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
  /* .btn.btn-vuetron-checkbox {
    background: #EDDBB4;
    color: #2F4B5C;
  }
  .btn.btn-vuetron-checkbox.selected {
    background: #EDDBB4;
    color: #2F4B5C;
  }
  .btn.btn-vuetron-checkbox:focus {
    box-shadow: none !important;
  } */
  .btn-filter {
    color: #2F4B5C;
    background-color: transparent;
    border-color: #2F4B5C;
    box-shadow: none;
  }
  .btn-filter.focus {
    box-shadow: none;
  }
  .btn-filter:hover {
    opacity: 0.8;
  }
  .btn-filter:not([disabled]):not(.disabled).active {
    color: #EDDBB4;
    background-color: #2F4B5C;
    border-color: #2F4B5C;
    box-shadow: none;
  }
</style>

<style scoped>
  .navbar {
    margin-bottom: 30px;
  }
  .nav-header {
    font-size: 1.5rem;
  }

  .fa-icon:hover {
    opacity: 0.6;
    cursor: pointer;
  }


  .event-filter-btn {
    color: #31B689;
  }

  .deactivate-btn {
    color: #7f7f7f;
  }

  .mutate-btn {
    color: darkgray;
  }

  .revert-btn .fa-icon {
    vertical-align: middle;
  }
  .revert-btn span {
    padding-left: 5px;
  }

  .event-btn {
    margin-left: 3.5%;
    margin-right: 3.5%;
    margin-top: -1px; /* removes overlapping borders */
    margin-bottom: -1px; /* removes overlapping borders */
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #2f4b5c;
    background-color: #EDDBB4;
    border: 1px solid darkgray;
    border-radius: 0px;
    border-left: none;
    border-right: none;
    cursor: pointer;
  }
  .event-btn:focus {
    color: #2f4b5c !important;
    box-shadow: none;
  }
  .event-btn:active {
    color: #2f4b5c !important;
    box-shadow: none !important;
    background-color: transparent !important;
  }

  .event-btn span {
    font-size: 1.2rem;
  }
  .event-btn.event-btn-open {
    font-weight: bold;
  }
  .event-btn.inactive {
    color: darkgray;
    text-decoration: line-through;
  }

  .event-card-title {
    margin-right: 10px;
  }

  .event-card {
    width: 100%;
    border-radius: 0px;
    border-bottom: 1px solid lightgray;
    color: #2f4b5c;
    background-color: #fcf9f2;
  }
  .event-card-wrapper {
    margin-left: 3.5%;
    margin-right: 3.5%;
    width: 100%;
  }
  .padding-0 {
    padding-right: 0;
    padding-left: 0;
  }
</style>

 