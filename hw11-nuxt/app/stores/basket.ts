import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {type Basket} from './types.ts'

export const useBasketStore = defineStore('basketStore', () => {
  
  //{id1: count1, id2: count2, ...}
  const basket = reactive<Basket | {}>({});

  function addToBasket(id: string) {
    if(!basket[id])
      basket[id] = 0;

    basket[id] = Number(basket[id]) + 1;
  };

  function changeCount(payload: {id: string, count: number}) {
    console.log(payload)
    const {id, count} = payload;    
    basket[id] = Number(count)
    if(basket[id] <= 0)
      delete basket[id];
  };

  function clearBasket () {
    Object.keys(basket).forEach((id) => {
      delete basket[id];
    })   
  };

  function delFromBasket (id: string) {
    if(basket[id]) 
      basket[id] = Number(basket[id]) - 1;
    if(basket[id] <= 0)
      delete basket[id]; 
  }

  return {basket, addToBasket, changeCount, clearBasket, delFromBasket};
})
