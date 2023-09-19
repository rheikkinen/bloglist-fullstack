Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`)
})