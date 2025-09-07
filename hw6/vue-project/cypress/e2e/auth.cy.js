describe('HomeView Component', () => {
  it('should display the product list correctly', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Products list')
    cy.get('.product-card button').should('contain','add to basket')
    cy.get('.basket-state.basket-info').should('contain','in basket: 0 @ 0 = 0.00')
  })
})

describe('LoginView Component', () => {
  it('should display the auth form correctly', () => {
    cy.visit('/login') 
    cy.get('#login').should('have.attr', 'placeholder', 'login')
    cy.get('#password').should('have.attr', 'placeholder', '1111')
    cy.get('#admin').should('have.attr', 'type', 'checkbox')
    cy.get('[data-test="submit"]').should('contain', 'log in')
    cy.get('[data-test="clear"]').should('contain', 'reset')
  })

  it('should show validation errors for empty login', () => {
    cy.visit('/login') 
    cy.get('[data-test="submit"]').click()
    cy.get('#login').should('have.class', 'not-valid')

    cy.get('#login').type('aaa')
    cy.get('[data-test="submit"]').click()
    cy.get('#login').should('have.class', 'valid')
  })
  
  it('should show validation errors for password !== \'1111\'', () => {
    cy.visit('/login') 
    cy.get('#password').type('aaa')
    cy.get('[data-test="submit"]').click()
    cy.get('#password').should('have.class', 'not-valid')

    cy.get('[data-test="clear"]').click()
    cy.get('#password').should('have.class', 'valid')
  })
  
  it('should clear the fields by button \'reset\'', () => {
    cy.visit('/login') 
    cy.get('#password').type('aaa')
    cy.get('#password').type('1111')
    cy.get('[data-test="clear"]').click()
  })
})