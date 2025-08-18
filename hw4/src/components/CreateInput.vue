<template>
  <h3>To create product card</h3>
  <div>
    <label for="'title'+id">Product title:</label>
    <input 
      type="text" 
      name="title" 
      :placeholder="'title'"
      :value="newTitle"
      @input="$emit('set-title', $event.target.value)"
      :id="'title'+id">

    <label for="'image'+id">Input image url:</label>
    <input 
      type="text" 
      name="'image'" 
      :placeholder="'url to image'"
      :value="newImage"
      @input="$emit('set-image', $event.target.value)"
      :id="'image'+id"
      >    
    
    <label for="'price'+ id">Input the price:</label>
    <input 
      type="number" 
      name="'price'" 
      :placeholder="'price'"
      :value="newPrice"
      @input="$emit('set-price', $event.target.value)"
      :id="'price'+id">
    
    <label for="id">Choose product cathegory:</label>
    <select 
      :placeholder="'category'"
      :value="newCategory"
      @input="$emit('set-category', $event.target.value)"
      :id="'category'+id">
      <option disabled value="">please choose one category</option>
      <option v-for="category in categories" 
        :value="category"
        :key="category"
        >{{ category }}</option>
    </select>

    <label for="'description' + id">Input description:</label>
    <textarea
      type="text"
      name="'description'" 
      :placeholder="'description'"
      :value="newDescription"
      @input="$emit('set-description', $event.target.value)"
      :id="'description'+id"
    ></textarea>
    <div class="buttons">
      <button
        @click="buttonClick"
      >add</button>
      <button
        @click="buttonReset"
      >reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';

const props = defineProps(['newTitle','newPrice','newImage','newCategory','newDescription','categories']);
const id = ref(Math.random());
const newObj = reactive({});

const emit = defineEmits();

function buttonClick() {
  newObj.title = props.newTitle.value;
  newObj.category = props.newCategory.value;
  newObj.price = props.newPrice.value;
  newObj.image = props.newImage.value;
  newObj.desription =  props.newDescription.value;
  emit('add-product', newObj);
}

function buttonReset() {
  emit('set-title','');
  emit('set-category','');
  emit('set-price','');
  emit('set-image','');
  emit('set-desription','');
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
}
div {
  display: grid;
  grid-template-columns: 250px 300px;
  gap: 5px 20px;
  align-items: center;
}

input {
  font-size: 16px;
}

label {
  font-size:16px;
}

.buttons {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  grid-column: -1 / -2;
}

button {
  font-size: 12px;
  margin: 0;
  padding: 0 5px;
  width: calc(50% - 3px);
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