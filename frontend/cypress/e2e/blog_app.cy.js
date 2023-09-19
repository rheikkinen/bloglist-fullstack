describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.visit('/')
  })

  it('Login form is shown by default', () => {
    cy.contains('Log in to the Blog List App')
    cy.get('input[placeholder="Username"]')
    cy.get('input[placeholder="Password"]')
  })
})