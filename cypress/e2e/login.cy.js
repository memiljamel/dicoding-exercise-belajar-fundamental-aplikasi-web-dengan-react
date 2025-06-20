describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"email" is not allowed to be empty',
        data: {},
      },
    }).as('email-empty');

    cy.visit('http://localhost:5173/');

    cy.get('button').contains(/^Login$/).click();

    cy.wait('@email-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"password" is not allowed to be empty',
        data: {},
      },
    }).as('password-empty');

    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('button').contains(/^Login$/).click();

    cy.wait('@password-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Password is wrong',
        data: {},
      },
    }).as('password-wrong');

    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrong-password');
    cy.get('button').contains(/^Login$/).click();

    cy.wait('@password-wrong');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password is wrong');
    });
  });

  it('should display home page when username and password are correct', () => {
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

    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('input[placeholder="Password"]').type('password');

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

    cy.get('button').contains('John Doe').should('be.visible');
  });
});
