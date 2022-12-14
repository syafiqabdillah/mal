describe('add collection', () => {
  it('can add collection', () => {
    cy.visit('http://localhost:3000/collections')
    cy.contains('My Collections')
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.contains('Add Collection')
    cy.get('input').type('Action')
    cy.findByRole('button', { name: 'Submit' }).should('exist').click()
    cy.contains('Added "Action" to collections')
    cy.contains('Action (0)')
  })

  it('can add collection with unique name', () => {
    cy.visit('http://localhost:3000/collections')
    cy.contains('My Collections')
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.contains('Add Collection')
    cy.get('input').type('Action')
    cy.findByRole('button', { name: 'Submit' }).should('exist').click()
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.get('input').type('Romance')
    cy.findByText('Same collection name is not allowed').should('not.exist')
    cy.findByRole('button', { name: 'Submit' })
      .should('not.be.disabled')
      .click()
    cy.contains('Added "Action" to collections')
    cy.contains('Romance (0)')
  })

  it('cannot add collection with same name', () => {
    cy.visit('http://localhost:3000/collections')
    cy.contains('My Collections')
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.contains('Add Collection')
    cy.get('input').type('Action')
    cy.findByRole('button', { name: 'Submit' }).should('exist').click()
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.get('input').type('Action')
    cy.contains('Same collection name is not allowed')
    cy.findByRole('button', { name: 'Submit' }).should('be.disabled')
  })

  it('cannot add collection with special characters', () => {
    cy.visit('http://localhost:3000/collections')
    cy.contains('My Collections')
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.contains('Add Collection')
    cy.get('input').type('Action ^&*').should('have.value', 'Action ')
  })

  it('cannot add collection with empty string as name', () => {
    cy.visit('http://localhost:3000/collections')
    cy.contains('My Collections')
    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.contains('Add Collection')
    cy.findByRole('button', { name: 'Submit' }).should('be.disabled')
  })
})
