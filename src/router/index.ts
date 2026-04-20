import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AttractionsPage from '../pages/AttractionsPage.vue'
import RoutePlanPage from '../pages/RoutePlanPage.vue'
import AIAssistantPage from '../pages/AIAssistantPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/attractions',
    name: 'attractions',
    component: AttractionsPage,
  },
  {
    path: '/route',
    name: 'route',
    component: RoutePlanPage,
  },
  {
    path: '/ai-assistant',
    name: 'ai-assistant',
    component: AIAssistantPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
