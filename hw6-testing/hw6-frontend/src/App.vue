<script>
import Navigation from './components/subcomponents/Navigation.vue'
import HomeView from './components/HomeView.vue'
import ProductView from './components/ProductView.vue'
import BasketView from './components/BasketView.vue'
import BasketState from './components/subcomponents/BasketState.vue'
import ProductInput from './components/subcomponents/ProductInput.vue'

import { productsInitMixin } from './mixins/productsInit.js';
import { basketInitMixin } from './mixins/basketInit.js'

export default {
  components: {
    Navigation,
    HomeView,
    ProductInput,
    ProductView,
    BasketView,
    BasketState,
  },
  mixins: [productsInitMixin, basketInitMixin],
  data() {
    return {
      pageView: {
        home: 1,
        basket: 0,
        products: [],
      },
    }
  },
  methods: {
    setPage(field, id) {
      Object.keys(this.pageView).forEach((key) => this.pageView[key] = 0);
      this.pageView[field] = id;  
      console.log(this.pageView)  
    },
  }
}

</script>

<template>
  <header class="header">
    <div class="header__left-wrapper">
      <span class="logo">Internet Shop</span>
      <ProductInput class="checkbox" 
        :categories="categories"
        @addProduct="addProduct($event)"></ProductInput>
    </div>
    <div class="header__right-wrapper">
      <Navigation 
        class="nav"
        @toBasket="setPage('basket', 1)"
        @toHome="setPage('home', 1)"></Navigation>
      <BasketState 
        :catalog="products"
        :basket="basket"
        class="basket-info"></BasketState>
    </div>
  </header>
  <main class="main">
    <HomeView v-if="(products !== null) && pageView.home == 1"
      :catalog="products"
      :categories="categories"
      :basket="basket"
      @addProduct="addToBasket($event, 1)"
      @toProduct="setPage('product', $event)"
      ></HomeView>
    <BasketView v-else-if="(products !== null) && pageView.basket == 1"
      :basket="basket"
      :catalog="products"
      :categories="categories"
      @addProduct="addToBasket($event, 1)"
      @delProduct="addToBasket($event, -1)"
      @clearBasket="clearBasket"
      @changeCount="changeCount($event.id, $event.count)"
      ></BasketView>
    <ProductView v-else-if="(products !== null) && pageView.product != 0"
      :product="products[pageView.product - 1]"
      @toBasket="setPage('basket', 1)"
      @addProduct="addToBasket($event, 1)"
      :basket="basket"
      :catalog="products"
    ></ProductView>
    <p v-else>is loading...</p>
  </main>

</template>

<style scoped>
* {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.header {
  background-color: #213547;
  box-sizing: border-box;
  padding: 10px 40px 10px 20px;
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 20px;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
}

.header__left-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
}

.logo,
.checkbox {
  color: wheat;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.5;
  transform: scaleX(80%) translateX(-12%);
}

@media (max-width: 800px) {
  .header__right-wrapper {
    width: 300px;
  }
}

@media (max-width: 520px) {
  .header {
    flex-direction: column;
    align-items: end;
  }
  .logo {
    align-self: start;
  }
}

.header__right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
}

.main {
  padding: 20px;
  padding-top: 120px;
  max-height: calc(100vh - 200px);
}
</style>
