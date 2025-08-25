import { ref, computed, reactive } from 'vue';

export const privateInfo = reactive({
  name: '',
  surname: '',
  city: '',
  street: '',
  house: 0,
  flat: 0,
  tel: '',
  email: '',
  card: '',
});

export const isFilled = computed(() => {
  if(privateInfo.house == 0 || privateInfo.flat == 0)
    return false;
  return Boolean(
    privateInfo.name.length > 0 &&
    privateInfo.surname.length > 0 &&
    privateInfo.city.length > 0 &&
    privateInfo.street.length > 0 &&
    privateInfo.tel.length > 0 &&
    privateInfo.email.length > 0 &&
    privateInfo.card.length > 0
  );
})

export function clearPrivateInfo() {
  privateInfo.name = '';
  privateInfo.surname = '';
  privateInfo.city = '';
  privateInfo.street = '';
  privateInfo.house = 0;
  privateInfo.flat = 0;
  privateInfo.tel = '';
  privateInfo.email = '';
  privateInfo.card = '';
}

export const logInfo = reactive({
  isAdmin: false,
  login: '',
  currentPassword: '',
  rightPassword: '1111',
});

export const passwordIsValid = computed(
  () => logInfo.currentPassword == logInfo.rightPassword);

export function clearLogInfo() {
  logInfo.isAdmin = false;
  logInfo.isAutorized = false;
  logInfo.login = '';
  logInfo.currentPassword = '';
  logInfo.rightPassword = 'password';
}

export const isAutorized = computed (() => Boolean(
    (logInfo.currentPassword == logInfo.rightPassword) &&
    (logInfo.login.length > 0)
));