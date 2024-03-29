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
  //seprate describe within describe block
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

  //seprate describe within describe block

  describe('When logged in', function(){
    beforeEach(function(){
      cy.get('input:first').type('arian')
      cy.get('input:last').type('Vchhetri123')
      cy.contains('login').click()
    })

    it('a blog can be created',function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The blog with second in likes')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('By-grisma ritu')
      cy.contains('The Script is to execute')
    })

    it('users can like a blog',  function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The student drinking lyrics')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like 1')
      cy.contains('like').click()
      cy.contains('like 2')

    })

    it('blog creater can delete blog',function(){
      cy.contains('Create newblog').click()
      cy.get('#title').type('The Script is to execute')
      cy.get('#author').type('grisma ritu')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.contains('view').click()
      cy.contains('remove').click()

    })
  })

  //seprate describe within describe block

  describe('test to ensure only the creator can see remove button and not anyone else', function(){
    beforeEach(function(){
      cy.get('input:first').type('arian')
      cy.get('input:last').type('Vchhetri123')
      cy.contains('login').click()
      cy.contains('Create newblog').click()
      cy.get('#title').type('The blog with second most likes')
      cy.get('#author').type('green portand')
      cy.get('#url').type('https://docs.cypress.io/api/commands/eq')
      cy.get('#blogsubmit').click()
    })

    it('only creator can see delete button', function(){
      cy.contains('view').click()
      cy.contains('remove')
    })

    it('blog non-creator cant see  delete button', function(){
      cy.contains('logout').click()
      cy.get('input:first').type('machaveli')
      cy.get('input:last').type('machaveli123')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.get('.blogdetail').should('not.contain','remove')
    })

    it.only('test to ensure blogs are ordered according to likes',  function(){
      cy.contains('logout').click()
      cy.get('input:first').type('machaveli')
      cy.get('input:last').type('machaveli123')
      cy.contains('login').click()
      cy.contains('Create newblog').click()
      cy.get('#title').type('unwavering earth')
      cy.get('#author').type('grisma rituwer')
      cy.get('#url').type('https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test')
      cy.get('#blogsubmit').click()
      cy.get('.viewhidebutton').eq(1).click()
      cy.get('.viewhidebutton').eq(0).click()
      cy.get('.likebutton').eq(1).click()
      cy.get('.blogtitle').eq(0).contains('unwavering earth')
      cy.get('.blogtitle').eq(1)
        .should('contain', 'The blog with second most likes')
        .and('have.class', 'blogtitle')
    })
  })

})
//cy.get('form').within(() => {
// cy.get('input').type('Pamela') // Only yield inputs within form
// cy.get('textarea').type('is a developer') // Only yield textareas within form
//})
// https://docs.cypress.io/api/commands/get