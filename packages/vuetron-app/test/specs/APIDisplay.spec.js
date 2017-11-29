import test from 'tape';
import { mount } from 'vue-test-utils';
import { shallow, createLocalVue } from 'vue-test-utils';
import APIDisplay from '../../src/components/event-stream/displays/APIDisplay.vue';

const localVue = createLocalVue()

test('APIDisplay.vue renders', t => { 
  t.plan(4);
  const wrapper = mount(APIDisplay, {
      localVue,
      propsData: {
          event: {
            title: 'API REQUEST / RESPONSE',
            display: {
                requestObj: [{method: 'get'}],
                responseObj: [{type: "cors", url: "https://www.url.com/", redirected: false ,status: 200 ,ok: true, statusText: "OK", headers: {}, body: {}, bodyUsed: false}]
            },
          }
			},
      computed: {
        // passes the event's request and response objects to 'Request' and 'Response' vue-object-views
        processRequest() {
          this.processedRequest = Object.assign({}, this.event.display.requestObj);
          return this.processedRequest;
        },
        processResponse() {
          this.processedResponse = Object.assign({}, this.event.display.responseObj);
          return this.processedResponse;
        }
      }
  });  
  t.test('API mounts', st => {
    st.plan(1);
    st.equal(typeof wrapper, 'object');
  });
  t.test('APIDisplay renders API REQUEST / RESPONSE as title', st => {
    st.plan(1);
    const requestDisplay = wrapper.findAll('strong');
    let title = requestDisplay.wrappers[0].vnode.children[0].text
    st.equal(requestDisplay.wrappers[0].vnode.children[0].text, 'API REQUEST / RESPONSE');
  });
  t.test('Request view displays the same value as the Event Request Object', st => {
      st.plan(1);
			const vueObjectViews = wrapper.findAll('vue-object-view');
			// set values to the value property of the Response vue-object-view
			let requestVueObjViewValues = vueObjectViews.wrappers[0].vnode.data.attrs.value;
			// locate and assign the requestViewValue 
      let requestViewValue = '';
      for(let prop in requestVueObjViewValues) {
					requestViewValue = requestVueObjViewValues[prop];
			}
			// locate and assign the requestObj from the example propsData above
      let eventRequestObject = wrapper.vm.$options.propsData.event.display.requestObj[0]
      st.equal(eventRequestObject,requestViewValue);         
  })
  t.test('Response view displays the same value as the Event Response Object', st => {
    	st.plan(1);
			const vueObjectViews = wrapper.findAll('vue-object-view');
			// set values to the value property of the Response vue-object-view
			let responseVueObjViewValues = vueObjectViews.wrappers[1].vnode.data.attrs.value;
			// locate and assign the responseViewValue
    	let responseViewValue = '';
    	for(let prop in responseVueObjViewValues) {
    	    responseViewValue = responseVueObjViewValues[prop];
			}
			// locate and assign the responseObj from the example propsData above
			let eventResponseObject = wrapper.vm.$options.propsData.event.display.responseObj[0]
    	st.equal(eventResponseObject,responseViewValue);         
	})
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



// import test from 'tape';
// import { mount } from 'vue-test-utils';
// import { shallow, createLocalVue } from 'vue-test-utils';
// import APIDisplay from '../../src/components/event-stream/displays/APIDisplay.vue';

// const localVue = createLocalVue()

// test('APIDisplay.vue renders', t => { 
//   t.plan(3);
//   const wrapper = mount(APIDisplay, {
//       localVue,
//       propsData: {
//           event: {
//             title: 'API REQUEST / RESPONSE',
//             display: {
//                 requestObj: [{method: 'get'}],
//             },
//           }
//       },
//       computed: {
//         processRequest() {
//           this.processedRequest = Object.assign({}, this.event.display.requestObj);
//           console.log('PROCESSED REQ:', this.event.display.requestObj[0].method);
//           return this.processedRequest;
//         },
//         processResponse() {
//           this.processedResponse = Object.assign({}, this.event.display.responseObj);
//           return this.processedResponse;
//         }
//       }
//   });  
//   t.test('API mounts', st => {
//     st.plan(1);
//     st.equal(typeof wrapper, 'object');
//   });
//   t.test('APIDisplay renders API REQUEST / RESPONSE as title', st => {
//     st.plan(1);
//     const requestDisplay = wrapper.findAll('strong');
//     // console.log('STRONG', requestDisplay.wrappers[0].vnode.children[0].text);
//     let title = requestDisplay.wrappers[0].vnode.children[0].text
//     st.equal(requestDisplay.wrappers[0].vnode.children[0].text, 'API REQUEST / RESPONSE');
//   });
//   t.test('Request view displays the same value as Props Display Request Object', st => {
//       st.plan(1);
//       const vueObjectViews = wrapper.findAll('vue-object-view');
//     //   console.log('VUE_OBJECT_VIEWS', vueObjectViews.wrappers[0].vnode.data.attrs.value);
//     //   console.log('WRAPPER', wrapper.vm.$options.propsData.event.display.requestObj[0]);
//     //   console.log('VALUE', vueObjectViews.wrappers[0].vnode.data.attrs.value);
//       let values = vueObjectViews.wrappers[0].vnode.data.attrs.value;
//       let requestViewValue = '';
//       for(let prop in values) {
//         //   console.log(values, values[prop]);
//           requestViewValue = values[prop];
//       }
//       console.log('final value', requestViewValue);
//       let propsRequestObject = wrapper.vm.$options.propsData.event.display.requestObj[0]
//     //   let value = Object.keys(vueObjectViews.wrappers[0].vnode.data.attrs.value);
//     //   console.log('total VALUE', value);
//     //   console.log('final VALUE', value[0].method);
//     //   st.equal(vueObjectViews.wrappers[0].vnode.data.attrs.value, wrapper.propsData.event.display.requestObj);
//     //   st.equal(vueObjectViews.wrappers[0].vnode.data.attrs.value, wrapper.vm.$options.propsData.event.display.requestObj[0].method); 
//     // st.equal(wrapper.vm.$options.propsData.event.display.requestObj[0],requestViewValue);     
//     st.equal(propsRequestObject,requestViewValue);         
//     //   st.ok(vueObjectViews.length > 0);
//   })
// //   t.test('APIDisplay renders "GET" or "POST" as title', st => {
// //     st.plan(1);
// //     const revertBtn = wrapper.findAll(RevertBtn);
// //     st.ok(revertBtn.length > 0);
// //   });
// //   console.log('PROPS DATA', wrapper.vm.event);
// });


// let value = Object.keys(values);
// let subValue = Object.keys(value[0]);
// console.log('VALUE', value, value[0], subValue);

// console.log('responseobj', eventResponseObject, 'responseview', responseViewValue)
