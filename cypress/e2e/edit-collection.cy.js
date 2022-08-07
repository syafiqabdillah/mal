describe('edit collection', () => {
  it('can edit existing collection', () => {
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
    cy.findByText('edit').should('exist').click()
    cy.contains('Edit Collection')
    cy.get('input')
      .should('have.value', 'Action')
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Life Action'
      )
    cy.findByRole('button', { name: 'Save' }).should('not.be.disabled').click()
    cy.contains('Editted collection name from "Action" to "Life Action"')
    cy.contains('Life Action (0)')
  })

  it('cannot edit name to existing name collection', () => {
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

    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.get('input').type('Romance')
    cy.findByRole('button', { name: 'Submit' }).should('exist').click()
    cy.contains('Added "Romance" to collections')
    cy.contains('Romance (0)')

    cy.get('[data-cy="edit-Romance"]').click()
    cy.get('input')
      .should('have.value', 'Romance')
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Action'
      )
    cy.contains('Collection name must be unique')
    cy.findByRole('button', { name: 'Save' }).should('be.disabled')
  })

  it('cannot edit name to empty string', () => {
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

    cy.findByRole('button', { name: 'Add a Collection' })
      .should('exist')
      .click()
    cy.get('input').type('Romance')
    cy.findByRole('button', { name: 'Submit' }).should('exist').click()
    cy.contains('Added "Romance" to collections')
    cy.contains('Romance (0)')

    cy.get('[data-cy="edit-Romance"]').click()
    cy.get('input')
      .should('have.value', 'Romance')
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
    cy.findByRole('button', { name: 'Save' }).should('be.disabled')
  })
})
