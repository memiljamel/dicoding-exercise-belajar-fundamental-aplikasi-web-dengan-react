// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/login', {
    statusCode: 200,
    body: {
      status: 'success',
      message: 'User logged successfully',
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYnZwQmhUdEN3U1hIeVJYRiIsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzUwMzk0MDc4fQ.KIOoeezwuaKYaxK2kLtJEQw001KPDNC12_hdcxrjSgk',
      },
    },
  }).as('login');

  cy.visit('http://localhost:5173/');

  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);

  cy.intercept('GET', 'https://contact-api.dicoding.dev/v1/users/me', {
    statusCode: 200,
    body: {
      status: 'success',
      message: 'User retrieved',
      data: {
        id: 'user-yj5pc_LARC_AgK61',
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
  }).as('get-me');

  cy.get('button').contains(/^Login$/).click();

  cy.wait('@login');
  cy.wait('@get-me');

  cy.url().should('include', '/');
});
