import { describe, it, expect, beforeEach, vi } from 'vitest'

import { productInputMixin } from '../../../mixins/productInput.js'

console.log(productInputMixin);

describe('Проверка функции валидации formValidate()', () => {
  let data;
  beforeEach (() => {
    data = productInputMixin.data();
    data.buttonClick = productInputMixin.methods.buttonClick;
    data.formValidate = productInputMixin.methods.formValidate;
    data.buttonReset = productInputMixin.methods.buttonReset;
  })
  
  it('При создании формы объекты товара и ошибок содержат пустые поля', () => {
    Object.keys(data.newProduct).forEach((key) => 
      expect(data.newProduct[key]).toBe(undefined));
    Object.keys(data.error).forEach((key) => 
      expect(data.error[key]).toBe(undefined));
  })

  it('При пустых полях formValidate возвращает false', () => {
    expect(data.formValidate()).toBe(false);
  })
  
  it('При правильно заполненных полях formValidate возвращает true', () => {
    Object.keys(data.newProduct).forEach((key) => 
      data.newProduct[key] = '11')
    
    expect(data.formValidate()).toBe(true);
  })
  
  it('При правильно заполненных полях formValidate оставляет ошибки undefined', () => {
    Object.keys(data.newProduct).forEach((key) => 
      data.newProduct[key] = '11')
    
    data.formValidate();

    Object.keys(data.error).forEach((key) => 
      expect(data.error[key]).toBe(undefined));
  })

  it('При пустых полях formValidate устанавливает сообщения "...required!" в поля объекта error', () => {
    data.formValidate();
    expect(data.error.title).toContain('required!');
    expect(data.error.price).toContain('required!');
    expect(data.error.category).toContain('required!');
  })

  it('При отрицательном price formValidate устанавливает сообщение "...must be positive!" в поле error.price', () => {
    data.newProduct.price = '-5';
    data.formValidate();
    expect(data.error.price).toContain('must be positive!');
  })

  it('buttonReset() сбрасывает поля newProduct', () => {
    Object.keys(data.newProduct).forEach((key) => 
      data.newProduct[key] = '11')
    Object.keys(data.newProduct).forEach((key) => 
      expect(data.newProduct[key]).not.toBe(undefined));

    data.buttonReset();
    
    Object.keys(data.newProduct).forEach((key) => 
      expect(data.newProduct[key]).toBe(undefined));
  })

  it('buttonReset() сбрасывает поля ошибок', () => {
    data.formValidate();

    Object.keys(data.error).forEach((key) => 
      expect(data.error[key]).not.toBe(undefined));

    data.buttonReset();
    
    Object.keys(data.error).forEach((key) => 
      expect(data.error[key]).toBe(undefined));
  })

  it('При правильно заполненных полях buttonClick() вызывает событие "add-product" с создаваемым объектом', () => {
    Object.keys(data.newProduct).forEach((key) => 
      data.newProduct[key] = '11')
    const expectedProduct = Object.assign(data.newProduct);
    
    Object.keys(data.newProduct).forEach((key) => 
      expect(data.newProduct[key]).toBe('11'));
    Object.keys(expectedProduct).forEach((key) => 
      expect(expectedProduct[key]).toBe('11'));

    data.$emit = vi.fn().mockImplementation((name, value) => {});
    data.buttonReset = vi.fn(() => {});
    data.buttonClick();

    expect(data.$emit).toHaveBeenCalled();
    expect(data.$emit).toHaveBeenCalledWith('add-product', expectedProduct);
  })

  
  it('При неправильно заполненных полях buttonClick() не вызывает событие "add-product"', () => {
    data.$emit = vi.fn().mockImplementation(() => {});
    data.buttonClick();

    expect(data.$emit).not.toHaveBeenCalled();
  })
})