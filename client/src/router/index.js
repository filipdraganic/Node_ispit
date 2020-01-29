import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import oglasi from "../components/oglasi";
import noviOglas from "../components/noviOglas";
import App from '../App'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/oglasi/:id',
    name: 'oglasi',
    component: oglasi
  },
  {
    path: '/noviOglas/',
    name:"noviOglas",
    component: noviOglas
  },






]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
