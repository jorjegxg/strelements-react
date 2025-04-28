describe('Login', () => {
  it('Login', () => {
    // Vizitează pagina de test
    cy.visit('http://localhost:5173'); // Înlocuiește cu URL-ul aplicației tale

    cy.get('[data-testid="login-button"]')
    .should("exist")
    .should("have.text", "Login")
  
    
  });
});
