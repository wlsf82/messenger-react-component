import '../../src/index.css'

import 'cypress-axe'

import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', component => {
  return mount(
    <main>
      {component}
    </main>
  )
})
