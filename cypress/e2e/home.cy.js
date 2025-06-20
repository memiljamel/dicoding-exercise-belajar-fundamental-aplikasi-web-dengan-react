describe('Home spec', () => {
  it('should display home page correctly', () => {
    cy.login('john.doe@gmail.com', 'password');

    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Search by name"]').should('be.visible');
    cy.get('h2').contains(/^Contact List$/).should('be.visible');
  });

  it('should display contact list correctly', () => {
    cy.login('john.doe@gmail.com', 'password');

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
          {
            id: 'contact-yj5pc_LARC_AgK62',
            name: 'Jane Doe',
            tag: 'janedoe',
            phoneNumber: '081234567890',
            email: 'jane@example.com',
            imageUrl: 'https://example.com/image.png',
          },
        ],
      },
    }).as('get-contacts');

    cy.visit('http://localhost:5173/');

    cy.wait('@get-contacts');

    cy.get('div[class="contact-item"]').should('have.length', 2);
    cy.get('h3').contains(/^John Doe$/).should('be.visible');
    cy.get('p').contains(/^@johndoe$/).should('be.visible');
    cy.get('h3').contains(/^Jane Doe$/).should('be.visible');
    cy.get('p').contains(/^@janedoe$/).should('be.visible');
  });

  it('should filter contacts when keyword entered', () => {
    cy.login('john.doe@gmail.com', 'password');

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
          {
            id: 'contact-yj5pc_LARC_AgK62',
            name: 'Jane Doe',
            tag: 'janedoe',
            phoneNumber: '081234567890',
            email: 'jane@example.com',
            imageUrl: 'https://example.com/image.png',
          },
        ],
      },
    }).as('get-contacts');

    cy.visit('http://localhost:5173/');

    cy.wait('@get-contacts');

    cy.get('input[placeholder="Search by name"]').type('Jane Doe');

    cy.url().should('include', '/?keyword=Jane+Doe');

    cy.get('div[class="contact-item"]').should('have.length', 1);
    cy.get('h3').contains(/^Jane Doe$/).should('be.visible');
    cy.get('p').contains(/^@janedoe$/).should('be.visible');
  });

  it('should show empty message when no contact matches search', () => {
    cy.login('john.doe@gmail.com', 'password');

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
          {
            id: 'contact-yj5pc_LARC_AgK62',
            name: 'Jane Doe',
            tag: 'janedoe',
            phoneNumber: '081234567890',
            email: 'jane@example.com',
            imageUrl: 'https://example.com/image.png',
          },
        ],
      },
    }).as('get-contacts');

    cy.visit('http://localhost:5173/');

    cy.wait('@get-contacts');

    cy.get('input[placeholder="Search by name"]').type('not exist');

    cy.url().should('include', '/?keyword=not+exist');

    cy.get('div[class="contact-item"]').should('not.exist');
  });

  it('should delete a contact when delete button clicked', () => {
    cy.login('john.doe@gmail.com', 'password');

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
          {
            id: 'contact-yj5pc_LARC_AgK62',
            name: 'Jane Doe',
            tag: 'janedoe',
            phoneNumber: '081234567890',
            email: 'jane@example.com',
            imageUrl: 'https://example.com/image.png',
          },
        ],
      },
    }).as('get-contacts');

    cy.visit('http://localhost:5173/');

    cy.wait('@get-contacts');

    cy.get('div[class="contact-item"]').should('have.length', 2);
    cy.get('h3').contains(/^John Doe$/).should('be.visible');
    cy.get('p').contains(/^@johndoe$/).should('be.visible');

    cy.intercept('DELETE', 'https://contact-api.dicoding.dev/v1/contacts/contact-yj5pc_LARC_AgK61', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Contact deleted',
      },
    }).as('delete-contact');

    cy.get('button[class="contact-item__delete"]').first().click();

    cy.wait('@delete-contact');

    cy.get('div[class="contact-item"]').should('have.length', 1);
    cy.get('h3').contains(/^John Doe$/).should('not.exist');
    cy.get('p').contains(/^@johndoe$/).should('not.exist');
  });
});
