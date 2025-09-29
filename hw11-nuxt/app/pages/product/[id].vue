<script setup lang="ts">
import ProductView from '../../components/ProductView.vue'
const route = useRoute();

import { createPinia } from 'pinia';
const pinia = usePinia();
const cat = await useCatalogStore(pinia);
const bas = useBasketStore(pinia);
</script>

<template>
  <ProductView 
    :product="cat.catalog.find((p) => p.id == route.params.id)"
    @addToBasket="bas.addToBasket"></ProductView>
</template>