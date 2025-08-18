<template>
  <div>
    <label for="id">Search by {{ neededProperty }}</label>
    <input 
      type="neededType" 
      :name="`${neededProperty}Input`" 
      :placeholder="'Input product ' + neededProperty"
      :value="value"
      @input="$emit('set-text', $event.target.value)"
      @keyup.enter="buttonClick"
      :id="id">
    <button
      @click="buttonClick"
    >search</button>
    <button
      @click="buttonReset"
    >reset</button>
    <p v-show="showSearch">{{ searchFor }}</p>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['neededProperty','value']);
const text = ref(props.value);
const showSearch = ref(false);
const searchFor = ref('Search for');
const id = ref(Math.random());

const emit = defineEmits();
function buttonClick() {
    text.value = props.value;
    showSearch.value = true;
    if(props.neededProperty === 'price')
      searchFor.value = `Search for the price ${text.value}$`;
    else
      searchFor.value = `Search for "${text.value}"`;
    emit('search-text',text.value);
    emit('set-text','');
}
function buttonReset() {
    text.value = '';
    showSearch.value = false;
    emit('stop-search');
    emit('set-text','');
}
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-template-columns: 150px repeat(3, auto);
  gap: 0 20px;
  align-items: center;
}

input {
  font-size: 16px;
}

label {
  font-size:20px;
}

button {
  font-size: 12px;
  margin: 0;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  border-radius: 5px;
}

p {
  padding: 0;
  margin: 0;
  max-width: fit-content;
  text-align: left;
  grid-column: 1 / -1;
}
</style>