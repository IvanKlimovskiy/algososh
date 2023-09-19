/// <reference types="cypress" />

import { DELAY_IN_MS } from '../../src/constants/delays';
import {
  REVERSE_STRING_PAGE,
  BUTTON_REVERSE_STRING,
  INPUT_REVERSE_STRING,
  CIRCLE,
  CIRCLE_BORDER,
  CIRCLE_CHANGING_STYLE,
  CIRCLE_DEFAULT_STYLE,
  CIRCLE_MODIFIED_STYLE,
} from '../../src/constants/selectors';

describe('Проверка корректной работоспособности компонента String', () => {
  beforeEach(() => {
    cy.visit(REVERSE_STRING_PAGE);
    cy.url().should('include', REVERSE_STRING_PAGE);
  });
  it('Кнопка недоступна, если инпут пустой', () => {
    cy.get(BUTTON_REVERSE_STRING).should('be.disabled');
    cy.get(INPUT_REVERSE_STRING).type('тест');
    cy.get(BUTTON_REVERSE_STRING).should('not.be.disabled');
  });
  it('Проверка что строка разворачивается корректно', () => {
    cy.get(INPUT_REVERSE_STRING).type('hello');
    cy.get(BUTTON_REVERSE_STRING).click();
    cy.get(CIRCLE).should('have.length', '5');
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', 'h')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', 'e')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', 'l')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', 'l')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', 'o')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    //
    cy.wait(DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', 'o')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', 'l')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', 'l')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', 'e')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', 'h')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
  });
});
