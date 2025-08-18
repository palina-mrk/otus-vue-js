<script setup>
import { reactive, ref, computed } from 'vue';
import ProductCard from './components/ProductCard.vue';
import ProductsData from './components/ProductsArray.json';
import SearchByNameInput from './components/SearchInput.vue';
import SearchByPriceInput from './components/SearchInput.vue';
import CreateInput from './components/CreateInput.vue';
import OrderInput from './components/OrderInput.vue';

const products = reactive(ProductsData);
const textName = ref('');
const textPrice = ref('');
const filter = ref('all');
const valueNeeded = ref('');
const newTitle = ref('');
const newCategory = ref('');
const newPrice = ref('');
const newImage = ref('');
const newDescription = ref('');
const showCreateForm = ref(false);
const showSearchForm = ref(false);
const showOrderForm = ref(false);

const filteredProducts = computed(() => {
  switch(filter.value) {
    case 'all':
      return products;
    case 'foundedByName':
      return products.filter((el) => el.title.toLowerCase().includes(valueNeeded.value.toLowerCase()));
    case 'foundedByPrice':
      return products.filter((el) => 
        el.price.toFixed(2) === Number(valueNeeded.value).toFixed(2) || 
        el.price.toFixed(1) === Number(valueNeeded.value).toFixed(1) || 
        el.price.toFixed(0) === Number(valueNeeded.value).toFixed(0)  
      );
  }
});
const filteredName = computed(() => {
  switch(filter.value) {
    case 'all':
      return 'Products list';
    case 'foundedByName':
    case 'foundedByPrice':
      return 'Founded';
  }
}); 

function searchName(string) {
  valueNeeded.value = string;
  filter.value = 'foundedByName';
}

function searchPrice(string) {
  valueNeeded.value = string;
  filter.value = 'foundedByPrice';
}

function stopSearch() {
  filter.value = 'all';
}

const maxId = computed(() => {
  return products.reduce((acc, el) => 
    (Number(acc) >= Number(el.id) 
    ? Number(acc) 
    : Number(el.id)), -1)});

function addProduct() {
  const newProduct = reactive(Object.assign({
    title: newTitle.value, 
    category: newCategory.value, 
    price: newPrice.value, 
    image: newImage.value, 
    description: newDescription.value}
  ));
  newProduct.id = ref(Number(maxId.value) + 1);
  newProduct.rating = reactive({'rate': 0, 'count' : 0});
  products.push(newProduct);
}

const categories = reactive(products.reduce((acc, el) => {
    if(acc.find((cath) => cath == el.category) === undefined)
      acc.push(el.category);
    return acc;
  },[]));


const userName = ref('');
const userSurname = ref('');
const userCity = ref('');
const userStreet = ref('');
const userHome = ref('');
const userFlat = ref('');
const userTel = ref('');
const idToOrder = ref('');

function orderProduct(id){
  idToOrder.value = id;
  showOrderForm.value = true;
}

function submitOrder(){
  alert('Your order is sent!');
  userName.value = '';
  userSurname.value = '';
  userCity.value = '';
  userStreet.value = '';
  userHome.value = '';
  userFlat.value = '';
  userTel.value = '';
  idToOrder.value = '';  
  showOrderForm.value = false;
}
</script>

<template>
  <div class="form-shower" >
      <label 
        class="form-shower__label" 
        for="showSearchForm">Show form to seek for product</label>
      <input 
        class="form-shower__checkbox" 
        type="checkbox"
        id="showSearchForm"
        v-model="showSearchForm">
      <label 
        class="form-shower__label" 
        for="'showCreateForm'">Show form to add a new product</label>
      <input 
        class="form-shower__checkbox" 
        type="checkbox"
        v-model="showCreateForm"
        id="'showCreateForm'">
      <label 
        class="form-shower__label" 
        for="showOrderForm">Show form to order the product</label>
      <input 
        class="form-shower__checkbox" 
        type="checkbox"
        v-model="showOrderForm"
        id="showOrderForm">
      <p>{{ whatToShow }}</p>
  </div>

  <section class="seek-forms" v-show="showSearchForm">
  <h3 class="seek-forms__title">To search for a product</h3>
    <SearchByNameInput 
      class="seek-forms__by-name"
      :neededProperty="'name'" 
      :value="textName"
      @setText="textName = $event"
      @searchText="searchName($event)"
      @stopSearch="stopSearch"></SearchByNameInput>
  
    <SearchByPriceInput 
      class="seek-forms__by-price"
      :neededProperty="'price'" 
      :value="textPrice"
      @setText="textPrice = $event"
      @searchText="searchPrice"
      @stopSearch="stopSearch"></SearchByPriceInput>
  </section>

  <section class="admin-forms" v-show="showCreateForm">
    <CreateInput class="admin-forms__create"
      :newCategory="newCategory"
      :categories="categories"
      :newPrice="newPrice"
      :newDescription="newDescription"
      :newTitle="newTitle"
      :newImage="newImage"
      @setCategory="newCategory = $event"
      @setPrice="newPrice = $event"
      @setDescription="newDescription = $event"
      @setTitle="newTitle = $event"
      @setImage="newImage = $event"
      @addProduct="addProduct"
    >
    </CreateInput>
  </section>

  <section class="order-form" v-show="showOrderForm">
    <OrderInput class="order-form__input"
      :userName="userName"
      :userSurname="userSurname"
      :userHome="userHome"
      :userCity="userCity"
      :userStreet="userStreet"
      :userFlat="userFlat"
      :userTel="userTel"
      :idToOrder="idToOrder"
      :products="products"
      @setUName="userName = $event"
      @setUSurname="userSurname = $event"
      @setUHome="userHome = $event"
      @setUFlat="userFlat = $event"
      @setUCity="userCity = $event"
      @setUStreet="userStreet = $event"
      @setUTel="userTel = $event"
      @setIdToOrder="idToOrder = $event"
      @submitOrder="submitOrder"
      >      
    </OrderInput>
    <div 
      class="order-form__choosed-product" 
      v-if="productToOrder !== undefined">
    </div>
  </section>

  <h1 class="products-list__heading">{{ filteredName }}</h1>
  <ul class="products-list">
    <li class="products-list__item" v-for="product in filteredProducts">
      <ProductCard 
        :product="product"
        @orderProduct="orderProduct"></ProductCard>
    </li>
  </ul>
</template>

<style scoped>
.form-shower {
  margin: 5px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: auto auto;
  gap: 7px;
  justify-content: start;
}

.form-shower__checkbox,
.form-shower__label {
  margin: 0;
  padding: 0;
}

.seek-forms__title {
  margin: 0;
  padding: 0;
}

.seek-forms,
.admin-forms {
  margin: 0 0 5px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.products-list__heading {
  padding: 0;
  margin: 0 0 40px;
}

.products-list {
  margin: 10px 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 20px));
  gap: 30px;
}

@media (width < 900px){
  .products-list {
    grid-template-columns: repeat(2, calc(50% - 15px));
  }
}
</style>
