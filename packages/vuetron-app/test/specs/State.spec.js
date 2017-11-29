import test from 'tape';
import { mount } from 'vue-test-utils';
import State from '../../src/components/State.vue';

test('State.vue renders', t => {
  t.plan(2);
  const wrapper = mount(State);
  t.test('State mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('State renders with 1 navbar component', st => {
    st.plan(1);
    const navbar = wrapper.findAll('.navbar');
    st.equal(navbar.length, 1);
  });
});
