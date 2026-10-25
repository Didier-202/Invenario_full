describe('003 Flujo UI: login → dashboard → productos', () => {
  const usuario = 'didier'
  const password = '123456'

  it('inicia sesión, llega al dashboard y navega a productos y usuarios', () => {
    cy.visit('/')

    cy.get('input[placeholder="Usuario"]').clear().type(usuario)
    cy.get('input[placeholder="contraseña"]').clear().type(password)
    cy.contains('button', 'Acceder').click()

    cy.contains('h2', 'Inventario', { timeout: 10000 }).should('be.visible')
    cy.contains('dashboard').should('be.visible')

    cy.contains('productos').click()
    cy.contains('productos').should('be.visible')

    cy.contains('usuarios').click()
    cy.contains('usuarios').should('be.visible')
  })
})