describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("/");
    cy.title().should("eq", "Foreign Exchange Application");
  });
});
