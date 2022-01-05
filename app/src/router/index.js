import { createRouter, createWebHistory } from 'vue-router'

import Teams from '../views/Teams'
import About from '../views/About'
import Home from '../views/Home'
import Register from '../views/Register'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/teams', name: 'Teams', component: Teams },
  { path: '/about', name: 'About', component: About },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
