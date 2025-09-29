<script setup lang="ts">
import HomeView from '../components/HomeView.vue'

import { createPinia } from 'pinia';
const pinia = usePinia();
const cat = await useCatalogStore(pinia);
const bas = useBasketStore(pinia);
</script>

<template>
  <HomeView 
    :catalog="cat.catalog" 
    :basket="bas.basket"
    @addToBasket="bas.addToBasket"
    ></HomeView>  
</template>