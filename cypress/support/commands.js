Cypress.Commands.add('loginAPI', (data) => {
    cy.request({
        method: 'POST',
        url: '/',
        body: data
    }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
    });
});