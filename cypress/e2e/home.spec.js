describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    expect(cy.title()).to.equal('Foreign Exchange Application');
  })
})
