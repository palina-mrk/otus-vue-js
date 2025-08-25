import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useCatalogStore } from './catalog.js';

export const useBasketStore = defineStore('basket',() => {
  const cat = useCatalogStore();

  const basket = reactive({});
  // пары {id товара: кол-во товара}
  // itemId : countOfProduct

  function addToBasket(itemId, count) {
    if(basket[itemId] === undefined){
      basket[itemId] = 0;
    }
    basket[itemId] = basket[itemId] + Number(count);
    if(basket[itemId] < 0)
      basket[itemId] = 0;
  }

  function changeCount(itemId, count) {
    if(count < 0)
      basket[itemId] = 0;
    else 
      basket[itemId] = Number(count);
  }

  function deleteInvalid() {
    Object.entries(basket).forEach((el) => {
      if(basket[el] == 0)
        delete basket[el];
    })
  }

  const itemIdCount = computed(
    () => Object.values(basket).filter((el) => el > 0).length
  );

  const totalCount = computed(
    () => Object.values(basket).reduce((sum, current) => sum + current, 0)
  ); 

  const totalCost = computed(
    () => Object.entries(basket).reduce(
      (sum, [id, count]) => sum + Number(count) * Number(cat.getPrice(id)), 0)
  );

  function itemCount(itemId) {
    if(!basket[itemId])
      return 0;

    return basket[itemId];
  };

  function itemCost(itemId) {
    if(!basket[itemId])
      return 0;

    return Number(cat.getPrice(itemId)) * Number(basket[itemId]);
  };

  function clear() {
    Object.keys(basket).forEach((key) => {delete basket[key]}); 
  }

  return {
    basket,
    addToBasket,
    changeCount,
    deleteInvalid,
    itemIdCount,
    itemCost,
    itemCount,
    totalCost,
    totalCount,
    clear
  };
})
