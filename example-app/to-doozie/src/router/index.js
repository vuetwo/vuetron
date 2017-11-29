import Vue from 'vue';
import Router from 'vue-router';
import UserSelection from '@/components/login/UserSelection';
import TodoContainer from '@/components/todo/TodoContainer';
import Profile from '@/components/profile/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSelection',
      component: UserSelection
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoContainer
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
});
