describe('Blog App', function(){
  beforeEach(function(){
    cy.visit('http://localhost:5173/')
  })

  it('blog front page is opened and has username and password text', function(){
    cy.contains('username')
    cy.contains('password')
  })

  it.only('user can login',function(){
    cy.contains('login').click()
    cy.get('input:first').type('chhetri')
    cy.get('input:last').type('chhetri123')
    cy.get('#submitbutton').click()
    cy.contains('Logged in chhetri')

  })

})