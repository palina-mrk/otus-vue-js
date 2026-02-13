import { describe, it, expect } from 'vitest'
import { useBasketStore } from '../basket.js'
import { useCatalogStore } from '../catalog.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../App.vue'

describe('addToBasket', () => {
  const app = createApp(App)
  app.use(createPinia())
  const { basket, addToBasket } = useBasketStore();

  it('at first the basket is empty',() => {
    expect(Object.keys(basket).length).toBe(0);
  })
  it('adds objects to the basket properly',() => {
    addToBasket(2, 1);
    expect(Object.keys(basket).length).toBe(1);
    expect(basket[2]).toBe(1);
    addToBasket(3, 5);
    expect(Object.keys(basket).length).toBe(2);
    expect(basket[3]).toBe(5);
  })
  it('doesn\'t make items count less than zero',() => {
    addToBasket(2, -2);
    expect(basket[2]).toBe(0);
  })
})

describe('addToBasket', () => {
  const app = createApp(App)
  app.use(createPinia())
  const { basket, addToBasket } = useBasketStore();

  it('at first the basket is empty',() => {
    expect(Object.keys(basket).length).toBe(0);
  })
  it('adds objects to the basket properly',() => {
    addToBasket(2, 1);
    expect(Object.keys(basket).length).toBe(1);
    expect(basket[2]).toBe(1);
    addToBasket(3, 5);
    expect(Object.keys(basket).length).toBe(2);
    expect(basket[3]).toBe(5);
  })
  it('doesn\'t make items count less than zero',() => {
    addToBasket(2, -2);
    expect(basket[2]).toBe(0);
  })
})
  
describe('loadCatalog', () => {
  const app = createApp(App)
  app.use(createPinia())
  const cat = useCatalogStore();
  cat.catalog = [{id: 1, price: 20}, {id:2, price: 30}];

  it('creates mocked catalog properly', () => {
    expect(cat.getPrice(2)).toBe(30);
    expect(cat.getPrice(1)).toBe(20);
  });

  const bsk = useBasketStore();
  bsk.cat = cat;

  it('uses mocked catalog properly', () => {
    expect(JSON.stringify(bsk.cat.catalog))
      .toBe(JSON.stringify([{id: 1, price: 20}, {id:2, price: 30}]));
    expect(bsk.cat.getPrice(1)).toBe(20);
    expect(bsk.cat.getPrice(2)).toBe(30);
  });

  it('counst the sum of prices properly', () => {
    expect(bsk.totalCost).toBe(0);
    bsk.addToBasket(1, 1);
    expect(bsk.totalCost).toBe(20);
    bsk.addToBasket(1, 2);
    expect(bsk.totalCost).toBe(60);
    bsk.addToBasket(2, 2);
    expect(bsk.totalCost).toBe(120);
    bsk.addToBasket(2, -10);
    expect(bsk.totalCost).toBe(60);
  });

  it('clears the baskets properly', () => {
    bsk.clear();
    expect(bsk.totalCost).toBe(0);
    expect(Object.keys(bsk.basket).length).toBe(0);
  });

  it('counst the count of items properly', () => {
    expect(bsk.totalCount).toBe(0);
    bsk.addToBasket(1, 1);
    expect(bsk.totalCount).toBe(1);
    bsk.addToBasket(1, 2);
    expect(bsk.totalCount).toBe(3);
    bsk.addToBasket(2, 2);
    expect(bsk.totalCount).toBe(5);
    bsk.addToBasket(2, -10);
    expect(bsk.totalCount).toBe(3);
    bsk.clear();
    expect(bsk.totalCount).toBe(0);
  });

  it('counst the count of item ids properly', () => {
    expect(bsk.itemIdCount).toBe(0);
    bsk.addToBasket(1, 1);
    expect(bsk.itemIdCount).toBe(1);
    bsk.addToBasket(1, 2);
    expect(bsk.itemIdCount).toBe(1);
    bsk.addToBasket(2, 2);
    expect(bsk.itemIdCount).toBe(2);
    bsk.addToBasket(2, -10);
    expect(bsk.itemIdCount).toBe(1);
    bsk.clear();
    expect(bsk.totalCount).toBe(0);
  });
})

