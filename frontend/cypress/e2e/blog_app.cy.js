describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDatabase()
    cy.registerUser({ username: 'testuser', password: 'testpassword' })
    cy.visit('/')
  })

  it('Login form is shown by default', () => {
    cy.contains('Log in to the Blog List App')
    cy.get('input[placeholder="Username"]')
    cy.get('input[placeholder="Password"]')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[placeholder="Username"]').type('testuser')
      cy.get('input[placeholder="Password"]').type('testpassword')
      cy.get('button').contains('Log in').click()
      cy.contains('Logged in as testuser')
    })

    it('fails with incorrect password', () => {
      cy.get('input[placeholder="Username"]').type('testuser')
      cy.get('input[placeholder="Password"]').type('wrong_password')
      cy.get('button').contains('Log in').click()
      cy.contains('Invalid username or password')
      // The login form should still be visible
      cy.get('input[placeholder="Username"]')
      cy.get('input[placeholder="Password"]')
    })

    it('fails with incorrect username', () => {
      cy.get('input[placeholder="Username"]').type('wrong_username')
      cy.get('input[placeholder="Password"]').type('testpassword')
      cy.get('button').contains('Log in').click()
      cy.contains('Invalid username or password')
      // The login form should still be visible
      cy.get('input[placeholder="Username"]')
      cy.get('input[placeholder="Password"]')
    })
  })
})
