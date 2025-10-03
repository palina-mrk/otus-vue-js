describe('тестирование формы добавления товара', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#create-new-product').click()
  })

  it('Проверка существования формочки с её элементами', () => {
    cy.get('.form').should('be.visible')
    cy.get('#title').should('exist')
    cy.get('#image').should('exist')
    cy.get('#price').should('exist')
    cy.get('#category').should('exist')
    cy.get('#description').should('exist')
    cy.get('.btn-click').should('exist')
    cy.get('.btn-reset').should('exist')
  })

  it('Показ валидации на форме', () => {
    cy.get('.btn-click').click()
    
    cy.get('#title + .input-error')
      .should('be.visible')
      .and('contain','the product title is required!')
    
    cy.get('#price + .input-error')
      .should('be.visible')
      .and('contain','the product price is required!')

    cy.get('#category + .input-error')
      .should('be.visible')
      .and('contain','the product category is required!')
  })

  it('Показ сообщения о добавлении товара', () => {
    cy.get('#title').type('my product')
    cy.get('#price').type('5')
    cy.get('#category').select(2)

    cy.get('.btn-click').click()
    
    cy.get('.success')
      .should('be.visible')
      .and('contain','The product was successly added!')
  })

  it('Проверка закрытия сообщения о добавлении товара', () => {
    cy.get('#title').type('my product')
    cy.get('#price').type('5')
    cy.get('#category').select(2)

    cy.get('.btn-click').click()
    cy.get('.success-btn').click()

    cy.get('.success')
      .should('not.exist')
  })

  it('Успешное добавление товара', () => {
    cy.get('#title').type('my product')
    cy.get('#price').type('5')
    cy.get('#category').select(2)

    cy.get('.btn-click').click()
    
    cy.get('.product-card')
      .should('have.length', 21)

    cy.get('.product-card').last()
      .should('exist')
      .and('contain','jewelery')
      .and('contain','5')
      .and('contain','my product')
  })

  it('Проверка очистки полей формы', () => {
    cy.get('#title').type('xxx')
    cy.get('#image').type('xxx')
    cy.get('#price').type('111')
    cy.get('#category').select(2)
    cy.get('#description').type('www')
    cy.get('.btn-reset').click()

    cy.get('#title').should('be.empty')
    cy.get('#image').should('be.empty')
    cy.get('#price').should('be.empty')
    cy.get('#category').should('be.not.selected')
    cy.get('#description').should('be.empty')
  })

  it('Проверка исчезновения ошибки при изменении значения', () => {
    cy.get('#price').type('-111')

    cy.get('.btn-click').click()

    cy.get('#title').type('x')
    cy.get('#price').type('22')
  
    cy.get('#title + .input-error')
      .should('not.exist')
    
    cy.get('#price + .input-error')
      .should('not.exist')
  })

  it('Формочка закрывается, когда убираем галочку', () => {
    cy.get('#create-new-product').click()
    cy.get('.form').should('not.be.visible')
  })
})
