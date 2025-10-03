<template>
  <div class="basket__item">
    <h1 class="basket__heading">The basket</h1>
    <button class="basket__point basket__point--button"
      @click="$emit('clear-basket')">clear basket</button>     
  </div>
  <div v-if="itemIdCount != 0" class="basket__list">
      <span class="basket__point basket__point--bold">id</span>
      <span class="basket__point basket__point--bold basket__point--width-fixed">title</span>
      <span class="basket__point basket__point--bold basket__point--wide">count</span>
      <span class="basket__point basket__point--bold basket__point--right">price</span>
      <span class="basket__point basket__point--bold basket__point--right">cost </span>
    <template class="basket__row" v-for="[id, count] in Object.entries(basket)">
      <BasketLine 
      v-if="count > 0" 
      :id="id" 
      :count="count" 
      :basket="basket" 
      :catalog="catalog"
      @delProduct="$emit('del-product', id)"
      @changeCount="$emit('change-count', $event)"
      @addProduct="$emit('add-product', id)"></BasketLine>
    </template>
    <span class="basket__total-word">total cost:</span>
    <span class="basket__total-cost"><b>{{ Number(totalCost).toFixed(2) }}</b></span>
  </div>
  <div v-if="itemIdCount == 0" class="basket__heading"><i>The basket is empty</i></div>
</template>

<script>
import BasketLine from './subcomponents/BasketLine.vue';
import { stateMethodsMixin } from '../mixins/stateMethods';

export default {
  components: {
    BasketLine
  },
  mixins: [stateMethodsMixin],
  emits: ['del-product','add-product','change-count'],
}
</script>

<style lang="scss" scoped>
.basket__item,
.basket__list {
  display: flex;
  padding: 20px 27px 10px 20px;
  justify-content: space-between;
  background-color: wheat;
  border-radius: 12px;
  color: #213547;
  margin-bottom: 20px;
}

.basket__item {
  padding: 20px 10px 10px 20px;
}

.basket__heading {
  margin: 0;
  padding: 0;
}

.basket__list {
  display: grid;
  grid-template-columns: 3em 1fr 30px 50px 30px repeat(2, 90px);
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

.basket__point--button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 2px;
  width: 150px;
  min-width: fit-content;
  border: 2px solid gray;
  border-radius: 8px;
  background-color: #fff;
  text-decoration: none;
  color: black;
  cursor: pointer;
}

</style>