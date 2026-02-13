<script setup>
import Navigation from './components/subcomponents/Navigation.vue'
import BasketState from './components/subcomponents/BasketState.vue';
import LoginLine from './components/subcomponents/LoginLine.vue';
import { useCatalogStore } from '@/comp-store/catalog.js';

const cat = useCatalogStore();
cat.loadCatalog().then((data) => (cat.catalog = data));
</script>

<template>
  <header class="header">
    <span class="logo">Internet Shop</span>
    <div class="right__wrapper">
      <Navigation class="nav"></Navigation>
      <div class="right__second-line">
        <BasketState class="basket-info"></BasketState>
        <LoginLine></LoginLine>
      </div>
    </div>
  </header>
  <main class="main">
    <router-view v-if="!cat.isLoading"/>
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
  padding: 10px;
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 20px;
  justify-content: space-between;
}

.logo {
  color: wheat;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.5;
  transform: scaleX(80%);
}

.nav {
  width: 100%;
}

@media (max-width: 800px) {
  .right__wrapper {
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

.right__wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
}

.right__second-line {
  align-self: start;
}

.main {
  padding: 20px;
  max-height: calc(100vh - 200px);
}
</style>
