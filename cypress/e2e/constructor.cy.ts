/// <reference types="cypress"/>

// Протестировать нужно функциональность перетаскивания ингредиента, 
// создания заказа и работу модальных окон на странице «Конструктор». 
// Другими словами, нужно протестировать путь пользователя от сбора бургера 
// перетаскиванием ингредиентов до получения информации о созданном заказе.

const ingredientBuns = '#ingredient-buns';
const ingredientMains = '#ingredient-mains';
const ingredientItem = '[data-testid="ingredient-item"]';

const constructorBunTop = '#constructor-bun-top';
const constructorBunElement = '[data-testid="constructor-element"]';
const constructorOrder = '#constructor-order';

describe("constructor", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" }).as("fetchIngredients");
        cy.visit("http://localhost:3000/");
    });

    it("should not display error screen", () => {
        cy.get('[data-testid="error"]').should("not.exist");
    });

    it("should show ingredient modal on click", () => {
        cy.get(ingredientItem).should("exist");
        cy.get('[data-testid="ingredient-item-link"]').each((element, index, list) => {
            cy.wrap(element).click();
            cy.get('[data-testid="modal"]').should("exist");
            
            cy.get('[data-testid="modal-close"]').should("exist");
            cy.get('[data-testid="modal-close"]').click();
        });
    });

    it("should add bun on drag", () => {
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorBunElement).first().trigger('drop');
        });
    });

    it("should replace bun on drag", () => {
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorBunElement).first().trigger('drop');
        });

        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).last().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorBunElement).first().trigger('drop');
        });
    });

    it("should navigate to login on order submit if user is anonymous", () => {
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorBunElement).first().trigger('drop');
        });

        cy.get(ingredientMains).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(ingredientMains).within(() => {
            cy.get(constructorBunElement).first().trigger('drop');
        });

        cy.get(constructorOrder).click();
        cy.url().should('include', 'login');
    });
});
