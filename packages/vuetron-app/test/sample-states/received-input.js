export default {
  'clientState': {
    'users': [
      {
        'name': 'kamal',
        'age': 27,
        'post': true
      },
      {
        'name': 'mostafa',
        'age': 23,
        'post': true
      },
      {
        'name': 'nishi',
        'age': 20,
        'post': true
      },
      {
        'name': 'kawsar',
        'age': 33,
        'post': false
      },
      {
        'name': 'jamal',
        'age': 34,
        'post': true
      }
    ],
    'num': 0
  },
  'events': [
    {
      'title': 'STATE CHANGE',
      'display': {
        'changes': [
          {
            'kind': 'E',
            'path': [
              'users',
              0,
              'age'
            ],
            'lhs': 25,
            'rhs': 27
          },
          {
            'kind': 'E',
            'path': [
              'users',
              1,
              'age'
            ],
            'lhs': 21,
            'rhs': 23
          },
          {
            'kind': 'E',
            'path': [
              'users',
              2,
              'age'
            ],
            'lhs': 18,
            'rhs': 20
          },
          {
            'kind': 'E',
            'path': [
              'users',
              3,
              'age'
            ],
            'lhs': 31,
            'rhs': 33
          },
          {
            'kind': 'E',
            'path': [
              'users',
              4,
              'age'
            ],
            'lhs': 32,
            'rhs': 34
          }
        ]
      },
      'hidden': {

      },
      'status': 'active',
      'timestamp': '2017-11-29T00:12:14.825Z',
      'mutation': {
        'type': 'adultIncrease',
        'payload': {
          'isTrusted': true
        }
      },
      'state': '{"users":[{"name":"kamal","age":27,"post":true},{"name":"mostafa","age":23,"post":true},{"name":"nishi","age":20,"post":true},{"name":"kawsar","age":33,"post":false},{"name":"jamal","age":34,"post":true}],"num":0}',
      'show': false
    },
    {
      'title': 'STATE INITIALIZED',
      'display': {
        'users': [
          {
            'name': 'kamal',
            'age': 25,
            'post': true
          },
          {
            'name': 'mostafa',
            'age': 21,
            'post': true
          },
          {
            'name': 'nishi',
            'age': 18,
            'post': true
          },
          {
            'name': 'kawsar',
            'age': 31,
            'post': false
          },
          {
            'name': 'jamal',
            'age': 32,
            'post': true
          }
        ],
        'num': 0
      },
      'hidden': {

      },
      'status': 'active',
      'timestamp': '2017-11-29T00:12:02.557Z',
      'show': false
    },
    {
      'title': 'CONNECTED TO SERVER',
      'display': 'Successfully connected Vuetron to server.',
      'hidden': {

      },
      'status': 'active',
      'timestamp': '2017-11-29T00:03:48.939Z',
      'show': false
    }
  ],
  'subscriptions': {

  },
  'domTree': {
    'name': 'vue-component-4-app',
    'id': '70d1b2f9-68a1-959b-6668-13a6298f7cf9',
    'children': [
      {
        'name': 'HiVvb',
        'id': '73fd6dcd-a21e-271f-8fae-482cf54b0def',
        'children': [

        ]
      },
      {
        'name': 'TheDirective',
        'id': '92723357-c619-9451-9e2b-08eb5662e5f2',
        'children': [

        ]
      },
      {
        'name': 'VText',
        'id': 'a9003643-0dd6-14e9-be7a-5e8344ce3a67',
        'children': [

        ]
      },
      {
        'name': 'VHtml',
        'id': 'd111b7dc-4127-2fc5-99f2-044083ab38e1',
        'children': [

        ]
      },
      {
        'name': 'VShow',
        'id': '134b5bc9-dda1-43bb-a403-2a53314c72de',
        'children': [

        ]
      },
      {
        'name': 'VConditions',
        'id': '0e73b4f1-b76d-3653-64c7-d78923017569',
        'children': [

        ]
      },
      {
        'name': 'VModel',
        'id': 'c4a29c0d-94de-62b6-4dae-ab46b29c20d7',
        'children': [

        ]
      },
      {
        'name': 'VBind',
        'id': '723b92c5-841c-418c-ece7-f86bdacfa836',
        'children': [

        ]
      },
      {
        'name': 'VOn',
        'id': 'd045e47a-2134-cc02-9ab5-ac968e2b2a2b',
        'children': [

        ]
      },
      {
        'name': 'VFor',
        'id': '03109338-2c7b-a2e0-f932-a5c8b576e948',
        'children': [

        ]
      },
      {
        'name': 'VMixin',
        'id': '27cf2ebc-330f-8460-6e30-a5dde3e957b8',
        'children': [

        ]
      },
      {
        'name': 'VComponent',
        'id': 'd06e4af8-d0a6-0380-797c-e0180e52ccbd',
        'children': [
          {
            'name': 'child-component',
            'id': '4af7c5d3-7ed3-e581-2c7d-be7e5ce211eb',
            'children': [

            ]
          }
        ]
      },
      {
        'name': 'VProp',
        'id': '682ff38d-d20a-bb22-1a12-4756d17a0389',
        'children': [
          {
            'name': 'prop-component',
            'id': '9f74bdfc-17f6-a0e5-29ac-c769ccf0b501',
            'children': [

            ]
          }
        ]
      },
      {
        'name': 'VEmit',
        'id': 'c564afb4-88ed-df99-f086-4e1c92f22e98',
        'children': [
          {
            'name': 'prop-component',
            'id': 'c163fa4d-8668-2dd9-100e-181ff98d3f28',
            'children': [

            ]
          }
        ]
      },
      {
        'name': 'VFilter',
        'id': '4506541f-0438-24d7-03b1-438b08500829',
        'children': [

        ]
      },
      {
        'name': 'VxState',
        'id': '064abe21-0446-56b0-71e0-75c36482e251',
        'children': [
          {
            'name': 'VuexGetters',
            'id': '6db1ee6d-4963-e623-a9ea-d0c9eb4d1a5d',
            'children': [
              {
                'name': 'VuexMutations',
                'id': 'dc51c2f8-cfe2-1553-bab9-9120faac362c',
                'children': [

                 ]
              }
            ]
          }
        ]
      },
      {
        'name': 'VxGetter',
        'id': '5e4eb942-b59c-bcf9-c1e0-3bda3ec26be5',
        'children': [
          {
            'name': 'VuexMutations',
            'id': 'abcc043f-39ec-ecf4-a21b-20f2a30b18fe',
            'children': [

            ]
          }
        ]
      },
      {
        'name': 'VxMutation',
        'id': '9d1b5c6e-ede0-2b67-6da2-187399af50b5',
        'children': [

        ]
      },
      {
        'name': 'VxJquery',
        'id': '1a77600c-f80c-e6c6-40f8-c0285dcf2ea3',
        'children': [

        ]
      },
      {
        'name': 'VSelectMultiFor',
        'id': '953316a5-0063-177b-db5f-41c0564b6f41',
        'children': [

        ]
      }
    ]
  },
  'displaySidebar': false
};
