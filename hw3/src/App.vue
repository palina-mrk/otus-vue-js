<script setup>
import { reactive } from 'vue';
import ProductCard from './components/ProductCard.vue';
import ProductsData from './components/ProductsArray.json';

const products = reactive(ProductsData);

</script>

<template>
  <h1 class="products-list__heading">Products list</h1>
  <ul class="products-list">
    <li class="products-list__item" v-for="product in products">
      <ProductCard :product="product"></ProductCard>
    </li>
  </ul>
</template>

<style scoped>
.products-list__heading {
  padding: 0;
  margin: 0 0 40px;
}

.products-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 20px));
  gap: 30px;
}

@media (width < 900px){
  .products-list {
    grid-template-columns: repeat(2, calc(50% - 15px));
  }
}
</style>
