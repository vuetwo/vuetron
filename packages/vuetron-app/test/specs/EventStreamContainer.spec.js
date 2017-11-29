import test from 'tape';
import { mount, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import EventStreamContainer from '../../src/components/event-stream/EventStreamContainer.vue';
import Navbar from '../../src/components/navigation/Navbar.vue';
import connectedState from '../sample-states/connected.js';
import postState from '../sample-states/received-input.js';
import mutations from '../../src/store/mutations.js';

const localVue = createLocalVue();

localVue.use(Vuex);

test('EventStreamContainer.vue renders', t => {
  let store = new Vuex.Store({
    state: connectedState,
    mutations
  });
  let wrapper = mount(EventStreamContainer, {store, localVue});
  t.plan(4);
  t.test('EventStream mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('EventStream has NavBar', st => {
    st.plan(1);
    const nav = wrapper.findAll(Navbar);
    st.ok(nav.length === 1);
  });
  t.test('EventStream renders with "Connected to Server"', st => {
    st.plan(1);
    const stream = wrapper.find('.event-btn');
    st.ok(stream.text().includes('CONNECTED TO SERVER'));
    store.replaceState(postState);
  });
  t.test('EventStream renders with 3 events once new events are inputted', st => {
    st.plan(3);
    const buttons = wrapper.findAll('.event-btn');
    const stateChange = buttons.at(0);
    st.ok(stateChange.text().includes('STATE CHANGE'));
    const stateInitialized = buttons.at(1);
    st.ok(stateInitialized.text().includes('STATE INITIALIZED'));
    st.ok(buttons.length === 3);
  });
  t.test('Filter button filters', st => {
    
  });
});
