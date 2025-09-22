<template>
  <ul class="main-nav__list">
    <li class="main-nav__item">
      <router-link
        class="main-nav__link"
        :to="{name: 'home'}"
      >home</router-link>
    </li>
    <li class="main-nav__item">
      <router-link
        class="main-nav__link"
        :to="{name: 'basket'}"
      >basket</router-link>
    </li>
    
  </ul>
</template>

<script setup>
const width = defineProps(["width"]);
</script>

<style lang="scss" scoped>
.main-nav__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px 20px;
  flex-wrap: wrap;
  align-items: center;
}

.main-nav__link {
  color: wheat;
  text-decoration: none;
  text-transform: capitalize;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
}

</style>