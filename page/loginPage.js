class LoginPage {
    fillCredentials() {
        cy.get('#username').type(Cypress.env('username'));
        cy.get('#password').type(Cypress.env('password'));
    }

    selectProfile(profile) {
        cy.get(`input[value="${profile}"]`).click();

        if (profile === 'user') {
            this.handleUserModal();
        }
    }

    handleUserModal() {
        cy.get('#myModal', { timeout: 10000 })
            .should('be.visible')
            .then(() => {
                cy.get('#myModal').invoke('remove');
                cy.get('.modal-backdrop').invoke('remove');
            });
    }

    selectRole(role) {
        cy.get('select.form-control')
            .should('be.visible')
            .select(role);
    }

    acceptTerms() {
        cy.get('#terms').check();
    }

    submit() {
        cy.get('#signInBtn').click();
    }

    loginAs(profile, role) {
        this.fillCredentials();
        this.selectProfile(profile);
        this.selectRole(role);
        this.acceptTerms();
        this.submit();
    }
}

export default new LoginPage();
