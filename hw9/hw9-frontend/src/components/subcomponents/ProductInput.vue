<template class="parent">
  <div class="input">
    <label for="create-new-product">create product card</label>
    <input 
      type="checkbox"
      v-model="showCard"
      id="create-new-product">  
  </div>  
  <div class="form" v-show="showCard">
    <h3>Create product card</h3>
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
      <option v-for="category in categories.categories" 
        :value="category"
        :key="String(category)"
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

<script setup lang="ts">
import { type ProductInput } from './ProductInput.types.ts'
import { ref, reactive, defineEmits } from 'vue';
const categories = defineProps<{
  categories: Array<string>;
}>()

console.log(categories)

const newProduct = reactive<ProductInput>({
  title: undefined,
  price: undefined,
  description: undefined,
  category: undefined,
  image: undefined,

});
const showCard = ref<boolean | string>('');
buttonReset();

const emit = defineEmits();
function buttonClick() {
  emit('add-product', Object.assign(newProduct));
  buttonReset();
  showCard.value = false;
}

function buttonReset() {
  newProduct.title = undefined;
  newProduct.image = undefined;
  newProduct.price = undefined;
  newProduct.category = undefined;
  newProduct.description = undefined;
}
</script>

<style lang="scss" scoped>
.parent {
  position: relative;
}
h3 {
  margin: 0 0 10px;
  grid-column: 1 / -1;
  color: #213547;
}
.input {
  display: flex;
  gap: 5px;
  color: wheat;
}

.form {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 5px;
  align-items: center;
  position: fixed;
  width: 450px;
  padding: 25px;
  background-color: wheat;
  border-radius: 20px;
  position: absolute;
  top: 100px;
  left: 10px;
  border: 1px solid #213547;
}

input {
  font-size: 16px;
}

.form label {
  font-size: 16px;
  color: #213547;
  font-weight: 500;
  grid-column: 1 / 2;
  width: 100%;
}

.form input,
.form select,
.form textarea {
  width: 300px;
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