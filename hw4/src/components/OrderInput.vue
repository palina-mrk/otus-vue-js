<template>
  <h3>To order a product</h3>
  <div>
    <label for="'userName'+id">Your name:</label>
    <input 
      type="text" 
      name="userName" 
      :placeholder="'name'"
      :value="userName"
      @input="$emit('set-u-name', $event.target.value)"
      :id="'userName'+id">

    <label for="'userSurname'+id">Your surname:</label>
    <input 
      type="text" 
      name="userSurname" 
      :placeholder="'surname'"
      :value="userSurname"
      @input="$emit('set-u-surname', $event.target.value)"
      :id="'userSurname'+id">

    <label for="'userTel'+id">Your telephone:</label>
    <input 
      type="tel" 
      name="userTel" 
      :placeholder="'telephone'"
      :value="userTel"
      @input="$emit('set-u-tel', $event.target.value)"
      :id="'userTel'+id">

    <label for="'userCity'+id">Your city:</label>
    <input 
      type="text" 
      name="userCity" 
      :placeholder="'city'"
      :value="userCity"
      @input="$emit('set-u-city', $event.target.value)"
      :id="'userCity'+id"
      >    

    <label for="'userStreet'+id">Your street:</label>
    <input 
      type="text" 
      name="userStreet" 
      :placeholder="'street'"
      :value="userStreet"
      @input="$emit('set-u-street', $event.target.value)"
      :id="'userStreet'+id"
      >    
    
    <label for="'userHome'+ id">Your home:</label>
    <input 
      type="number" 
      name="userHome" 
      :placeholder="'home'"
      :value="userHome"
      @input="$emit('set-u-home', $event.target.value)"
      :id="'userHome'+id">
    
    <label for="'userFlat'+ id">Your flat:</label>
    <input 
      type="number" 
      name="userFlat" 
      :placeholder="'flat'"
      :value="userFlat"
      @input="$emit('set-u-flat', $event.target.value)"
      :id="'userFlat'+id">
    
    <label for="'idToOrder' + id">You want to order:</label>
    <select 
      :placeholder="'product to order'"
      :value="idToOrder"
      @input="$emit('set-id-to-order', $event.target.value)"
      :id="'idToOrder'+id">
      <option disabled value="">please choose the product</option>
      <option v-for="product in products" 
        :value="product.id"
        :key="product"
        >id: {{product.id}} -  
        {{ product.title.length > 37 ? 
        product.title.slice(0, 35) + '... - ' : 
        product.title + ' '.repeat(35 - product.title.length) + '- '}}  
        <b>{{product.price}}$</b></option>
    </select>
    <div class="buttons">
      <button
        @click="buttonClick"
      >order</button>
      <button
        @click="buttonReset"
      >reset</button>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';

const props = defineProps(['userName',
'userSurname',
'userTel',
'userHome', 
'userCity',
'userStreet',
'userFlat',
'idToOrder',
'products']);
const id = ref(Math.random());
const user = reactive({});

const emit = defineEmits();

function buttonClick() {
  emit('submit-order');
}

function buttonReset() {    
  emit('set-u-name','');
  emit('set-u-surname','');
  emit('set-u-home','');
  emit('set-u-flat','');
  emit('set-u-city','');
  emit('set-u-street','');
  emit('set-u-tel','');
  emit('set-id-to-order','');
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