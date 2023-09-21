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

    it('a blog can be deleted', () => {
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'testblog.com' })
      cy.contains('Test Blog by Test Author')
      cy.contains('Show details').click()
      cy.get('button').contains('Delete blog').click()
      cy.contains('Test Blog by Test Author').should('not.exist')
    })

    it('a delete button is shown only if the user is the creator of the blog', () => {
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'testblog.com' })
      cy.contains('Test Blog by Test Author')
      cy.contains('Show details').click()
      cy.get('button').contains('Delete blog')
      cy.contains('Log out').click()
      // Create another user and log in
      cy.registerUser({ username: 'anotheruser', password: 'testpassword' })
      cy.login({ username: 'anotheruser', password: 'testpassword' })
      cy.contains('Test Blog by Test Author')
      cy.contains('Show details').click()
      cy.get('button').contains('Delete blog').should('not.exist')
    })

    it('the list of blogs is ordered by the number of likes', () => {
      // Create three blogs
      cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'testblog1.com' })
      cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'testblog2.com' })
      cy.createBlog({ title: 'Blog 3', author: 'Author 3', url: 'testblog3.com' })

      // Set aliases and open details for each blog
      cy.contains('Blog 1 by Author 1').parent().parent().parent().as('blog1')
      cy.get('@blog1').contains('Show details').click()
      cy.contains('Blog 2 by Author 2').parent().parent().parent().as('blog2')
      cy.get('@blog2').contains('Show details').click()
      cy.contains('Blog 3 by Author 3').parent().parent().parent().as('blog3')
      cy.get('@blog3').contains('Show details').click()

      // Check that blog 1 is on the top of the table by default
      cy.get('tr').first().contains('Blog 1 by Author 1')

      // Like blog 3 once
      cy.get('@blog3').contains('Like').click()
      // Check that blog 3 is on the top of the table
      cy.get('tr').first().contains('Blog 3 by Author 3')

      // Like blog 2 twice
      cy.get('@blog2').contains('Like').click()
      cy.wait(1000)
      cy.get('@blog2').contains('Like').click()
      // Check that blog 2 is on the top of the table
      cy.get('tr').first().contains('Blog 2 by Author 2')

      // Like blog 1 three times
      cy.get('@blog1').contains('Like').click()
      cy.wait(1000)
      cy.get('@blog1').contains('Like').click()
      cy.wait(1000)
      cy.get('@blog1').contains('Like').click()
      // Check that blog 1 is now on the top of the table
      cy.get('tr').first().contains('Blog 1 by Author 1')

      // Check that the blogs have correct number of likes
      cy.get('@blog1').contains('3 likes')
      cy.get('@blog2').contains('2 likes')
      cy.get('@blog3').contains('1 likes')
    })
  })
})
