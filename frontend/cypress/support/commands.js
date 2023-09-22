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

Cypress.Commands.add('shouldBeLoggedIn', () => {
  cy.contains('Logged in as')
  cy.window().its('localStorage.loggedUserDetails').should('exist')
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.shouldBeLoggedIn()
  cy.contains('Add a new blog').click()
  cy.get('input[placeholder="Title"]').type(blog.title)
  cy.get('input[placeholder="Author"]').type(blog.author)
  cy.get('input[placeholder="Url"]').type(blog.url)
  cy.get('button').contains('Submit').click()
})
