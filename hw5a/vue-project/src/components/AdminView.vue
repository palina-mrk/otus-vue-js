<template>
  <h3>To create product card</h3>
  <div>
    <label for="title">Product title:</label>
    <input 
      type="text" 
      name="title" 
      placeholder="title"
      v-model="newProduct.title"
      id="title">

    <label for="image">Input image url:</label>
    <input 
      type="text" 
      name="image" 
      placeholder="https://......."
      v-model="newProduct.image"
      id="image"
      >    
    
    <label for="price">Input the price:</label>
    <input 
      type="number" 
      name="price" 
      placeholder="XXX"
      v-model="newProduct.price"
      id="price">
    
    <label for="id">Choose product cathegory:</label>
    <select 
      v-model="newProduct.category"
      id="category">
      <option disabled value="">some category</option>
      <option v-for="category in cat.getCategories()" 
        :value="category"
        :key="category"
        >{{ category }}</option>
    </select>

    <label for="description">Input description:</label>
    <textarea
      type="text"
      name="description" 
      placeholder="this product is..."
      v-model="newProduct.description"
      id="description"
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
import * as cat from '@/comp-store/catalog';
import { reactive } from 'vue';
defineProps(['catalog']);
const newProduct = reactive({
  title: '',
  image: '',
  price: 0,
  category: '',
  description: '',
});

function isValid() {
  if(newProduct.price == 0)
    return false;
  return(
    newProduct.title.length > 0 &&
    newProduct.image.length > 0 &&
    newProduct.category.length > 0 &&
    newProduct.description.length > 0
  )
}

function buttonClick() {
  if(isValid()){
    cat.addProduct(newProduct);
    alert('new product is succesly added');
  } else
    alert('please, fill all tse fields!');
}

function buttonReset() {
  newProduct.title = '';
  newProduct.image = '';
  newProduct.price = 0;
  newProduct.category = '';
  newProduct.description = '';
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