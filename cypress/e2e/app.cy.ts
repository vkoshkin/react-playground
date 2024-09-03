describe("app", () => {
    it("should display error screen on error data", () => {
        cy.intercept("GET", "/api/ingredients", { fixture: "errorIngredients" }).as("errorIngredients");
        cy.visit("http://localhost:3000/");
        cy.get('[data-testid="error"]').should("exist");
    });
});
