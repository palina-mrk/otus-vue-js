import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalogStore', () => {
  const data = ref([]);

  callOnce(async () => {
    data.value = await $fetch(`/api/products`); 
  })

  const catalog = computed(() => data.value.catalog);
  const categories = computed(() => data.value.categories); 

  function createProduct(product) {
    const newProduct = {
      id: data.value.catalog.length + 1,
      title: product.title,
      price: product.price,
      description: product.description || 'some words about product...',
      category: product.category,
      image: product.image || '[product picture]',
      rating: { rate: 0.0, count: 0 },
    }

    data.value.catalog.push(newProduct)
  }
  return { data, catalog, categories, createProduct}
})
