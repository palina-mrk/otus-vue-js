<template>
  <div>
    <label for="name">Your login:</label>
    <input 
      type="text" 
      name="login" 
      placeholder="login"
      :class="isLoginValid"
      v-model="log.logInfo.login"
      id="login">

    <label for="password">Your password:</label>
    <input 
      type="password" 
      name="password" 
      placeholder="1111"
      :class="isPasswordValid"
      v-model="log.logInfo.currentPassword"
      id="password">

    <div class="input-admin">
      <label for="admin">i am admin</label>
      <input  
        type="checkbox" 
        name="admin" 
        v-model="log.logInfo.isAdmin"
        id="admin">
    </div>

    <div class="buttons">
      <button 
        data-test="submit"
        @click="logIn"
      >log in</button>
      <button
        data-test="clear"
        @click="logClear"
      >reset</button>
      </div>
    </div>
</template>

<script setup>
import { logInfoStore } from '@/comp-store/user-info';
import { ref } from 'vue';

const log = logInfoStore();
const isLoginValid = ref('valid');
const isPasswordValid = ref('valid');

function logIn () {
  isPasswordValid.value = log.passwordIsValid ? 'valid' : 'not-valid';
  isLoginValid.value = log.loginIsValid ? 'valid' : 'not-valid';
  
  if(log.isAutorized){
    alert('You logged in succesly!');
  } else if (log.logInfo.login.length == 0) {
    alert('Please, input the login');  
  } else {
    alert('Wrong password!');
  }  
}

function logClear () {
  isLoginValid.value = 'valid';
  isPasswordValid.value = 'valid';
  log.clearLogInfo();
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
}
div {
  display: grid;
  grid-template-columns: 250px 300px;
  gap: 5px 20px;
  align-items: center;
}

input {
  font-size: 16px;
}

label {
  font-size:16px;
}

.buttons {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  grid-column: -1 / -2;
}

button {
  font-size: 12px;
  margin: 0;
  padding: 0 5px;
  width: calc(50% - 3px);
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  border-radius: 5px;
}

.input-admin {
  grid-column: -2 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr 5fr;
}

.not-valid {
  border-color: red;
}

.valid {
  border-color: black;
}
</style>