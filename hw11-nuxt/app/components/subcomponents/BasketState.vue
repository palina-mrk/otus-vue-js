<template>
    <span class="basket-state">in basket: {{ itemIdCount }} @ {{ totalCount }} = {{ totalCost?.toFixed(2) }} $</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Product, type Basket } from './types.ts';
const { catalog, basket } = defineProps<{
  catalog: Array<Product>;
  basket: Basket;
}>()

const itemIdCount = computed<number>(() => Object.keys(basket).length)

const totalCount = computed<number>(() => Number(Object.values(basket).reduce((acc, count) => (Number(acc) + Number(count)), 0)))

const getPrice = (id: string) => catalog?.find(el => el?.id == id)?.price;

const totalCost = computed<number | undefined>(() => Object.keys(basket).reduce((acc, id) => (acc = Number(acc) + Number(basket[id]) * Number (getPrice(id))), 0))

</script >

<style lang="scss" scoped>
.basket-state {
  color: wheat;
  opacity: 0.5;
  font-weight: 600;
  font-style: italic;
}
</style>