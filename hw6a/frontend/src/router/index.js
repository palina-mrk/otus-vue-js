import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import BasketView from '../components/BasketView.vue'
import ProductView from '../components/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', 
    name: 'home', 
    component: HomeView,
    meta: { title: 'home page'},},
  { path: '/basket', 
    name: 'basket', 
    component: BasketView },
  { path: '/product/:id', 
    name: 'product', 
    component: ProductView,
    meta: { title: 'product page'}, }],
})

export default router
