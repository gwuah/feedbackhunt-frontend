import Vue from 'vue'
import Router from 'vue-router'
// import VueSocketio from 'vue-socket.io';
// // import Home from './views/Home.vue'
// // import Read from './views/Read.vue'

// Vue.use(Router);
// Vue.use(VueSocketio, 'http://localhost:8500/testing2');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/read',
      name: 'read',
      component: Read
    }
  ]
})
