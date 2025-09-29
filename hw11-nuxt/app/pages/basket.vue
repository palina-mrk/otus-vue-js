<script setup lang="ts">
import BasketView from '../components/BasketView.vue'
import { createPinia } from 'pinia';
const pinia = usePinia();
const cat = await useCatalogStore(pinia);
const bas = useBasketStore(pinia);
</script>

<template>
  <div>Basket</div>
  <BasketView 
    :catalog="cat.catalog" 
    :basket="bas.basket"
    @addToBasket="bas.addToBasket"
    @delFromBasket="bas.delFromBasket"
    @changeCount="bas.changeCount"
    @clearBasket="bas.clearBasket"
    ></BasketView>
</template>