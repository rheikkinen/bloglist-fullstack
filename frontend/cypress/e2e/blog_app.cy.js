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
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.contains('Logged in as testuser')
    })

    it('fails with incorrect password', () => {
      cy.login({ username: 'testuser', password: 'wrong_password' })
      cy.contains('Invalid username or password')
      // The login form should still be visible
      cy.get('input[placeholder="Username"]')
      cy.get('input[placeholder="Password"]')
    })

    it('fails with incorrect username', () => {
      cy.login({ username: 'wrong_username', password: 'testpassword' })
      cy.contains('Invalid username or password')
      // The login form should still be visible
      cy.get('input[placeholder="Username"]')
      cy.get('input[placeholder="Password"]')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('a blog can be created', () => {
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'testblog.com' })
      cy.contains('Test Blog by Test Author')
    })

    it('a blog can be liked', () => {
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'testblog.com' })
      cy.contains('Test Blog by Test Author')
      cy.contains('Show details').click()
      cy.contains('0 likes')
      cy.get('button').contains('Like').click()
      cy.contains('1 likes')
    })
  })
})
