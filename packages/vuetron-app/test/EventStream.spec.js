import Vue from 'vue';
import { mount, createLocalVue } from 'vue-test-utils';
// import EventStream from '@/components/event-stream/EventStreamContainer.vue';
import App from '@/App.vue'
import Nav from '@/components/home/SiteNavInfo.vue';

// import expect from 'expect';

const LocalVue = createLocalVue();
console.log(mount);

describe('EventStream', () => {
  // describe('Initial', () => {
    it('connected to app', () => {
      // const items = ['', ''];
      // const wrapper = mount(Nav, {
      //   // LocalVue,
      //   props: {
      //     redirectPath: '/eventstream',
      //     iconName: 'feed',
      //     infoTitle: 'Event Stream',
      //     infoBlurb: 'Real-time event tracking and time-travel debugging with support for Vuex state changes, Vue $emit events, fetch API requests.'
      //   }
      //   // attachToDocument: true
      // });


      const wrapper = mount(Nav);
      // const Constructor = Vue.extend(EventStream);
      // console.log(Constructor)
      // const EventStreamComponent = new Constructor().$mount();
      // console.log('wrapper', wrapper.findAll('div'));
      // expect(wrapper.findAll('div')).toHaveLength(1);
      // console.log(EventStreamComponent)
      // expect(EventStreamComponent).toExist();
      // const vm = new Constructor().$mount();
      // console.log(vm.children);
      // expect(wrapper.contains('div')).toBe(true);
      // const wrapper = mount(EventStream);
      // console.log(wrapper.html());
      // console.log(EventStream);
      // expect(wrapper.isVueInstance()).toBe(true);
      wrapper.setProps({
        redirectPath: '/eventstream',
        iconName: 'feed',
        infoTitle: 'Event Stream',
        infoBlurb: 'Real-time event tracking and time-travel debugging with support for Vuex state changes, Vue $emit events, fetch API requests.'
      });
      console.log(wrapper.text());
      console.log('icon', wrapper.vm.iconName);
      expect(wrapper.contains('div')).toBe(true);

      // const vm = new Vue({
      //   el: document.createElement('div'),
      //   render: h => h(App)
      // }).$mount()

      // console.log(vm);

      // const vm = new Vue({
      //   el: document.createElement('div'),
      //   template: '<App/>',
      //   // store,
      //   components: { App }
      // });

      // console.log(vm.$el);

    });
  // });
});
