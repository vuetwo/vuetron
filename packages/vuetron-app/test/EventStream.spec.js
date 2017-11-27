import { shallow } from 'vue-test-utils'
import EventStream from './../src/components/event-stream/APIDisplay.vue'
import Vue from 'vue'


// import { shallow } from 'vue-test-utils'
// import List from '@/components/List.vue'

describe('EventStream', () => {
  it('renders li for each item in props.items', () => {
    const items = ['', '']
    const wrapper = shallow(List, {
      propsData: { items }
    })
    expect(wrapper.findAll('li')).toHaveLength(items.length)
  })
})
