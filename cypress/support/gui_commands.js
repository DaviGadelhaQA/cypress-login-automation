Cypress.Commands.add('loginAPI', (data) => {
    cy.request({
        method: 'POST',
        url: '/',
        body: data
    }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
    });
});

Cypress.Commands.add('login', (
    user = Cypress.env('username'),
    password = Cypress.env('password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/');
        cy.get('#username').type(user);
        cy.get('#password').type(password, { log: false });
        cy.get('#signInBtn').click();
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/');
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if(cacheSession){
        cy.session(user, login, options)
    }else{
        login()
    }
});