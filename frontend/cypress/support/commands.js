Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`)
})

Cypress.Commands.add('registerUser', (user) => {
  cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user)
})