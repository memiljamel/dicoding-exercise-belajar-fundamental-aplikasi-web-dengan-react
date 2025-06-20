describe('Register spec', () => {
  it('should display register page correctly', () => {
    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"name" is not allowed to be empty',
        data: {},
      },
    }).as('name-empty');

    cy.visit('http://localhost:5173/register/');

    cy.get('button').contains(/^Register$/).click();

    cy.wait('@name-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"email" is not allowed to be empty',
        data: {},
      },
    }).as('email-empty');

    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('button').contains(/^Register$/).click();

    cy.wait('@email-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email is already use', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email already use',
        data: {},
      },
    }).as('email-already-use');

    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('button').contains(/^Register$/).click();

    cy.wait('@email-already-use');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email already use');
    });
  });

  it('should display alert when password is empty', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"password" is not allowed to be empty',
        data: {},
      },
    }).as('password-empty');

    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('button').contains(/^Register$/).click();

    cy.wait('@password-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when password length lower than 6', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Password must contain at least 6 characters',
        data: {},
      },
    }).as('password-lower');

    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('input[placeholder="Password"]').type('lower');
    cy.get('button').contains(/^Register$/).click();

    cy.wait('@password-lower');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password must contain at least 6 characters');
    });
  });

  it('should display login page when register success', () => {
    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/register', {
      statusCode: 201,
      body: {
        status: 'success',
        message: 'User Created',
      },
    }).as('register');

    cy.visit('http://localhost:5173/register/');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@gmail.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains(/^Register$/).click();

    cy.wait('@register');

    cy.url().should('include', '/');

    cy.get('button').contains(/^Login$/).should('be.visible');
  });
});
