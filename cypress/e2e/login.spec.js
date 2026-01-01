import loginPage from "../page/loginPage";

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
      loginPage.submit();
      loginPage.handleAlert('Empty username/password.');
    });

    //Flaky test
    it('TC_Login_008 - Missing check the terms', () => {
      loginPage.fillCredentials();

      loginPage.selectProfile('admin');
      loginPage.selectRole('Teacher');

      loginPage.submit();

      loginPage.handleAlert('Empty terms')

      cy.url().should('not.contain', '/angularpractice/shop');
    });

    it('TC_Login_009 - Login with username and password longer than 255 characters', () => {
      const longText = 'a'.repeat(256);

      cy.get('#username').type(longText);
      cy.get('#password').type(longText);

      loginPage.selectProfile('admin');
      loginPage.selectRole('Teacher');

      loginPage.acceptTerms();
      loginPage.submit();

      loginPage.handleAlert("Incorrect username/password.");
        
      cy.url().should('not.contain', '/angularpractice/shop');
    });
  });
});