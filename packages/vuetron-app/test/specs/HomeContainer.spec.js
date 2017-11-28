import test from 'tape';
import { mount } from 'vue-test-utils';
import HomeContainer from '../../src/components/home/HomeContainer.vue';

test('HomeContainer.vue renders', t => {
  t.plan(3);
  const wrapper = mount(HomeContainer);
  t.test('HomeContainer mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('HomeContainer renders with 1 navbar component', st => {
    st.plan(1);
    const navbar = wrapper.findAll('.navbar');
    st.equal(navbar.length, 1);
  });
  t.test('HomeContainer renders with 4 site nav info components', st => {
    st.plan(1);
    const numInfo = wrapper.findAll('.info');
    st.equal(numInfo.length, 4);
  });
});
