import { ref, reactive, computed } from 'vue'
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

export function getCategories() {
  return catalog.value.reduce((acc, el) => {
    if(acc.find((cath) => cath == el.category))
      return acc;
    acc.push(el.category);
    return acc;
  },[]);
};

const maxId = computed(() => {
  return catalog.value.reduce((acc, el) => 
    (Number(acc) >= Number(el.id) 
    ? Number(acc) 
    : Number(el.id)), -1)});

export function addProduct(product) {
  const newProduct = reactive(Object.assign({}, product));
  newProduct.id = ref(Number(maxId.value) + 1);
  newProduct.rating = reactive({'rate': 0, 'count' : 0});
  catalog.value.push(newProduct);
}
