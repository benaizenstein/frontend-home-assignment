import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PersonList from '../components/PersonList.vue';
import PersonDetails from '../components/PersonDetails.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: PersonList, name: 'PersonList' },
  { path: '/person/:personId', component: PersonDetails, name: 'PersonDetails' },
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
