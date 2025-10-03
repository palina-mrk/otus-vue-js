import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProductInput from '../../subcomponents/ProductInput.vue'

const mockData = () => ({
  newProduct: {
    title: undefined,
    image: undefined,
    price: undefined,
    category: undefined,
    description: undefined,
  },
  showCard: true,
  error: {
    title: undefined,
    price: undefined,
    category: undefined,
  },
  success: false,
});

const mockMethods = () => ({
  buttonReset: vi.fn(),
  formValidate: vi.fn(),
  buttonClick: vi.fn(),
})

describe('ProductInput.vue', () => {
  // Тест: проверяет, что форма рендерится со всеми полями
  it('рендерит форму со всеми полями', () => {
    const wrapper = mount(ProductInput,
      {
        data: mockData,
        methods: mockMethods,
      }
    )
    // Проверяем наличие всех полей формы по data-test атрибутам
    expect(wrapper.find('#title').exists()).toBe(true)
    expect(wrapper.find('#image').exists()).toBe(true)
    expect(wrapper.find('#price').exists()).toBe(true)
    expect(wrapper.find('#category').exists()).toBe(true)
    expect(wrapper.find('#description').exists()).toBe(true)
    expect(wrapper.find('.btn-click').exists()).toBe(true)
    expect(wrapper.find('.btn-reset').exists()).toBe(true)

    if(wrapper)
      wrapper.unmount();
  })

  // Тест: проверяет отображение ошибок валидации
  it('отображает ошибки валидации', async () => {
    // Подменяем data с ошибками
    const wrapper = mount(ProductInput,
      {
        data: () => {
          const errorMockData = mockData();
          errorMockData.error.title = 'the product title is required!';
          errorMockData.error.price = 'the product price is required!';
          errorMockData.error.category = 'the product category is required!';
          return errorMockData;
        },
        methods: mockMethods,
      }
    )

    // Проверяем, что ошибки отображаются и содержат правильный текст
    expect(wrapper.find('#title + .input-error').exists()).toBe(true)
    expect(wrapper.find('#title + .input-error').text()).toBe('the product title is required!')
    expect(wrapper.find('#price + .input-error').exists()).toBe(true)
    expect(wrapper.find('#price + .input-error').text()).toBe('the product price is required!')
    expect(wrapper.find('#category + .input-error').exists()).toBe(true)
    expect(wrapper.find('#category + .input-error').text()).toBe('the product category is required!')

    if(wrapper)
      wrapper.unmount();
  })

  // Тест: проверяет, что ошибки не отображаются, когда их нет
  it('не отображает ошибки, когда их нет', () => {
    const wrapper = mount(ProductInput,
      {
        data: mockData,
        methods: mockMethods,
      }
    )
    
    // Проверяем отсутствие элементов с ошибками
    expect(wrapper.find('input-error').exists()).toBe(false)

    if(wrapper)
      wrapper.unmount();
  })

  // Тест: проверяет отображение сообщения об успешном добавлении товара
  it('отображает сообщение об успешном добавлении товара', () => {
    // Подменяем data с заполненными полями
    const wrapper = mount(ProductInput,
      {
        data: () => {
          const successMockData = mockData();
          successMockData.success = true;
          return successMockData;
        },
        methods: mockMethods,
      }
    )

    const successMessage = wrapper.find('.success')
    // Проверяем наличие и содержание сообщения
    expect(successMessage.exists()).toBe(true)
    expect(successMessage.text()).toContain('The product was successly added!')
  
    if(wrapper)
      wrapper.unmount();
  })

  // // Тест: проверяет отсутствие сообщения об успехе
  it('проверяет отсутствие сообщения об успехе', () => {
    const wrapper = mount(ProductInput,
      {
        data: mockData,
        methods: mockMethods,
      }
    )
    
    const successMessage = wrapper.find('.success')
    // Проверяем наличие и содержание сообщения
    expect(successMessage.exists()).toBe(false)
  
    if(wrapper)
      wrapper.unmount();
  })

  // // Тест: проверяет синхронизацию данных формы
  it('синхронизирует данные формы с миксином', async () => {
    let formData = null
    
    const wrapper = mount(ProductInput,
      {
        data: mockData,
        data: () => {
          const initMockData = mockData();
          formData = initMockData;
          return initMockData;
        },
        methods: mockMethods,
      }
    )
    
    // Устанавливаем значения в поля ввода
    const titleInput = wrapper.find('#title')
    await titleInput.setValue('test product')

    const priceInput = wrapper.find('#price')
    await priceInput.setValue(15)

    // Проверяем, что значения синхронизировались с объектом формы
    expect(formData.newProduct.title).toBe('test product')
    expect(formData.newProduct.price).toBe(15)
  })
})