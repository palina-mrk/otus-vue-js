<template>
      <span class="basket__point">{{ id }}</span>
      <span class="basket__point basket__point--width-fixed">{{ getTitle(id)}}</span>
      <button class="basket__point basket__point--button"
        @click="obj.addToBasket(id, -1)">-</button>
      <input class="basket__point basket__point--input" 
        type="number"
        :value="count"
        @blur="obj.changeCount(id, $event.target.value)"
        @keyup.enter="obj.changeCount(id, $event.target.value)"></input>
      <button class="basket__point basket__point--button"
        @click="obj.addToBasket(id, 1)">+</button>
      <span class="basket__point basket__point--right">{{ Number(getPrice(id)).toFixed(2)}}</span>
      <span class="basket__point basket__point--right">{{ Number(obj.itemCost(id)).toFixed(2)}}</span>
</template>

<script setup>
import { getPrice, getTitle } from '@/comp-store/catalog';
import * as obj from '@/comp-store/basket';
const props = defineProps(['id','count']);
</script>

<style lang="scss" scoped>
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
  position: relative;
}

.basket__point--right::after {
  content: '$';
  right: -15px;
  position: absolute;
  font-style: italic;
}

.basket__point--input::-webkit-outer-spin-button,
.basket__point--input::-webkit-inner-spin-button {
    -webkit-appearance: none; 
}
</style>