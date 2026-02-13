import { describe, it, expect } from 'vitest'
import { logInfoStore } from '../user-info.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../App.vue'
  
describe('validation functions check', () => {
  const app = createApp(App)
  app.use(createPinia())
  let lgi = logInfoStore();

  it('at first password and login are empty',() => {
    expect(lgi.logInfo.login.length).toBe(0);
    expect(lgi.logInfo.currentPassword.length).toBe(0);
  })

  it('only non-empty login is valid', () => {
    lgi.logInfo.login = 'assad';
    expect(lgi.loginIsValid).toBe(true);
    lgi.logInfo.login = '';
    expect(lgi.loginIsValid).toBe(false);
  })

  it('only password === \'1111\' is valid', () => {
    lgi.logInfo.currentPassword = 'assad';
    expect(lgi.passwordIsValid).toBe(false);
    lgi.logInfo.currentPassword = '1111';
    expect(lgi.passwordIsValid).toBe(true);
  })
})


describe('autorization check', () => {
  const app = createApp(App)
  app.use(createPinia())
  let lgi = logInfoStore();

  it('password and login are empty, then not autorized',() => {
    expect(lgi.logInfo.login.length).toBe(0);
    expect(lgi.logInfo.currentPassword.length).toBe(0);
    expect(lgi.isAutorized).toBe(false);
  })

  it('autorized with non-empty login, password === \'1111\'', () => {
    lgi.logInfo.login = 'assad';
    lgi.logInfo.currentPassword = '1111';
    expect(lgi.isAutorized).toBe(true);
  })

  it('not autorized with empty login, password === \'1111\'', () => {
    lgi.logInfo.login = '';
    lgi.logInfo.currentPassword = '1111';
    expect(lgi.isAutorized).toBe(false);
  })

  it('not autorized with non-empty login, password !== \'1111\'', () => {
    lgi.logInfo.login = 'assad';
    lgi.logInfo.currentPassword = 'aaaa';
    expect(lgi.isAutorized).toBe(false);
  })
})