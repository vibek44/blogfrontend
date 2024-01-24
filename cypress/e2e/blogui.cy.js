describe('Blog App', function(){
  beforeEach(function(){
    cy.visit('http://localhost:5173/')
  })

  it('blog front page is opened and has username and password text', function(){
    cy.contains('username')
    cy.contains('password')
  })

})