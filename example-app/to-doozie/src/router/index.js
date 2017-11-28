import Vue from 'vue';
import Router from 'vue-router';
import TodoContainer from '@/components/todo/TodoContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/todo',
      name: 'Todo',
      component: TodoContainer
    }
  ]
});
