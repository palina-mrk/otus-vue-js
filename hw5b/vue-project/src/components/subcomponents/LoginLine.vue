<template>
  <div class="log__line">
    <span v-show='log.isAutorized' class="login__word"> username: {{ log.logInfo.login }}</span>
    <button class="toggle__button"
      @click="logToggle"> {{ log.isAutorized ? 'log out' : 'log in' }} </button>
  </div>
</template>

<script setup>
import { logInfoStore } from '@/comp-store/user-info';
import { useRouter } from 'vue-router';

const log = logInfoStore();
const router = useRouter();
function logToggle() {
  if(log.isAutorized)
    log.clearLogInfo();
  else
    router.push({name: 'login'});
}
</script>

<style lang="scss" scoped>
.log__line {
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  height: 20px;
}

.login__word {
  color: wheat;
  font-style: italic;
  opacity: 0.8;
}

.toggle__button {
  width: 60px;
  height: 18px;
  font-style: italic;
  color: wheat;
  opacity: 0.8;
  background-color: rgb(116, 96, 72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  border: none;
  border-radius: 8px;
}
</style>