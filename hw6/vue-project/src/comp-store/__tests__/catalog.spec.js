import { describe, it, expect } from 'vitest'
import { useCatalogStore } from '../catalog.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../App.vue'
  
describe('loadCatalog', () => {
  const app = createApp(App)
  app.use(createPinia())
  let { catalog, isLoaded, loadCatalog } = useCatalogStore();

  it('at first the catalog is empty and isLoaded is false',() => {
    expect(Object.keys(catalog).length).toBe(0);
    expect(isLoaded).toBe(false);
  })

  it('adds objects to the basket properly', () => {
    loadCatalog()
      .then((data) => {
        catalog = data;
        isLoaded = useCatalogStore().isLoaded;
      })
      .then(() => {
        expect(catalog[0]).toBeInstanceOf(Object);
        expect(Object.keys(catalog).length).toBe(20);
      })
  })
})

describe('loadCatalog with mock catalog', () => {
  const app = createApp(App)
  app.use(createPinia())
  const mock = {
    data: [{id: 1, price: 20}, {id:2, price: 30}],
    useCatalogStore: useCatalogStore,  
  }
  const cat = mock.useCatalogStore();

  it('at first the catalog is empty and isLoaded is false',() => {
    expect(Object.keys(cat.catalog).length).toBe(0);
    expect(cat.isLoaded).toBe(false);
  })

  it('adds objects to the basket properly', () => {
    cat.loadCatalog()
      .then(() => {
        cat.catalog = mock.data;
      })
      .then(() => {
        expect(cat.catalog[0]).toBeInstanceOf(Object);
        expect(Object.keys(cat.catalog).length).toBe(2);
        expect(cat.isLoaded).toBe(true);
      })
  })
})
