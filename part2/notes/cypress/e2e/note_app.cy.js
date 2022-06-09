describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'matt',
      username: 'mtaylor',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened and logged in through', function() {
    cy.contains('login').click()
    cy.get('#username').type('mtaylor')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('matt logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mtaylor', password: 'password' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'first note',
          important: false
        })

        cy.createNote({
          content: 'second note',
          important: false
        })

        cy.createNote({
          content: 'third note',
          important: false
        })
      })

      it('one of these can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mtaylor')
    cy.get('#password').type('passwords')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
})