Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`)
})

Cypress.Commands.add('registerUser', (user) => {
  cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user)
})

Cypress.Commands.add('login', (credentials) => {
  cy.visit('/')
  cy.get('input[placeholder="Username"]').type(credentials.username)
  cy.get('input[placeholder="Password"]').type(credentials.password)
  cy.get('button').contains('Log in').click()
})
