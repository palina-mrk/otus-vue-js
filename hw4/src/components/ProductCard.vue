<template>
  <div class="product-card">
    <img class="product-card__image" :src="product.image" alt="Картинка товара">
    <div class="product-card__price-wrapper">
      <span class="product-card__price">{{ product.price }} $</span>
      <span class="product-card__category">{{ product.category }}</span>
    </div>
    <h2 class="product-card__title">{{ product.title }}</h2>
    <p class="product-card__description">{{ product.description }}</p>
    <button @click="$emit('order-product', product.id)" class="product-card__to-order">order the product</button>
    <div class="product-card__rating-wrapper">
      <svg class="product-card__star" id="'icon' + product.id" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m284.625 29.622 63.9 122.275 136.4 22.491c25.887 4.268 36.152 35.988 17.674 54.614l-96.891 97.663 20.621 135.843c3.924 25.847-22.885 45.403-46.299 33.773l-124.03-61.603-124.03 61.604c-23.414 11.629-50.223-7.927-46.299-33.773l20.621-135.843-96.89-97.664c-18.478-18.626-8.214-50.346 17.674-54.614l136.4-22.491 63.9-122.275c12.081-23.119 45.167-23.119 57.249 0z" /></g></svg>
      <span class="product-card__rate">{{ product.rating.rate }}</span>
      <span class="product-card__count"> {{ product.rating.count }} grades</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(["product"]);
</script>

<style lang="scss" scoped>
.product-card {
  background-color: wheat;
  border-radius: 12px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
}

.product-card__image {
  background-color: gray;
  border-radius: 12px;
  width: 100%;
  height: 300px;
  padding: 10px;
  object-fit: contain;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.product-card__price-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: baseline;
  width: 100%;
}

.product-card__price {
  font-weight: 600;
}

.product-card__category {
  font-weight: 200;
  font-size: 12px;
  color: gray;
}

.product-card__title {
  padding: 0;
  margin: 0 0 5px;
  font-size: 20px;
  line-height: 1.2;
  width: 100%;
}

.product-card__description {
  flex-grow: 1;
  font-size: 16px;
  line-height: 1.2;
  width: 100%;
  margin: 0 0 5px;
}

.product-card__to-order {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 2px;
  width: 105%;
  border: 2px solid gray;
  margin: 0 0 10px;
}

.product-card__rating-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.product-card__star {
  width: 20px;
  fill: #b87612;
  position: relative;
  bottom: 2px;
}

.product-card__rate {
  flex-grow: 1;
  text-align: left;
  color: #b87612;
}

.product-card__count {
  color: gray;
  font-weight: 300;
}

</style>