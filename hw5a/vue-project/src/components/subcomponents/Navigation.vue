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
    <li class="main-nav__item">
      <router-link
        class="main-nav__link"
        :to="{name: 'order'}"
      >order</router-link>
    </li>
    <li class="main-nav__item">
      <router-link
        class="main-nav__link"
        :to="{name: 'login'}"
      >log in</router-link>
    </li>
    <li 
      class="main-nav__item" >
      <router-link
        :class="(logInfo.isAdmin && isAutorized ? 'main-nav__link' : 'main-nav__noaccess-link')"
        :to="{name: 'admin'}"
      >create product card</router-link>
    </li>
  </ul>
</template>

<script setup>
const width = defineProps(["width"]);
import { logInfo, isAutorized } from '@/comp-store/user-info';
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
}

.main-nav__noaccess-link {
  color: rgb(160, 145, 118, 0.5);
  text-decoration: none;
  text-transform: capitalize;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: default;
  position: relative;
}

.main-nav__noaccess-link::after {
  content: "please, log in as admin";
  color: rgb(160, 145, 118, 0.5);
  text-decoration: none;
  text-transform: capitalize;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: default;
  position: absolute;
  display: none;
}

.main-nav__noaccess-link::after {
  content: "please, log in as admin";
  color: #213547;
  text-decoration: none;
  text-transform: lowercase;
  font-size: 80%;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: default;
  position: absolute;
  display: none;
  top: 10px;
  right: 10px;
  background-color: wheat;
  border: 1px solid #213547;
  padding: 2px;
  width: 150px;
  text-align: center;
}

.main-nav__noaccess-link:hover::after {
  display: flex;
  justify-content: center;
}
</style>