
<template id="eventStreamTemplate">
  <div>
    <navbar title="Event Stream" />
    <div class="text-right event-filter-container">
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
    </div>
    <div>
      <b-col cols="12">
        <div class="row" v-for="event in filteredEvents" 
          v-bind:event="event" v-bind:key="event.id">
          <div class="event-btn"
            :class="[event.show ? 'open collapsed' : null]">
            <div class="event-btn-content">
              <span class="event-btn-text"
                @click="event.show=!event.show"
                :class="[ event.status === 'inactive' ? 'inactive' : null, event.show ? 'collapsed' : null]" 
                :aria-controls="`event-${event.id}`"
                :aria-expanded="event.show ? 'true' : 'false'">
                {{ event.title }} - {{ event.timestamp | formatTime }}
              </span>
              <deactivate-btn v-if="event.title === 'STATE CHANGE' && event.status === 'active'" :eid="event.id" />
              <mutate-btn v-if="event.title === 'STATE CHANGE' && event.status === 'inactive'" :eid="event.id" />
            </div>
          </div>
          <b-collapse class="event-card-wrapper" :id="`event-${event.id}`" v-model="event.show">
            <b-card class="event-card">
              <template v-if="event.title === 'STATE INITIALIZED'">
                <state-display :event="event" :eid="event.id" />
              </template>
              <template v-else-if="event.title === 'STATE CHANGE'">
                <mutation-display :event="event" :eid="event.id" />
              </template>
              <template v-else-if="event.title === 'API REQUEST / RESPONSE'">
                <api-display :event="event" />
              </template>
              <template v-else-if="event.title === 'EVENT EMITTED'">
                <emit-event-display :event="event" />
              </template>
              <div v-else>
                <p class="event-card-title"><strong>{{ event.title }}</strong></p>
                <p>{{ event.display }}</p>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </b-col>
    </div>
  </div>
</template>
  
<script>
  import Navbar from '../navigation/Navbar.vue';

  import EmitEventDisplay from './displays/EmitEventDisplay.vue';
  import MutationDisplay from './displays/MutationDisplay.vue';
  import StateDisplay from './displays/StateDisplay.vue';
  import APIDisplay from './displays/APIDisplay.vue';

  import DeactivateBtn from '../assets/DeactivateBtn.vue';
  import MutateBtn from '../assets/MutateBtn.vue';
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
      revertState(eid) {
        this.$store.commit('revertClientState', eid);
      },
      mutateState(eid) {
        this.$store.commit('mutateClientState', eid);
      },
      deactivateSingleEvent(eid) {
        this.$store.commit('deactivateStateEvent', eid);
      },
      emitEventCollapseToggleForReqObj(eid) {
        this.$store.commit('toggleEventCollapseForReqObj', eid);
      },
      emitEventCollapseToggleForResObj(eid) {
        this.$store.commit('toggleEventCollapseForResObj', eid);
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
      'navbar': Navbar,
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
    color: #001453;
    background-color: transparent;
    border-color: #001453;
    box-shadow: none;
  }
  .btn-filter.focus {
    box-shadow: none;
  }
  .btn-filter:hover {
    opacity: 0.8;
  }
  .btn-filter:not([disabled]):not(.disabled).active {
    color: #001453;
    background-color: rgba(5, 248, 180, 0.61);;
    border-color: #001453;
    box-shadow: none;
  }
</style>

<style scoped>
  .fa-icon:hover {
    opacity: 0.6;
    cursor: pointer;
  }

  .event-filter-container {
    margin-bottom: 10px;
  }

  .event-filter-btn {
    color: #001453;
    width: auto;
    height: 1.5em;
    max-width: 100%;
    max-height: 100%;
  }

  .event-btn {
    margin-top: -1px; /* removes overlapping borders */
    margin-bottom: -1px; /* removes overlapping borders */
    width: 100%;
    padding: 15px;
    /* padding-top: 15px; */
    /* padding-bottom: 15px; */
    color: #001453;
    background-color: white;
    border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    border-radius: 0px;
    border-left: none;
    border-right: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .event-btn:focus {
    color: #001453 !important;
    box-shadow: none;
  }
  .event-btn:active {
    color: #001453 !important;
    box-shadow: none !important;
    background-color: transparent !important;
  }

  .event-btn.open {
    color: #001453;
    background-color: rgba(5, 248, 180, 0.31);
    border: none;
  }

  .event-btn .event-btn-text {
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }
  .event-btn .inactive {
    color: darkgray;
    text-decoration: line-through;
  }

  .event-card {
    width: 100%;
    border-radius: 0px;
    border: none;
    color: #001453;
    background-color: #D8D8D8;
  }
  .event-card-wrapper {
    width: 100%;
  }

  .padding-0 {
    padding-right: 0;
    padding-left: 0;
  }
</style>
