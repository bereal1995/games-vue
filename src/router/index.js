import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../components/Home'
import List from '../components/GameList/List'
import Game from '../components/Game/Game'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/game/:game_name/:id',
    name: 'Game',
    component: Game
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
