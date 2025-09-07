import { describe, it, expect, exists } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createApp, ref } from 'vue'
import App from '../../App.vue'
import LoginView from '../LoginView.vue';
import { logInfoStore } from '@/comp-store/user-info';

describe('loginView', () => {
  const app = createApp(App)
  app.use(createPinia())
  const log = logInfoStore();
  const isLoginValid = ref('valid');
  const isPasswordValid = ref('valid');
  const mockLoginResult = ref('');
  function logIn () {
    isPasswordValid.value = log.passwordIsValid ? 'valid' : 'not-valid';
    isLoginValid.value = log.loginIsValid ? 'valid' : 'not-valid';
    
    if(log.isAutorized){
      mockLoginResult.value = 'You logged in succesly!';
    } else if (log.logInfo.login.length == 0) {
      mockLoginResult.value = 'Please, input the login';  
    } else {
      mockLoginResult.value = 'Wrong password!';
    }  
  }
  function logClear () {
    isLoginValid.value = 'valid';
    isPasswordValid.value = 'valid';
    log.clearLogInfo();
  }

  it('all input names are printed', () => {
    const wrapper = mount(LoginView, { props: {
      log,
      isLoginValid,
      isPasswordValid,
      logIn,
      logClear}})
    expect(wrapper.text()).toContain("Your login")
    expect(wrapper.text()).toContain("Your password")
    expect(wrapper.text()).toContain("i am admin")
    expect(wrapper.text()).toContain("log in")
    expect(wrapper.text()).toContain("reset")
  })

  it('all required inputs are existing', () => {
    const wrapper = mount(LoginView, { props: {
      log,
      isLoginValid,
      isPasswordValid,
      logIn,
      logClear}})
    expect(wrapper.find('#login').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    expect(wrapper.find('#admin').exists()).toBe(true);
  })

  it('prints \'Wrong password!\' with password !== \'1111\'', () => {
    const wrapper = mount(LoginView, { props: {
      log,
      isLoginValid,
      isPasswordValid,
      logIn,
      logClear}})
    wrapper.find('#login').setValue('xxx');
    wrapper.find('#password').setValue('xxx');
    logIn();
    expect(mockLoginResult.value).toBe('Wrong password!');
  })

  it('prints \'Please, input the login\' with empty login', () => {
    const wrapper = mount(LoginView, { props: {
      log,
      isLoginValid,
      isPasswordValid,
      logIn,
      logClear}})
    wrapper.find('#login').setValue('');
    logIn();
    expect(mockLoginResult.value).toBe('Please, input the login');
  })

  it('prints \'You logged in succesly!\' with non-empty login and password === \'1111\'', () => {
    const wrapper = mount(LoginView, { props: {
      log,
      isLoginValid,
      isPasswordValid,
      logIn,
      logClear}})
    wrapper.find('#login').setValue('xxx');
    wrapper.find('#password').setValue('1111');
    logIn();
    expect(mockLoginResult.value).toBe('You logged in succesly!');
  })
})
