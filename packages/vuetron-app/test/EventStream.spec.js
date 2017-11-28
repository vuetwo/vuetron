import { shallow } from 'vue-test-utils'
import { wrapper } from 'vue-test-utils'
import { mount } from 'vue-test-utils'
import EventStream from './../src/components/event-stream/EventStreamContainer.vue'
import Vue from 'vue'
// require('jsdom-global')()


// import { shallow } from 'vue-test-utils'
// import List from '@/components/List.vue'

describe('EventStreamContainer.vue', function() {
  // const wrapper = mount(EventStream);
  // const vm = wrapper.vm;
  console.log(wrapper);
  it('has html in it', () => {

    const defaultData = EventStream.data()
    expect(defaultData.selected).toBe([])    
    // const vm = new Vue(EventStream).$mount()
    // expect(typeof EventStream.created).toBe('function')
    // expect(wrapper.html()).toContain('<navbar title="Event Stream" />')
    // expect(wrapper.contains('div')).not.toBe(true)    
    // expect(vm.contains('div')).not.toBe(true)        
    // const wrapper = mount(EventStream);
    // const vm = new Vue({
    //   template: '<div><my-input></my-input></div>',
    //   components: { EventStream }
    // }).$mount()
    // console.log('eventstream', EventStream);    
    // // console.log('wrapper', wrapper);
    // console.log('vm', vm);
    // console.log('mount', mount);
    // console.log('wrapper', wrapper);
  })
})



// describe('EventStream', () => {
//   it('renders li for each item in props.items', () => {
//     const items = ['', '']
//     const wrapper = shallow(List, {
//       propsData: { items }
//     })
//     expect(wrapper.findAll('li')).toHaveLength(items.length)
//   })
// })
