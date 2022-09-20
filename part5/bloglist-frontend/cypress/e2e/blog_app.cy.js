describe('Blog app', function() {
  beforeEach(function() {
    const user1 = {
      username: 'alex',
      name: 'alex lime',
      password: 'secret'
    }
    const user2 = {
      username: 'bobby',
      name: 'bobby banana',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    cy.visit('http://localhost:3000')
  })

  // 
  it('Login form is shown', function() {
    cy.contains('login to app')
    cy.get('form')
      .should('contain', 'username')
      .should('contain','password')
      .find('button').should('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alex')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('alex lime logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ale')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid user or password')
        .get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        .get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'alex lime logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'alex', password: 'secret' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('alex')
      cy.get('#url').type('cypress.io')
      
      cy.get('#submit-blog').click()
      cy.contains('A blog created by cypress alex')
    })

    it('User can like a blog', function() {
      cy.createBlog({ 
        title: 'Cypress test note 1', 
        author: 'alex', 
        url: 'cypress1.io' 
      })
      cy.contains('Cypress test note 1')
        .get('button').contains('show').click()
        .parent().get('span').contains('likes: 0')
        .get('button').contains('like').click()
        .parent().get('span').contains('likes: 1')
    })

    it('User who created a blog can delete it and others cannot', function() {
      cy.createBlog({ 
        title: 'Cypress test note 1', 
        author: 'alex', 
        url: 'cypress1.io' 
      })

      /* alex created a blog; now log in bobby and 
      the "remove" button should not exist */ 
      cy.visit('http://localhost:3000') 
      cy.login({ username: 'bobby', password: 'secret' })
      cy.contains('Cypress test note 1')
        .get('button').contains('show').click()
        .parent().get('button').contains('remove').should('not.exist')

      /* Now login alex and try to remove his own blog */
      cy.visit('http://localhost:3000')
      cy.login({ username: 'alex', password: 'secret' })
      cy.contains('Cypress test note 1')
        .get('button').contains('show').click()
        .parent().get('button').contains('remove').click()

      cy.get('.success')
        .should('contain', 'Blog successfully deleted!')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.should('not.contain', 'Cypress test note 1')

    })
    
    it('The blogs are ordered according to likes', function() {
      const delayMs = 300
      cy.createBlog({ title: 'Most likes', author: 'alex', url: 'cypress1.io' })
      cy.createBlog({ title: 'Second most likes', author: 'alex', url: 'cypress2.io' })
      cy.createBlog({ title: 'Third most likes', author: 'alex', url: 'cypress3.io' })

      cy.contains('Most likes')
        .get('button').contains('show').click()

      cy.contains('Second most likes')
        .get('button').contains('show').click()

      cy.contains('Third most likes')
        .get('button').contains('show').click()

      cy.contains('Third most likes')
        .find('button').contains('like')
        .wait(delayMs).click()


      cy.contains('Second most likes')
        .find('button').contains('like')
        .wait(delayMs).click()
        .wait(delayMs).click()

      cy.contains('Most likes')
        .find('button').contains('like')
        .wait(delayMs).click()
        .wait(delayMs).click()
        .wait(delayMs).click()

      cy.wait(delayMs*3) // wait for app to update likes
      cy.get('.blog').eq(0).should('contain', 'Most likes')
      cy.get('.blog').eq(1).should('contain', 'Second most likes')
      cy.get('.blog').eq(2).should('contain', 'Third most likes')
    })
  })

})