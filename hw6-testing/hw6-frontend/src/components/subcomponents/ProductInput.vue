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
    <label for="title">Product title*:</label>
    <div class="input-field">
      <input 
        type="text" 
        name="title" 
        placeholder="title"
        v-model="newProduct.title"
        id="title">
      <span
        class="input-error"
        v-if="error.title">
        {{ error.title }}
      </span>
    </div>

    <label for="image">Input image url:</label>
    <input 
      type="text" 
      name="image" 
      placeholder="https://......."
      v-model="newProduct.image"
      id="image"
      >    
    
    <label for="price">Input the price*:</label>
    <div class="input-field">
      <input 
        type="number" 
        name="price" 
        placeholder="XXX"
        v-model="newProduct.price"
        id="price">
      <span
        class="input-error"
        v-if="error.price">
        {{ error.price }}
      </span>
    </div>

    <label for="id">Choose product cathegory*:</label>
    <div class="input-field">
      <select 
        v-model="newProduct.category"
        id="category">
        <option disabled value="">some category</option>
        <option v-for="category in categories" 
          :value="category"
          :key="category"
          >{{ category }}</option>
      </select>
      <span
        class="input-error"
        v-if="error.category">
        {{ error.category }}
      </span>
    </div>

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
        class="btn-click"
        @click="buttonClick"
      >add</button>
      <button
        class="btn-reset"
        @click="buttonReset"
      >reset</button>
    </div>
    <div class="success" v-if="success">
      <span class="success-text">The product was successly added!</span>
      <button 
        class="success-btn"
        @click="success = false">OK</button>
    </div>
  </div>
</template>

<script>
import { productInputMixin } from '../../mixins/productInput.js'
export default {
  mixins: [productInputMixin],  
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
  grid-template-columns: 1.2fr 1fr;
  gap: 5px;
  align-items: baseline;
  position: fixed;
  width: 430px;
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

form label {
  font-size: 16px;
  color: #213547;
  font-weight: 500;
}

.buttons {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  grid-column: -1 / -2;
  position: relative;
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

.input-field {
  display: flex;
  flex-direction: column;
}

.input-error {
  color: red;
  font-size: 0.8em;
}

.success {
  position: absolute;
  left: 20%;
  top: 80%;
  width: 200px;
  background-color: gainsboro;
  border-radius: 20px;
  position: absolute;
  border: 1px solid #213547;
  padding: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>