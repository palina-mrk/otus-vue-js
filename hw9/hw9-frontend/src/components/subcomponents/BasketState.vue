<template>
    <span class="basket-state">in basket: {{ itemIdCount }} @ {{ totalCount }} = {{ totalCost?.toFixed(2) }} $</span>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { type Product } from './BasketLine.types.ts';
const { catalog, basket } = defineProps<{
  catalog: Array<Product>;
  basket: any;
}>()

const itemIdCount: ComputedRef = computed(() => Object.keys(basket).length)

const totalCount: ComputedRef = computed(() => Object.values(basket).reduce((acc, count) => (Number(acc) + Number(count)), 0))

const getPrice = (id: string) => catalog?.find(el => el?.id == id)?.price;

const totalCost: ComputedRef<number | undefined> = computed(() => Object.keys(basket).reduce((acc, id) => (acc = Number(acc) + Number(basket[id]) * Number (getPrice(id))), 0))

</script >

<style lang="scss" scoped>
.basket-state {
  color: wheat;
  opacity: 0.5;
  font-weight: 600;
  font-style: italic;
}
</style>