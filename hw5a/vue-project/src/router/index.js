import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import BasketView from '@/components/BasketView.vue'
import AdminView from '@/components/AdminView.vue'
import OrderView from '@/components/OrderView.vue'
import ProductView from '@/components/ProductView.vue'
import LoginView from '@/components/LoginView.vue'
import * as basket from '@/comp-store/basket'
import * as catalog from '@/comp-store/catalog'

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
  { path: '/admin', 
    name: 'admin', 
    component: AdminView,
    meta: { title: 'page to create new product'}, },
  { path: '/order', 
    name: 'order', 
    component: OrderView,
    beforeEnter: () => {
      if(basket.itemIdCount.value > 0)
        return true;
      alert('Please, add at least one product to the basket!')
      return false;
    },
    meta: { title: 'page to input address and card'}, }, // процесс заказа товара
  { path: '/login', 
    name: 'login', 
    component: LoginView,
    meta: { title: 'page to login'}, },
  { path: '/product/:id', 
    name: 'product', 
    component: ProductView,
    meta: { title: 'product page'}, }],
})

export default router
