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

import { reactive } from 'vue'
import ProductInput from './components/subcomponents/ProductInput.vue';
const newProduct = reactive({});
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

function addProduct(product) {
  newProduct.title = product.title || 'some title';
  newProduct.description = product.description || 'some text';
  newProduct.price = product.price || 0.0;
  newProduct.category = product.category;
  newProduct.image = product.image;
  addProductMutate()
  refetch()
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
      <Navigation class="nav"></Navigation>
      <!--BasketState class="basket-info"></BasketState-->
    </div>
  </header>
  <main class="main">
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
  max-height: calc(100vh - 200px);
}
</style>
