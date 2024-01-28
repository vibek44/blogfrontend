//cypress priciple is to test single control flow of the app
describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/resetdb')
    const user1={
      name:'user1',
      username:'arian',
      password:'Vchhetri123'
    }
    const user2={
      name:'user2',
      username:'machaveli',
      password:'machaveli123'
    }
    cy.request( 'POST', 'http://localhost:3003/api/users', user1 )
    cy.request( 'POST', 'http://localhost:3003/api/users', user2 )
    cy.visit( 'http://localhost:5173/' )
  })

  it('login form is shown and has username and password text', function(){

    cy.get('form')
      .should('contain','username')
      .should('contain','password')
      .should('contain','login')
    //cy.contains('username')
    //cy.contains('password')
    //cy.contains('login')
  })

  describe('Login', function(){
    beforeEach(function(){
      cy.get('input:first').type('arian')
      cy.get('input:last').type('Vchhetri123')
      cy.contains('login').click()
    })

    it('succeds with correct credentials', function(){
      cy.contains('Logged in arian')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function(){
      cy.contains('Authorization failed.')
    })

  })


  describe('When logged in', function(){
    beforeEach(function(){
      cy.get('input:first').type('arian')
      cy.get('input:last').type('Vchhetri123')
      cy.contains('login').click()
    })

    it('a blog can be created',function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The Script is to execute')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('By-grisma ritu')
      cy.contains('The Script is to execute')
    })

    it('users can like a blog',  function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The Script is to execute')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like 1')
    })

    it.only('blog creater can delete blog',function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The Script is to execute')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('view').click()
      cy.contains('remove').click()

    })
  })

})