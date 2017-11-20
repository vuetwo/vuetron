
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
          <div class="event-btn text-center">
            <span :class="[ event.status === 'inactive' ? 'inactive' : null, event.show ? 'event-btn-open collapsed' : null ]" 
              @click="event.show=!event.show"
              :aria-controls="`event-${index}`"
              :aria-expanded="event.show ? 'true' : 'false'">
              {{ event.title }} - {{ event.timestamp | formatTime }}
            </span>
            <deactivate-btn v-if="event.title === 'STATE CHANGE' && event.status === 'active'" :evIdx="index" />
            <mutate-btn v-if="event.title === 'STATE CHANGE' && event.status === 'inactive'" :evIdx="index" />
          </div>
          <b-collapse class="event-card-wrapper" :id="`event-${index}`" v-model="event.show">
            <b-card class="event-card">
              <template v-if="event.title === 'STATE INITIALIZED'">
                <state-display :event="event" :evIdx="index" />
              </template>
              <template v-if="event.title === 'STATE CHANGE'">
                <mutation-display :event="event" :evIdx="index" />
              </template>
              <template v-if="event.title === 'API RESPONSE'">
                <api-display :event="event" />
              </template>
              <template v-if="event.title === 'EVENT EMITTED'">
                <emit-event-display :event="event" />
              </template>
              <div v-if="event.title === 'CONNECTED TO SERVER'">
                <p class="event-card-title"><strong>{{ event.title }}</strong></p>
                <p>{{ event.display }}</p>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
  
<script>
  import EmitEventDisplay from './EmitEventDisplay.vue';
  import MutationDisplay from './MutationDisplay.vue';
  import StateDisplay from './StateDisplay.vue';
  import APIDisplay from './APIDisplay.vue';

  import DeactivateBtn from './assets/DeactivateBtn.vue';
  import MutateBtn from './assets/MutateBtn.vue';
  export default {
    name: "EventStream",
    data() {
      return {
        eventTypes: new Set(),
        selected: [],
        filterBtnHelpText: 'Filter events',
        eventCardClasses: []
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
      },
      activeWatcher() {
        return this.active;
      }
    },
    methods: {
      revertState(evIdx) {
        this.$store.commit('revertClientState', evIdx);
      },
      mutateState(evIdx) {
        this.$store.commit('mutateClientState', evIdx);
      },
      deactivateSingleEvent(evIdx) {
        this.$store.commit('deactivateStateEvent', evIdx);
      },
      emitEventCollapseToggleForReqObj(evIdx) {
        this.$store.commit('toggleEventCollapseForReqObj', evIdx);
      },
      emitEventCollapseToggleForResObj(evIdx) {
        this.$store.commit('toggleEventCollapseForResObj', evIdx);
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
    },
    components: {
      'emit-event-display': EmitEventDisplay,
      'mutation-display': MutationDisplay,
      'state-display': StateDisplay,
      'api-display': APIDisplay,
      'deactivate-btn': DeactivateBtn,
      'mutate-btn': MutateBtn
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
  .event-btn .event-btn-open {
    font-weight: bold;
  }
  .event-btn .inactive {
    color: darkgray;
    text-decoration: line-through;
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

  .showMoreRespBtn {
    margin-left: 3.5%;
    margin-right: 3.5%;
  }

  .padding-0 {
    padding-right: 0;
    padding-left: 0;
  }
</style>
