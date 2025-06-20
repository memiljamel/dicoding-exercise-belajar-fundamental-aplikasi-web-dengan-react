describe('Add spec', () => {
  it('should display add page correctly', () => {
    cy.login('john.doe@gmail.com', 'password');

    cy.visit('http://localhost:5173/add');

    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Tag"]').should('be.visible');
    cy.get('button').contains(/^Add$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.login('john.doe@gmail.com', 'password');

    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/contacts', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"name" is not allowed to be empty',
        data: {},
      },
    }).as('name-empty');

    cy.visit('http://localhost:5173/add');

    cy.get('button').contains(/^Add$/).click();

    cy.wait('@name-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when tag is empty', () => {
    cy.login('john.doe@gmail.com', 'password');

    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/contacts', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"tag" is not allowed to be empty',
        data: {},
      },
    }).as('tag-empty');

    cy.visit('http://localhost:5173/add');

    cy.get('input[placeholder="Name"]').type('Jane Doe');
    cy.get('button').contains(/^Add$/).click();

    cy.wait('@tag-empty');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"tag" is not allowed to be empty');
    });
  });

  it('should display home page when name and tag are correct', () => {
    cy.login('john.doe@gmail.com', 'password');

    cy.intercept('POST', 'https://contact-api.dicoding.dev/v1/contacts', {
      statusCode: 201,
      body: {
        status: 'success',
        message: 'Contact created',
        data: {
          id: 'contact-yj5pc_LARC_AgK61',
          name: 'John Doe',
          tag: 'johndoe',
          phoneNumber: '081234567890',
          email: 'john@example.com',
          imageUrl: 'https://example.com/image.png',
        },
      },
    }).as('create-contact');

    cy.visit('http://localhost:5173/add');

    cy.get('input[placeholder="Name"]').type('John Doe');
    cy.get('input[placeholder="Tag"]').type('johndoe');
    cy.get('button').contains(/^Add$/).click();

    cy.wait('@create-contact');

    cy.url().should('include', '/');

    cy.intercept('GET', 'https://contact-api.dicoding.dev/v1/contacts', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Contacts retrieved',
        data: [
          {
            id: 'contact-yj5pc_LARC_AgK61',
            name: 'John Doe',
            tag: 'johndoe',
            phoneNumber: '081234567890',
            email: 'john@example.com',
            imageUrl: 'https://example.com/image.png',
          },
        ],
      },
    }).as('get-contacts');

    cy.wait('@get-contacts');

    cy.get('h3').contains(/^John Doe$/).should('be.visible');
    cy.get('p').contains(/^@johndoe$/).should('be.visible');
  });
});
