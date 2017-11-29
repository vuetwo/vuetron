import test from 'tape';
import { mount } from 'vue-test-utils';
import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import ComponentTree from '../../src/components/ComponentTree.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

test('ComponentTree.vue renders', t => {
  let store = new Vuex.Store({
    state: {}
  })
  t.plan(2);
  const wrapper = mount(ComponentTree, {localVue, store});
  t.test('ComponentTree mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('ComponentTree renders with 1 navbar component', st => {
    st.plan(1);
    const navbar = wrapper.findAll('.navbar');
    st.equal(navbar.length, 1);
  });

});