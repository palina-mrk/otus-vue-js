<template>
  <h3></h3>
  <div>
    <label for="name">Your name:</label>
    <input 
      type="text" 
      name="name" 
      placeholder="Name"
      :value="privateInfo.name"
      @blur="privateInfo.name = $event.target.value"
      @keyup.enter="privateInfo.name = $event.target.value"
      id="name">

    <label for="surname">Your surname:</label>
    <input 
      type="text" 
      name="surname" 
      placeholder="Surname"
      :value="privateInfo.surname"
      @blur="privateInfo.surname = $event.target.value"
      @keyup.enter="privateInfo.surname = $event.target.value"
      id="surname">

    <label for="tel">Your telephone:</label>
    <input 
      type="tel" 
      name="tel" 
      placeholder="+ 375 (XX) XXX-XX-XX"
      :value="privateInfo.tel"
      @blur="privateInfo.tel = $event.target.value"
      @keyup.enter="privateInfo.tel = $event.target.value"
      id="tel">

    <label for="email">Your email:</label>
    <input 
      type="email" 
      name="email" 
      placeholder="+ 375 (XX) XXX-XX-XX"
      :value="privateInfo.email"
      @blur="privateInfo.email = $event.target.value"
      @keyup.enter="privateInfo.email = $event.target.value"
      id="email">

    <label for="city">Your city:</label>
    <input 
      type="text" 
      name="city" 
      placeholder="City"
      :value="privateInfo.city"
      @keyup.enter="privateInfo.city = $event.target.value"
      @blur="privateInfo.city = $event.target.value"
      id="city"
      >    

    <label for="street">Your street:</label>
    <input 
      type="text" 
      name="street" 
      placeholder="Street"
      :value="privateInfo.street"
      @keyup.enter="privateInfo.street = $event.target.value"
      @blur="privateInfo.street = $event.target.value"
      id="street"
      >    
    
    <label for="house">Your house:</label>
    <input 
      type="number" 
      name="house" 
      placeholder="XX"
      :value="privateInfo.house"
      @keyup.enter="privateInfo.house = $event.target.value"
      @blur="privateInfo.house = $event.target.value"
      id="house">
    
    <label for="flat">Your flat:</label>
    <input 
      type="number" 
      name="flat" 
      placeholder="XXX"
      :value="privateInfo.flat"
      @keyup.enter="privateInfo.flat = $event.target.value"
      @blur="privateInfo.flat = $event.target.value"
      id="flat">
    
    <label for="card">Your card number:</label>
    <input 
      type="number" 
      name="card" 
      placeholder="XXXX XXXX XXXX XXXX"
      :value="privateInfo.card"
      @blur="privateInfo.card = $event.target.value"
      @keyup.enter="privateInfo.card = $event.target.value"
      id="tel">

    <div class="order">
      <p class="order__note">You want to order:</p>
      <template v-for="[id, count] in Object.entries(obj.basket)">
        <span class="order__product-title">{{ cat.getTitle(id)}}</span> <span> {{ count }} x {{ cat.getPrice(id)}} <b>$</b></span> <span> = {{ obj.itemCost(id)}} <b>$</b></span>
      </template>
      <span class="order__cost-sum">total cost:</span>
      <span class="order__cost-num">{{ obj.totalCost }} <b>$</b></span>
    </div>
    
    <div class="buttons">
      <button
        @click="toOrder"
      >order</button>
      <button
        @click="usr.clearPrivateInfo"
      >reset</button>
      </div>
    </div>
</template>

<script setup>
import {  privateInfoStore } from '@/comp-store/user-info';
import { storeToRefs } from 'pinia';
import { useBasketStore } from '@/comp-store/basket';
import { useCatalogStore } from '@/comp-store/catalog';
import { useRouter } from 'vue-router';

const obj = useBasketStore();
const cat = useCatalogStore();
const router = useRouter();
const usr = privateInfoStore();
const { privateInfo, isFilled } = storeToRefs(usr); 

function toOrder() {
  if(isFilled && (obj.itemIdCount > 0)){
    alert('Order is complete!');
    obj.clear();
    router.push('/');
  }
  else if(!isFilled)
    alert('Please, fill all fields!');
  else {
    alert('Please, add at least one product in the basket!')
    router.push('/');
  }

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
  height: 2em;
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

.order {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 90px 90px;
  gap: 5px 10px;
  font-style: italic;
  font-weight: 500;
  text-align: right;
}

.order__product-title {
  width: 100%;
  height: 1.2em;
  overflow: hidden;
}

.order__note,
.order__cost {
  grid-column: span 3;
}

.order__note {
  font-weight: 700;
}

.order__cost-sum {
  grid-column: -3 / -2;
  text-align:  right;
  font-weight: 700;
  padding-right: 5px;
}

.order__cost-num {
  grid-column: -2 / -1;
  text-align:  right;
  font-weight: 700;
}
</style>