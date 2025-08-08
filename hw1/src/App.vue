<template>
  <div>
    <h1>This is my first project on Vue</h1>
    <h2>very simple digit counter</h2>
    <p>Input some word with digits into it:</p>
    <input type="text" v-model="someWord">
    <p v-if="someWord.length > 0">Length of the word is: {{ someWord.length }}, sum of digits is {{ sumOfDigits(someWord) }}</p>
    <p v-else>Input is empty</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let someWord = ref('')

let sumOfDigits = (str) => {
  let res = 0;
  for(let i = 0; i < str.length; i++)
    res += (Number(str[i]) ? Number(str[i]) : 0);
  return res;
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 20px 30px;
  background-color:  wheat;
  gap: 12px;
}

h1, h2, p {
  max-width: 500px;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 90%;
}

</style>