<script setup>
import { ref, reactive } from 'vue'
const users = [
  { name: 'Анна',
    cat: {
      name: 'Барсик',
      sex: 'm',
      age: { years: 3, months: 2},
      weight: 6,
      photo: '/src/images/barsik.jpg'}}, 
  { name: 'Мария',
    cat: {
      name: 'Сеня',
      sex: 'f',
      age: { years: 0, months: 10},
      weight: 0.8,
      photo: '/src/images/senya.jpg'}}, 
  { name: 'Петр',
    cat: {
      name: 'Муся',
      sex: 'f',
      age: { years: 1, months: 5},
      weight: 3.5,
      photo: '/src/images/musia.jpg'}}, 
  { name: 'Ирина',
    cat: {
      name: 'Пушок',
      sex: 'm',
      age: { years: 0, months: 2},
      weight: 0.4,
      photo: '/src/images/pushok.jpg'}}];

function ageToString(age) {
  let yearText;
  let monthText;

  if(age.years <= 0)
    yearText = '';
  else if ((age.years >= 10 && age.years <= 20) || (age.years % 10 >= 5) || (age.years % 10 == 0))
    yearText = `${age.years} лет `;
  else if (age.years % 10 == 1) 
    yearText = `${age.years} год `;
  else 
    yearText = `${age.years} года `;
  
  if(age.months <= 0)
    monthText = '';
  if ((age.months >= 10 && age.months <= 20) || (age.months % 10 >= 5) || (age.months % 10 == 0))
    monthText = `${age.months} месяцев`;
  else if (age.years % 10 == 1) 
    monthText = `${age.months} месяц`;
  else 
    monthText = `${age.months} месяца`;

    return (yearText + monthText);
}

function getTextInfo (cat) {
  const info = [];
  info.push(cat.sex == 'm' ? 'Кот' : 'Кошка ' + cat.name);
  info.push('возраст ' + ageToString(cat.age));
  info.push('вес ' + cat.weight + ' кг.');
  return info.join(', ');
}

const isExpand = ref(users.map(() => false));
const isItemColored = ref(users.map(() => false));

const listExpand = ref(true);

const initColor = ref('#213547');
const userColor = ref('#213547');

</script>

<template>
  <div class="all__wrapper">
    <div class="change-bgc__wrapper">
      <span class="change-bgc__text">изменить цвет текста:</span>
      <input class="change-bgc__input" type="color"
      v-model="userColor">
      <span class="change-bgc__text">вернуть по умолчанию:</span>
      <input class="change-bgc__input change-bgc__input--init" type="button" @click="userColor = initColor">
    </div>

    <div class="welcome__wrapper">
      <h1 class="weclome__header">Добро пожаловать в клуб любителей котиков!</h1>
      <button class="members__list-hide" @click="listExpand = !listExpand">{{ listExpand ? 'Скрыть' : 'Показать' }} список участников</button>
      <h2 class="members__title" v-show="listExpand">Наши участники:</h2>
      <ul v-show="listExpand" class="members__list">
        <li class="members__list-item" :class="{'members__list-item--colored': isItemColored[index]}" v-for="(user, index) in users" @click="isExpand[index] = !isExpand[index]" @mouseover="isItemColored[index] = true" @mouseout="isItemColored[index] = false">
          <div class="member-card">
            <h3 class="member-card__name">{{ user.name }}</h3>
            <div v-show="isExpand[index]" class="pet-card">
              <h4 class="pet-card__text">Имя питомца: {{ user.cat.name }}</h4>
              <img v-bind:src="user.cat.photo" width="200" height="auto" style="object-fit: contain" class="pet-card__img" v-bind:alt="user.cat.name" />
              <p class="pet-card__text"> {{ getTextInfo(user.cat) }}</p>
            </div>
          </div>  
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.all__wrapper {
  padding: 5vh 0;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  position: relative;
}

.change-bgc__wrapper {
  position: absolute;
  top: -60px;
  left: 20px;
  height: 30px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 0 7px;
  align-items: center;
  justify-content: stretch;
}
.change-bgc__text {
  color: wheat;
  display: flex;
}

.change-bgc__input {
  background-color: #213547;
  width: 15px;
  height: 20px;
  padding: 0;
  margin: 0;
  border-width: 0;
  display: flex;
}

.change-bgc__input--init {
  border: 2px solid black;
  width: 12px;
  height: 12px;
  margin-left: 1px;
  margin-top: 1px;
}

.welcome__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  color: v-bind('userColor');
}

.welcome__wrapper .members__list-hide {
  color: v-bind('userColor');
}

.weclome__header {
  margin: 0;
}

.members__list-title {
  margin: 0;
}

.members__list-hide {
  margin: 0;
  padding: 10px;
  box-sizing: unset;
  width: calc(40vw + 20px);
  border-radius: 20px;
  border-width: 2px;
}

.members__list {
  list-style-type: none;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.members__list-item {
  width: 40vw;
  padding: 20px;
  margin: 0 auto;
  background-color: #646cffaa;
  border-radius: 20px;
}

.members__list-item--colored {
  background-color: rgb(47, 47, 192);
  color: wheat;
}

.member-card__name {
  margin: 0;
}

.pet-card {
  margin: 0 auto;
  padding: 0;
  display: flex;
  width: 35vw;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.pet-card__text {
  margin: 0;
  width: 100%;
}

.pet-card__img {
  margin: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  border: #42b883aa solid 5px;
}

.members__list-item--colored .pet-card__img {
  border: #28a66daa solid 5px;
}
</style>
