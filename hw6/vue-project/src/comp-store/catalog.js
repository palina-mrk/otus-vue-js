import { ref, reactive, computed } from 'vue'
import data from '../data/products.json'; 
import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog',() => {
  const isLoaded = ref(false);
  const isLoading = ref(false);
  const catalog = ref([]);
    
  async function loadCatalog() {
      return new Promise((resolve) => {
        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
          isLoaded.value = true;
          resolve(data);
        }, Math.random*1000);
      })
    }

  function getPrice(itemId) {
    return catalog.value.find(elem => elem.id == itemId)?.price ?? 0;
  }

  function getTitle(itemId) {
    return catalog.value.find(elem => elem.id == itemId)?.title ?? 0;
  }

  function getItem(itemId) {
    return catalog.value.find(elem => elem.id == itemId) ?? {};
  }

  function getCategories() {
    return catalog.value.reduce((acc, el) => {
      if(acc.find((cath) => cath == el.category))
        return acc;
      acc.push(el.category);
      return acc;
    },[]);
  }

  const maxId = computed(() => {
    return catalog.value.reduce((acc, el) => 
      (Number(acc) >= Number(el.id) 
      ? Number(acc) 
      : Number(el.id)), -1)});

  function addProduct(product) {
    const newProduct = reactive(Object.assign({}, product));
    newProduct.id = ref(Number(maxId.value) + 1);
    newProduct.rating = reactive({'rate': 0, 'count' : 0});
    catalog.value.push(newProduct);
  }

  return {
    isLoaded,
    isLoading,
    catalog,
    loadCatalog,
    getCategories,
    getItem,
    getPrice,
    getTitle,
    addProduct,
  }
});