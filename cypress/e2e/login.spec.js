import loginPage from "../../page/loginPage";

describe('Login Practice', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Positive Scenarios', () => {
    it('TC_Login_001 - Login successfuly as Admin and Student', () => {
      loginPage.loginAs('admin', 'Student');
      cy.url().should('contain', '/angularpractice/shop');
    });

    it('TC_Login_002 - Login successfuly as Admin and Teacher', () => {
      loginPage.loginAs('admin', 'Teacher');
      cy.url().should('contain', '/angularpractice/shop');
    });

    it('TC_Login_003 - Login successfuly as Admin and Consultant', () => {
      loginPage.loginAs('admin', 'Consultant');
      cy.url().should('contain', '/angularpractice/shop');
    });

    it('TC_Login_004 - Login successfuly as User and Student', () => {
      loginPage.loginAs('user', 'Student');
      cy.url().should('contain', '/angularpractice/shop');
    });

    it('TC_Login_005 - Login successfuly as User and Teacher', () => {
      loginPage.loginAs('user', 'Teacher');
      cy.url().should('contain', '/angularpractice/shop');
    });

    it('TC_Login_006 - Login successfuly as User and Consultant', () => {
      loginPage.loginAs('user', 'Consultant');
      cy.url().should('contain', '/angularpractice/shop');
    });
  });

  describe('Negative Scenarios', () => {
    it('TC_Login_007 - Missing required fields', () => {
      cy.get('#signInBtn').click();
      cy.get('.alert-danger').should('be.visible').and('contain', 'Empty username/password.');
    });

    //Flaky test
    it('TC_Login_008 - Missing check the terms', () => {
      cy.get('#username').type('rahulshettyacademy');
      cy.get('#password').type('learning');

      cy.get('input[value="admin"]').click();
      cy.get('select.form-control').select('Teacher');

      cy.get('#signInBtn').click();

      cy.get('.alert-danger')
        .should('be.visible')
        .and('contain', 'Empty terms');

      cy.url().should('not.contain', '/angularpractice/shop');
    });

    it('TC_Login_009 - Login with username and password longer than 255 characters', () => {
      const longText = 'a'.repeat(256);

      cy.get('#username').type(longText);
      cy.get('#password').type(longText);

      cy.get('input[value="admin"]').click();
      cy.get('select.form-control').select('Teacher');

      cy.get('#terms').check();
      cy.get('#signInBtn').click();

      cy.get('.alert-danger')
        .should('be.visible')
        .and('contain', 'Incorrect username/password.');

      cy.url().should('not.contain', '/angularpractice/shop');
    });
  });
});