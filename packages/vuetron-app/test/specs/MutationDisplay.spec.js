import test from 'tape';
import { mount } from 'vue-test-utils';
import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import MutationDisplay from '../../src/components/event-stream/displays/MutationDisplay.vue';
import Mutations from '../../src/components/assets/Mutations.vue';
import RevertBtn from '../../src/components/assets/RevertBtn.vue';

const localVue = createLocalVue()
// const localVue = MutationDisplay
// localVue.use(Vuex)
test('MutationDisplay.vue renders', t => { 
  t.plan(3);
  const wrapper = mount(MutationDisplay, {
      localVue,
      propsData: {
          event: {
            display: {
                changes: [1]
            },
            status: 'active'
          },
          evIdx: "evIdx"
      }
  });  
  t.test('MutationDisplay mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('MutationDisplay renders with at least 1 Mutations component', st => {
    st.plan(1);
    const mutations = wrapper.findAll(Mutations);
    st.ok(mutations.length === 1);
  });
  t.test('MutationDisplay renders with at least 1 RevertBtn component', st => {
    st.plan(1);
    const revertBtn = wrapper.findAll(RevertBtn);
    st.ok(revertBtn.length > 0);
  });
//   console.log('PROPS DATA', wrapper.vm.event);
});



// import test from 'tape';
// import { mount } from 'vue-test-utils';
// import { shallow, createLocalVue } from 'vue-test-utils';
// import Vuex from 'vuex';
// import HomeContainer from '../../src/components/home/HomeContainer.vue';

// test('HomeContainer.vue renders', t => {
//   t.plan(3);
//   const wrapper = mount(HomeContainer);
//   t.test('HomeContainer mounts', st => {
//     st.plan(1);
//     st.equal(typeof wrapper, 'object');
//   });
//   t.test('HomeContainer renders with 1 mutations component', st => {
//     st.plan(1);
//     const navbar = wrapper.findAll('.mutations');
//     st.equal(navbar.length, 1);
//   });
//   t.test('HomeContainer renders with 1 revertBtn component', st => {
//     st.plan(1);
//     const numInfo = wrapper.findAll('.revert-btn');
//     st.equal(numInfo.length, 1);
//   });
// });




// import test from 'tape';
// import { mount } from 'vue-test-utils';
// import MutationDisplay from '../../src/components/event-stream/displays/MutationDisplay.vue';

// test('MutationDisplay.vue renders', t => {
//   t.plan(3);
//   const wrapper = mount(MutationDisplay)
//   t.test('MutationDisplay mounts', st => {
//     st.plan(1);
//     st.equal(typeof wrapper, 'object');
//   });
//   t.test('MutationDisplay renders with 1 Mutations component', st => {
//     st.plan(1);
//     const navbar = wrapper.findAll('.mutations');
//     st.equal(navbar.length, 1);
//   });
//   t.test('MutationDisplay renders with 1 RevertBtn component', st => {
//     st.plan(1);
//     const navbar = wrapper.findAll('.revert-btn');
//     st.equal(navbar.length, 1);
//   });
//   console.log(MutationDisplay.props.event);
// });


// import Mutations from '../../assets/Mutations.vue';
// import RevertBtn from '../../assets/RevertBtn.vue';