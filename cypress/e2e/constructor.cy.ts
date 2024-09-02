// Протестировать нужно функциональность перетаскивания ингредиента, 
// создания заказа и работу модальных окон на странице «Конструктор». 
// Другими словами, нужно протестировать путь пользователя от сбора бургера 
// перетаскиванием ингредиентов до получения информации о созданном заказе.

describe("constructor", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" }).as("fetchIngredients");
        cy.visit("http://localhost:3000/");
    });

    it("should pass", () => {
        cy.get('[data-test-id="test-example"]').should("not.exist");
    });
});
