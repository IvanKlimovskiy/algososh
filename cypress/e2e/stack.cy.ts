/// <reference types="cypress" />

import {
  BUTTON_SUBMIT_STACK,
  BUTTON_DELETE_STACK,
  BUTTON_RESET_STACK,
  INPUT_STACK,
  STACK_PAGE,
  CIRCLE,
  CIRCLE_BORDER,
  CIRCLE_CHANGING_STYLE,
  CIRCLE_INDEX,
  CIRCLE_HEAD,
  CIRCLE_DEFAULT_STYLE,
  BUTTON_LOADER,
  CIRCLES_STACK,
} from '../../src/constants/selectors';

describe('Проверка корректной работоспособности компонента Стек', () => {
  beforeEach(() => {
    cy.visit(STACK_PAGE);
    cy.url().should('include', STACK_PAGE);
  });
  it('Кнопки недоступны, если инпут пустой', () => {
    cy.get(BUTTON_SUBMIT_STACK).should('be.disabled');
    cy.get(BUTTON_DELETE_STACK).should('be.disabled');
    cy.get(BUTTON_RESET_STACK).should('be.disabled');
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).should('not.be.disabled');
    cy.get(BUTTON_DELETE_STACK).should('be.disabled');
    cy.get(BUTTON_RESET_STACK).should('be.disabled');
  });
  it('Кнопки Удалить и Очистить доступны, если в стеке есть элементы', () => {
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.get(BUTTON_DELETE_STACK).should('not.be.disabled');
    cy.get(BUTTON_RESET_STACK).should('not.be.disabled');
  });
  it('На кнопках Добавить и Удалить во время добавления или удаления висит loader', () => {
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.get(BUTTON_LOADER).should('exist');
    cy.wait(500);
    cy.get(BUTTON_DELETE_STACK).click();
    cy.get(BUTTON_LOADER).should('exist');
  });
  it('Проверка корректного добавления элемента в стек', () => {
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).click();
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
    cy.wait(500);
    //
    cy.get(BUTTON_LOADER).should('not.exist');
    cy.get(INPUT_STACK).type('55');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '55')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
    cy.wait(500);
    //
    cy.get(INPUT_STACK).type('39');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '55')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '39')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
    cy.wait(500);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '55')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '39')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
  });
  it('Проверка корректного удаления элемента из стека', () => {
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(INPUT_STACK).type('55');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(INPUT_STACK).type('39');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(BUTTON_DELETE_STACK).click();
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '55')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '39')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
    cy.wait(500);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '123')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0')
      .get(CIRCLE_HEAD)
      .should('contain.text', '');
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '55')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1')
      .get(CIRCLE_HEAD)
      .should('contain.text', 'top');
  });
  it('Проверка корректности очищения стека', () => {
    cy.get(INPUT_STACK).type('123');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(INPUT_STACK).type('55');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(INPUT_STACK).type('39');
    cy.get(BUTTON_SUBMIT_STACK).click();
    cy.wait(500);
    cy.get(CIRCLE).should('have.length', '3');
    cy.get(BUTTON_RESET_STACK).click();
    cy.get(CIRCLE).should('have.length', '0');
  });
});
