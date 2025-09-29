<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img class="product-card__image" :src="product?.image" alt="Картинка товара">
    </div>
    <div class="product-card__inner">
      <h2 class="product-card__title">{{ product?.title }}</h2>
      <p class="product-card__description">{{ product?.description }}</p>
      <div class="product-card__price-wrapper">
          <span class="product-card__price">  price: {{product?.price}} $</span>
          <span class="product-card__category"> {{ product?.category }}</span>
      </div>
      <div class="product-card__buttons">
        <button @click="emit('add-to-basket', String(product?.id))" class="product-card__button">add to basket</button>
        <NuxtLink to="/basket" class="product-card__button ">go to basket</NuxtLink>
      </div>
      <div  class="product-card__basket-info">
        <span class="product-card__basket-count">already in basket: </span>
        <span class="product-card__basket-cost">cost: </span>
      </div>
      <div class="product-card__rating-wrapper">
        <svg class="product-card__star" id="'icon' + product.id" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m284.625 29.622 63.9 122.275 136.4 22.491c25.887 4.268 36.152 35.988 17.674 54.614l-96.891 97.663 20.621 135.843c3.924 25.847-22.885 45.403-46.299 33.773l-124.03-61.603-124.03 61.604c-23.414 11.629-50.223-7.927-46.299-33.773l20.621-135.843-96.89-97.664c-18.478-18.626-8.214-50.346 17.674-54.614l136.4-22.491 63.9-122.275c12.081-23.119 45.167-23.119 57.249 0z" /></g></svg>
        <span class="product-card__rate">{{ product?.rating.rate }}</span>
        <span class="product-card__count"> {{ product?.rating.count }} grades</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Product } from './subcomponents/types.ts';
defineProps<{
  product?: Product;
}>()

const emit = defineEmits<{
  (e: 'add-to-basket', id: string): void;
}>()
</script>

<style lang="scss" scoped>
.product-card {
  background-color: rgb(253, 243, 225);
  border-radius: 12px;
  display: flex;
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  align-items: stretch;
  justify-content: space-between;
}

.product-card__inner {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
}

.product-card__image-wrapper {
  background-color: rgb(226, 225, 225);
  border-radius: 12px;
  max-height: calc(100vh - 200px);
  max-width: 70%;
  object-fit: contain;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card__image {
  object-fit: contain;
  overflow: hidden;
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
  font-size: 20px;
}

.product-card__category,
.product-card__basket-count,
.product-card__basket-cost {
  font-weight: 200;
  font-size: 20px;
  color: gray;
}

.product-card__title {
  padding: 0;
  margin: 0 0 10px;
  font-size: 30px;
  line-height: 1.1;
  width: 100%;
  box-sizing: border-box;
}

.product-card__description {
  flex-grow: 1;
  font-size: 24px;
  line-height: 1.1;
  width: 100%;
  margin: 0 0 30px auto;
}

.product-card__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px;
}

.product-card__button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 10px 5px;
  width: calc(30% - 10px);
  min-width: fit-content;
  border: 4px solid gray;
  border-radius: 8px;
  background-color: #fff;
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.849);
}

.product-card__basket-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
