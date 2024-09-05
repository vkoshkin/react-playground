/// <reference types="cypress"/>

// Протестировать нужно функциональность перетаскивания ингредиента, 
// создания заказа и работу модальных окон на странице «Конструктор». 
// Другими словами, нужно протестировать путь пользователя от сбора бургера 
// перетаскиванием ингредиентов до получения информации о созданном заказе.

const ingredientBuns = '#ingredient-buns';
const ingredientMains = '#ingredient-mains';
const ingredientItem = '[data-testid="ingredient-item"]';

const constructorBunTop = '#constructor-bun-top';
const constructorElement = '[data-testid="constructor-element"]';
const constructorMains = '#constructor-mains';
const constructorOrder = '#constructor-order';

const modal = '[data-testid="modal"]';
const modalClose = '[data-testid="modal-close"]';

const orderId = "#order-id";

describe("constructor", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" }).as("fetchIngredients");
    });

    it("should not display error screen", () => {
        cy.visit("http://localhost:3000/");
        cy.get('[data-testid="error"]').should("not.exist");
    });

    it("should show ingredient modal on click", () => {
        cy.visit("http://localhost:3000/");
        cy.get(ingredientItem).should("exist");
        cy.get('[data-testid="ingredient-item-link"]').each((element, index, list) => {
            cy.wrap(element).click();
            cy.get(modal).should("exist");
            
            cy.get(modalClose).should("exist");
            cy.get(modalClose).click();
        });
    });

    it("should add bun on drag", () => {
        cy.visit("http://localhost:3000/");
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });
    });

    it("should replace bun on drag", () => {
        cy.visit("http://localhost:3000/");
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });

        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).last().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });
    });

    it("should navigate to login on order submit if user is anonymous", () => {
        cy.visit("http://localhost:3000/");
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });

        cy.get(ingredientMains).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorMains).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });

        cy.get(constructorOrder).click();
        cy.url().should('include', 'login');
    });

    it("should show success modal on ", () => {
        window.localStorage.setItem("accessToken", "test");
        cy.intercept("GET", "/api/auth/user", { fixture: "login" }).as("getUser");
        cy.intercept("POST", "/api/orders", { fixture: "order" }).as("postOrder");
        cy.visit("http://localhost:3000/");

        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });

        cy.get(ingredientMains).within(() => {
            cy.get(ingredientItem).last().trigger('dragstart');
        });
        cy.get(constructorMains).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });

        cy.get(constructorOrder).click();
        cy.get(modal).should("exist");
        cy.get(orderId).should("exist");
        cy.get(modalClose).should("exist");
        cy.get(modalClose).click();
    });
});
