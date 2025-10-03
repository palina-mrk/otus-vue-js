<template>
  <ul class="main-nav__list">
    <li class="main-nav__item">
      <a
        class="main-nav__link"
        @click="$emit('to-home')"
      >home</a>
    </li>
    <li class="main-nav__item">
      <a
        class="main-nav__link"
        @click="$emit('to-basket')"
      >basket</a>
    </li>
    
  </ul>
</template>

<script>
export default {
  emits: ['to-home','to-basket'],
}
</script>

<style lang="scss" scoped>
.main-nav__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: end;
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