describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/resetdb')
    const user={
      name:'bhim chhetri',
      username:'arian',
      password:'Vchhetri123'
    }
    cy.request( 'POST', 'http://localhost:3003/api/users', user )
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
  describe('When logged in', function(){
    beforeEach(function(){
      cy.get('input:first').type('arian')
      cy.get('input:last').type('Vchhetri123')
      cy.contains('login').click()
    })
    it('user can login',function(){
      cy.contains('Logged in arian')
    })
    it.only('a blog can be created',function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The Script is to execute')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('The Script is to execute')
    })
  })

})