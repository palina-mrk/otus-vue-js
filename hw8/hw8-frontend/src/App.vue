<script setup>
import Navigation from './components/subcomponents/Navigation.vue'
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag'

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

import {ref} from 'vue'
let myTitle = ref('')
let myPrice = 12.5
let myCategory = 'vvv'
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
        title: myTitle.value,
        price: 12.5,
        category: 'men\'s clothing'
      },
    }}),
)

function addProduct() {
  addProductMutate()
  refetch()
}
</script>

<template>
  <header class="header">
    <span class="logo">Internet Shop</span>
    <div class="right__wrapper">
      <Navigation class="nav"></Navigation>
      <!--BasketState class="basket-info"></BasketState-->
    </div>
  </header>
  <main class="main">
      <input type="text" v-model="myTitle">
      <button @click="addProduct">add</button>
    
    <router-view 
      v-if="result !== null" 
      :catalog="result?.products"
      :categories="result?.categories"
      />
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
}

.logo {
  color: wheat;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  font-weight: 500;
  opacity: 0.5;
  transform: scaleX(80%);
}

.nav {
  width: 100%;
}

@media (max-width: 800px) {
  .right__wrapper {
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

.right__wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
}

.main {
  padding: 20px;
  max-height: calc(100vh - 200px);
}
</style>
