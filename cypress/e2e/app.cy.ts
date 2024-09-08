describe("app", () => {
    it("should display error screen on error data", () => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredientsError" }).as("ingredientsError");
        cy.visit("/");
        cy.get('[data-test="error"]').should("exist");
    });
});
