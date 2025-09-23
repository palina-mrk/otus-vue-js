<template>
    <span class="basket-state">in basket: {{ itemIdCount }} @ {{ totalCount }} = {{ totalCost.toFixed(2) }} $</span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const {catalog, basket} = defineProps(['catalog', 'basket'])

const itemIdCount = computed(() => Object.keys(basket).length)

const totalCount = computed(() => Object.values(basket).reduce((acc, count) => (Number(acc) + Number(count)), 0))

const getPrice = (id) => catalog.find(el => el.id == id).price;

const totalCost = computed(() => Object.keys(basket).reduce((acc, id) => (acc = Number(acc) + Number(basket[id]) * Number (getPrice(id))), 0))

</script>

<style lang="scss" scoped>
.basket-state {
  color: wheat;
  opacity: 0.5;
  font-weight: 600;
  font-style: italic;
}
</style>