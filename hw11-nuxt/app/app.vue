<script setup lang="ts">
import Navigation from './components/subcomponents/Navigation.vue'
import ProductInput from './components/subcomponents/ProductInput.vue';
import BasketState from './components/subcomponents/BasketState.vue';

import { createPinia } from 'pinia';
const pinia = usePinia();
const cat = await useCatalogStore(pinia);
const bas = useBasketStore(pinia);
</script>


<template>
  <header class="header">
    <div class="header__left-wrapper">
      <span class="logo">Internet Shop</span>
      <ProductInput 
        class="checkbox" 
        :categories="cat.categories"
        @addProduct="cat.createProduct"
        ></ProductInput>
    </div>
    <div class="header__right-wrapper">
      <Navigation 
        class="nav"></Navigation>
      <BasketState 
        :catalog="cat.catalog"
        :basket="bas.basket"
        class="basket-info"></BasketState>
    </div>
  </header>
  
  <main class="main">
    <NuxtPage />
  </main>
</template>

<style scoped>
* {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.header {
  background-color: #213547;
  box-sizing: border-box;
  padding: 10px;
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
