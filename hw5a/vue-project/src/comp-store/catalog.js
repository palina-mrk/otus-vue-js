import { ref } from 'vue'
import data from '../data/products.json'; 

export const isLoaded = ref(false);
export const isLoading = ref(false);
export const catalog = ref([]);
  
export async function loadCatalog() {
    return new Promise((resolve) => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
        resolve(data);
      }, Math.random*1000);
    })
  }

export function getPrice(itemId) {
  return catalog.value.find(elem => elem.id == itemId)?.price ?? 0;
}

export function getTitle(itemId) {
  return catalog.value.find(elem => elem.id == itemId)?.title ?? 0;
}

export function getItem(itemId) {
  return catalog.value.find(elem => elem.id == itemId) ?? {};
}