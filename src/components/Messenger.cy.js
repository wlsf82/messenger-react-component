/// <reference types="Cypress" />

import Messenger from './Messenger'

const options = {
  viewportHeight: 600,
  viewportWidth: 400
}

describe('<Messenger />', options, () => {
  beforeEach(() => {
    cy.mount(
      <main>
        <Messenger />
      </main>
    )

    cy.injectAxe()
    cy.configureAxe({
      rules: [{
        id: 'page-has-heading-one',
        enabled: false
      }]
    })

    cy.get('.messenger-box').should('not.exist')
    cy.get('.messenger-button')
      .should('be.visible')
      .click()

    cy.get('.messenger-box').should('be.visible')
  })

  it('opens and closes the messenger and finds no a11y issue', () => {
    cy.checkA11y()

    cy.get('.messenger-button').click()

    cy.get('.messenger-box').should('not.exist')
    cy.get('.messenger-button').should('be.visible')
    cy.checkA11y()
  })

  it('makes sure all fields are mandatory and the first one is focused', () => {
    cy.get('input[type="text"]')
      .should('be.focused')
      .and('have.attr', 'required')
    cy.get('input[type="email"]').should('have.attr', 'required')
    cy.get('textarea').should('have.attr', 'required')
  })

  it('successfully submits the form and finds no a11y issue', () => {
    cy.get('input[type="text"]').type('John')
    cy.get('input[type="email"]').type('john-doe@example.com')
    cy.get('textarea').type('The customer with ID 5 has not contact info.')
    cy.contains('button', 'Send').click()

    cy.contains('.success', 'Your message has been sent.').should('be.visible')
    cy.checkA11y()
  })
})
