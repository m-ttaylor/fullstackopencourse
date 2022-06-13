/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Blogg app', () => {
  beforeEach(() => {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'matt',
      username: 'mtaylor',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    const otherUser = {
      name: 'not matt',
      username: 'notmatt',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Log in to application')
      cy.get('#username').type('mtaylor')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('matt logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Log in to application')
      cy.get('#username').type('mtaylor')
      cy.get('#password').type('wron')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'mtaylor', password: 'password' })
    })

    it('A blog can be created', () => {
      cy.contains('create blog').click()
      cy.get('#titleInput').type('cypress blog')
      cy.get('#authorInput').type('Cypriot Author')
      cy.get('#urlInput').type('dfdsgdfgfdfad')
      cy.get('#createBlog').click()
      cy.contains('new blog cypress blog by Cypriot Author added')
      cy.get('.titleAndAuthor')
        .should('contain', 'cypress blog Cypriot Author')
        .and('contain', 'view')
    })

    describe('and several blogs exists', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'blog 1', author: 'author 1', url: 'http://url1.com' })
        cy.createBlog({ title: 'blog 2', author: 'author 2', url: 'http://url2.com' })
        cy.createBlog({ title: 'blog 3', author: 'author 3', url: 'http://url3.com' })
      })

      it('the blog can be liked', () => {
        // Show details
        cy.contains('blog 1').find('button').click()
        cy.contains('blog 1').parent().as('blogDiv')
        cy.get('@blogDiv').contains('likes: 0').find('button').click()
        cy.get('@blogDiv').should('contain', 'likes: 1')
      })

      it('the user who created the blog can delete it', () => {
        cy.contains('blog 1').find('button').click()
        cy.contains('blog 1').parent().contains('remove').click()
        cy.get('html').should('not.contain', 'blog 1')
      })

      it.only('blogs appear in order from most to least likes', () => {
        cy.contains('blog 1').find('button').click()
        cy.contains('blog 1').parent().contains('likes: 0').find('button').as('likeButton')
        cy.get('@likeButton').click()
        cy.get('@likeButton').click()
        cy.get('@likeButton').click()
        cy.get('.blog').eq(0).should('contain', 'blog 1')

      })
    })

    describe('and a blog by another user exists', () => {
      beforeEach(() => {
        cy.login({ username: 'notmatt', password: 'password' })
        cy.createBlog({ title: 'blog 2', author: 'author 2', url: 'http://url2.com' })
        cy.login({ username: 'mtaylor', password: 'password' })
      })

      it('a user who did not create a blog cannot delete it', () => {
        cy.contains('matt logged in')
        cy.contains('blog 2').find('button').click()
        cy.contains('blog 2').parent().contains('remove').should('have.css', 'display', 'none')
      })
    })
  })

})