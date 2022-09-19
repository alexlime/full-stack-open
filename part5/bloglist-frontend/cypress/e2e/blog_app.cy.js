describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // 
  it('Login form is shown', function() {
    cy.contains('login to app')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
    cy.get('button').should('contain', 'login')
  })
})