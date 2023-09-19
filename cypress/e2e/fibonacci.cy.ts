/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  BUTTON_FIBONACCI,
  CIRCLE,
  CIRCLE_BORDER,
  CIRCLE_DEFAULT_STYLE,
  FIBONACCI_PAGE,
  INPUT_FIBONACCI,
  CIRCLE_INDEX,
} from '../../src/constants/selectors';

describe('Проверка корректной работоспособности компонента Fibonacci', () => {
  beforeEach(() => {
    cy.visit(FIBONACCI_PAGE);
    cy.url().should('include', FIBONACCI_PAGE);
  });
  it('Кнопка недоступна, если инпут пустой', () => {
    cy.get(BUTTON_FIBONACCI).should('be.disabled');
    cy.get(INPUT_FIBONACCI).type('7');
    cy.get(BUTTON_FIBONACCI).should('not.be.disabled');
  });
  it('Проверка правильности генерации чисел', () => {
    cy.get(INPUT_FIBONACCI).type('7');
    cy.get(BUTTON_FIBONACCI).click();
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', '3')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '3');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', '3')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '3');
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', '5')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '4');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', '3')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '3');
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', '5')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '4');
    //
    cy.get(CIRCLE)
      .eq(5)
      .should('contain.text', '8')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '5');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', '3')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '3');
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', '5')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '4');
    //
    cy.get(CIRCLE)
      .eq(5)
      .should('contain.text', '8')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '5');
    //
    cy.get(CIRCLE)
      .eq(6)
      .should('contain.text', '13')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '6');
    //
    cy.wait(SHORT_DELAY_IN_MS);
    //
    cy.get(CIRCLE)
      .eq(0)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '0');
    //
    cy.get(CIRCLE)
      .eq(1)
      .should('contain.text', '1')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '1');
    //
    cy.get(CIRCLE)
      .eq(2)
      .should('contain.text', '2')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '2');
    //
    cy.get(CIRCLE)
      .eq(3)
      .should('contain.text', '3')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '3');
    //
    cy.get(CIRCLE)
      .eq(4)
      .should('contain.text', '5')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '4');
    //
    cy.get(CIRCLE)
      .eq(5)
      .should('contain.text', '8')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '5');
    //
    cy.get(CIRCLE)
      .eq(6)
      .should('contain.text', '13')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '6');
    //
    cy.get(CIRCLE)
      .eq(7)
      .should('contain.text', '21')
      .find(CIRCLE_BORDER)
      .should('have.css', 'border', CIRCLE_DEFAULT_STYLE)
      .get(CIRCLE_INDEX)
      .should('contain.text', '7');
    //
    cy.wait(SHORT_DELAY_IN_MS);
  });
});
