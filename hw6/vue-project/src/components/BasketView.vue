<template>
  <h1 class="basket__item basket__heading">The basket</h1>
  <div v-if="obj.totalCount != 0" class="basket__list">
      <span class="basket__point basket__point--bold">id</span>
      <span class="basket__point basket__point--bold basket__point--width-fixed">title</span>
      <span class="basket__point basket__point--bold basket__point--wide">count</span>
      <span class="basket__point basket__point--bold basket__point--right">price</span>
      <span class="basket__point basket__point--bold basket__point--right">cost </span>
    <template class="basket__row" v-for="[id, count] in Object.entries(obj.basket)">
      <BasketLine v-if="count > 0" :id="id" :count="count"></BasketLine>
      </template>
    <span class="basket__total-word">total cost:</span>
    <span class="basket__total-cost"><b>{{ Number(obj.totalCost).toFixed(2) }}</b></span>
  </div>
  <div v-if="obj.totalCount == 0" class="basket__heading"><i>The basket is empty</i></div>
</template>

<script setup>
import BasketLine from './subcomponents/BasketLine.vue';
import { useBasketStore } from '@/comp-store/basket';
import { onBeforeRouteLeave } from "vue-router";


const obj = useBasketStore();

onBeforeRouteLeave(() => {
  obj.deleteInvalid();
});

</script>

<style lang="scss" scoped>
.basket__list,
.basket__heading {
  background-color: wheat;
  padding: 20px 5px 10px 20px;
  border-radius: 12px;
  color: #213547;
}

.basket__list {
  display: grid;
  grid-template-columns: 3em 30em 30px 50px 30px repeat(2, 90px);
  gap: 5px;
}

.basket__point {
  font-weight: 300;
  font-size: 18px;
}

.basket__point--bold {
  font-size: 20px;
  font-weight: 600;
}

.basket__point--wide {
  grid-column: span 3;
  text-align: center;
}

.basket__point--width-fixed {
  max-width: 30em;
  max-height: 1.3em;
  overflow: hidden;
}


.basket__point--button {
  width: 30px;
  height: 30px;
  font-weight: 900;
  font-size: 30px;
  text-align: center;
  line-height: 0;
  overflow: hidden;
  cursor: pointer;
}

.basket__point--input {
  text-align: center;
}

.basket__point--right {
  text-align: right;
  font-style: italic;
}

.basket__total-word,
.basket__total-cost {
  text-align: right;
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  grid-column: 1 / -1;
  position: relative;
}

.basket__total-word {
  grid-column: 1 / -2;
}
.basket__total-cost {
  grid-column: -2 / -1;
  font-style: italic;
}

.basket__total-cost::after {
  content: '$';
  right: -15px;
  position: absolute;
  font-weight: 900;
}

.basket__point--input::-webkit-outer-spin-button,
.basket__point--input::-webkit-inner-spin-button {
    -webkit-appearance: none; 
}
</style>