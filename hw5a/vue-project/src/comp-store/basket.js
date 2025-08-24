import { ref, computed, reactive } from 'vue';
import { getPrice } from './catalog.js';

export const basket = ref({});
// пары {id товара: кол-во товара}
// itemId : countOfProduct

export function addToBasket(itemId, count) {
  if(basket.value[itemId] === undefined){
    basket.value[itemId] = 0;
  }
  basket.value[itemId] = basket.value[itemId] + Number(count);
  if(basket.value[itemId] < 0)
    basket.value[itemId] = 0;
}

export function changeCount(itemId, count) {
  if(count < 0)
    basket.value[itemId] = 0;
  else 
    basket.value[itemId] = Number(count);
}

export function deleteInvalid() {
  Object.entries(basket.value).forEach((el) => {
    if(basket.value[el] == 0)
      delete basket.value[el];
  })
}

export const itemIdCount = computed(
  () => Object.values(basket.value).filter((el) => el > 0).length
);

export const totalCount = computed(
  () => Object.values(basket.value).reduce((sum, current) => sum + current, 0)
); 

export const totalCost = computed(
  () => Object.entries(basket.value).reduce(
    (sum, [id, count]) => sum + Number(count) * Number(getPrice(id)), 0)
);

export function itemCount(itemId) {
  if(!basket.value[itemId])
    return 0;

  return basket.value[itemId];
};

export function itemCost(itemId) {
  if(!basket.value[itemId])
    return 0;

  return Number(getPrice(itemId)) * Number(basket.value[itemId]);
};

export function clear() {
  Object.keys(basket.value).forEach((key) => {delete basket.value[key]}); 
}