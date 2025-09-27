<script setup lang="ts">
import Navigation from './components/subcomponents/Navigation.vue'
import HomeView from './components/HomeView.vue'
import ProductView from './components/ProductView.vue';
import BasketView from './components/BasketView.vue'
import BasketState from './components/subcomponents/BasketState.vue'
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { reactive } from 'vue'
import { type ProductInputType, type Product, type Payload, type PageView, type PageViewKey, type Basket } from './App.types';
const pageView = reactive<PageView>({
  home: 1,
  basket: 0,
  product: 0,
})
function setPage(field: PageViewKey, id: number) {
  const keys: string[] = Object.getOwnPropertyNames(pageView);
  keys.forEach((key) => pageView[key as keyof PageView] = 0);
  pageView[field as keyof PageView] = id;  
  console.log(pageView)  
}


const { result, refetch } = useQuery(
  gql`{
    products {
      id
      title
      description
      price
      category
      image 
      rating { rate count }
      },
    categories,
  }`,
  {}
)

import ProductInput from './components/subcomponents/ProductInput.vue';
const newProduct = reactive<ProductInputType>({
  title: undefined,
  price: undefined,
  description: undefined,
  category: undefined,
  image: undefined,

});
const { mutate: addProductMutate } = useMutation(
  gql`
    mutation AddProduct($productInput: ProductInput!) {
      addProduct(product: $productInput) {
        id
        title
      }
    }
  `,() => ({variables: 
    {
      productInput: {
        title: newProduct.title,
        price: newProduct.price,
        category: newProduct.category,
        image: newProduct.image,
        description: newProduct.description,
      },
    }}),
)

function addProduct(product: Product) {
  newProduct.title = product.title || 'some title';
  newProduct.description = product.description || 'some text';
  newProduct.price = product.price || 0.0;
  newProduct.category = product.category;
  newProduct.image = product.image;
  addProductMutate()
  refetch()
}

import { io } from 'socket.io-client'
const socket = io('ws://localhost:3000')
//basket: {id1: count1, id2: count2, ...}
const basket = reactive<Basket>({})

//разговариваем с сервером
socket.on('pong', (changeInfo: Payload) => {
  if(changeInfo.allClear) {
    Object.keys(basket).forEach((id) => delete basket[id]);
  } else {
    basket[changeInfo.id as keyof Basket] = changeInfo.count;
    if(changeInfo.count === undefined)
      delete basket[changeInfo.id];
  }

  console.log('renew-basket', basket)
})

function addToBasket(productID: string, productCount: number) {
  socket.emit('add-to-basket', {
    id: productID,
    count: productCount
  })
}

function clearBasket() {
  socket.emit('clear-basket')
  setPage('home', 1)
}

function changeCount(productID: string, productCount: number) {
  socket.emit('change-count', {
    id: productID,
    count: productCount
  })
}

</script>

<template>
  <header class="header">
    <div class="header__left-wrapper">
      <span class="logo">Internet Shop</span>
      <ProductInput class="checkbox" 
        :categories="result?.categories"
        @addProduct="addProduct($event)"></ProductInput>
    </div>
    <div class="header__right-wrapper">
      <Navigation 
        class="nav"
        @toBasket="setPage('basket', 1)"
        @toHome="setPage('home', 1)"></Navigation>
      <BasketState 
        :catalog="result?.products"
        :basket="basket"
        class="basket-info"></BasketState>
    </div>
  </header>
  <main class="main">
    <HomeView v-if="(result !== null) && pageView.home == 1"
      :catalog="result?.products"
      :categories="result?.categories"
      :basket="basket"
      @addProduct="addToBasket($event, 1)"
      @toProduct="setPage('product', $event)"
      ></HomeView>
    <BasketView v-else-if="(result !== null) && pageView.basket == 1"
      :basket="basket"
      :catalog="result?.products"
      :categories="result?.categories"
      @addProduct="addToBasket($event, 1)"
      @delProduct="addToBasket($event, -1)"
      @clearBasket="clearBasket"
      @changeCount="changeCount($event.id, $event.count)"
      ></BasketView>
    <ProductView v-else-if="(result !== null) && pageView.product != 0"
      :product="result?.products[pageView.product - 1]"
      @toBasket="setPage('basket', 1)"
      @addProduct="addToBasket($event, 1)"
      :basket="basket"
      :catalog="result?.products"
    ></ProductView>
    <p v-else>is loading...</p>
  </main>

</template>

<style scoped>
* {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.header {
  background-color: #213547;
  box-sizing: border-box;
  padding: 10px;
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 20px;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
}

.header__left-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
}

.logo,
.checkbox {
  color: wheat;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.5;
  transform: scaleX(80%) translateX(-12%);
}

@media (max-width: 800px) {
  .header__right-wrapper {
    width: 300px;
  }
}

@media (max-width: 520px) {
  .header {
    flex-direction: column;
    align-items: end;
  }
  .logo {
    align-self: start;
  }
}

.header__right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
}

.main {
  padding: 20px;
  padding-top: 120px;
  max-height: calc(100vh - 200px);
}
</style>
