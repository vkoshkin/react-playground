/// <reference types="cypress"/>

// Протестировать нужно функциональность перетаскивания ингредиента, 
// создания заказа и работу модальных окон на странице «Конструктор». 
// Другими словами, нужно протестировать путь пользователя от сбора бургера 
// перетаскиванием ингредиентов до получения информации о созданном заказе.

const ingredientBuns = '[data-test="ingredient-buns"]';
const ingredientMains = '[data-test="ingredient-mains"]';
const ingredientItem = '[data-test="ingredient-item"]';

const constructorBunTop = '[data-test="constructor-bun-top"]';
const constructorElement = '[data-test="constructor-element"]';
const constructorMains = '[data-test="constructor-mains"]';
const constructorOrder = '[data-test="constructor-order"]';

const modal = '[data-test="modal"]';
const modalClose = '[data-test="modal-close"]';

const orderId = '[data-test="order-id"]';

describe("constructor", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" }).as("fetchIngredients");
    });

    it("should not display error screen", () => {
        cy.visit("/");
        cy.get('[data-test="error"]').should("not.exist");
    });

    it("should show ingredient modal on click", () => {
        cy.visit("/");
        cy.get(ingredientItem).should("exist");
        cy.get('[data-test="ingredient-item-link"]').each((element, index, list) => {
            cy.wrap(element).click();
            cy.get(modal).should("exist");
            
            cy.get(modalClose).should("exist");
            cy.get(modalClose).click();
        });
    });

    it("should add bun on drag", () => {
        cy.visit("/");
        cy.get(ingredientBuns).within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().trigger('drop');
        });
    });

    it("should replace bun on drag", () => {
        cy.visit("/");
        cy.get(ingredientBuns).as("ingredientBuns");
        cy.get("@ingredientBuns").within(() => {
            cy.get(ingredientItem).first().trigger('dragstart');
        });
        cy.get(constructorBunTop).within(() => {
            cy.get(constructorElement).first().as("constructorBunTopElement");
        });
        cy.get("@constructorBunTopElement").trigger('drop');

        cy.get("@ingredientBuns").within(() => {
            cy.get(ingredientItem).last().trigger('dragstart');
        });
        cy.get("@constructorBunTopElement").trigger('drop');
    });

    it("should navigate to login on order submit if user is anonymous", () => {
        cy.visit("/");
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

    it("should show success order modal", () => {
        window.localStorage.setItem("accessToken", "test");
        cy.intercept("GET", "/api/auth/user", { fixture: "login" }).as("getUser");
        cy.intercept("POST", "/api/orders", { fixture: "order" }).as("postOrder");
        cy.visit("/");

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

    it("should show error order modal", () => {
        window.localStorage.setItem("accessToken", "test");
        cy.intercept("GET", "/api/auth/user", { fixture: "login" }).as("getUser");
        cy.intercept("POST", "/api/orders", { fixture: "orderError" }).as("postOrder");
        cy.visit("/");

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
        cy.get(orderId).should("not.exist");
        cy.get(modalClose).should("exist");
        cy.get(modalClose).click();
    });
});
