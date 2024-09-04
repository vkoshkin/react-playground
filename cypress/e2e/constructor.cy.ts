// Протестировать нужно функциональность перетаскивания ингредиента, 
// создания заказа и работу модальных окон на странице «Конструктор». 
// Другими словами, нужно протестировать путь пользователя от сбора бургера 
// перетаскиванием ингредиентов до получения информации о созданном заказе.

describe("constructor", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" }).as("fetchIngredients");
        cy.visit("http://localhost:3000/");
    });

    it("should not display error screen", () => {
        cy.get('[data-testid="error"]').should("not.exist");
    });

    it("should show ingredient modal on click", () => {
        cy.get('[data-testid="ingredient-item"]').should("exist");
        cy.get('[data-testid="ingredient-item-link"]').each((element, index, list) => {
            cy.wrap(element).click();
            cy.get('[data-testid="modal"]').should("exist");
            
            cy.get('[data-testid="modal-close"]').should("exist");
            cy.get('[data-testid="modal-close"]').click();
        });
    });
});
