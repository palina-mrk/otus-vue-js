import { onBeforeMount, ref } from 'vue'
import data from '../data/products.json'; 

export function useCatalog(){
  const isLoading = ref(false);
  const catalog = ref([]);
  
  async function loadCatalog() {
    return new Promise((resolve) => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        resolve(data);
      }, Math.random*1000);
    })
  }

  loadCatalog().then((data) => (catalog.value = data));

  return { catalog, isLoading };
}