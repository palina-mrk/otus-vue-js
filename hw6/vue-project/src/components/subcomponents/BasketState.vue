<template>
    <span class="basket-state">in basket: {{ itemIdCount }} @ {{ totalCount }} = {{ totalCost.toFixed(2) }} $</span>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useBasketStore } from '@/comp-store/basket';

const obj = useBasketStore(); 
const { itemIdCount, totalCount, totalCost } = storeToRefs(obj);
</script>

<style lang="scss" scoped>
.basket-state {
  color: wheat;
  opacity: 0.5;
  font-weight: 600;
  font-style: italic;
}
</style>