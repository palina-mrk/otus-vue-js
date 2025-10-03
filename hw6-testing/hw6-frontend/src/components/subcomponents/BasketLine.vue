<template>
    <span class="basket__point">{{ id }}</span>
    <span class="basket__point basket__point--width-fixed">{{ getTitle(id) }}</span>
    <button class="basket__point basket__point--button"
      @click="$emit('del-product')">-</button>
    <input class="basket__point basket__point--input" 
      type="number"
      :value="count"
      @blur="$emit('change-count', {count: $event.target.value, id: id})"
      @keyup.enter="$emit('change-count', {count: $event.target.value, id: id})"></input>
    <button class="basket__point basket__point--button"
      @click="$emit('add-product')">+</button>
    <span class="basket__point basket__point--right">{{ Number(getPrice(id)).toFixed(2)}}</span>
    <span class="basket__point basket__point--right">{{ Number(getPrice(id)).toFixed(2)}}</span>
</template>

<script>
import { stateMethodsMixin } from '../../mixins/stateMethods';

export default {
  mixins: [stateMethodsMixin],
  props: ['id','count'],
  emits: ['del-product','add-product','change-count'],
}
</script>

<style lang="scss" scoped>
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