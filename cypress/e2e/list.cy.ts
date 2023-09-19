/// <reference types="cypress" />
import {
  INPUT_LIST,
  INPUT_INDEX_LIST,
  BUTTON_ADD_BY_INDEX_LIST,
  BUTTON_ADD_HEAD_LIST,
  BUTTON_ADD_TAIL_LIST,
  BUTTON_REMOVE_BY_INDEX_LIST,
  BUTTON_REMOVE_HEAD_LIST,
  BUTTON_REMOVE_TAIL_LIST,
  LIST_PAGE,
  CIRCLE,
  CIRCLE_BORDER,
  CIRCLE_DEFAULT_STYLE,
  CIRCLE_INDEX,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_SMALL,
  CIRCLE_CHANGING_STYLE,
  CIRCLE_MODIFIED_STYLE,
} from '../../src/constants/selectors';
import { DELAY_IN_MS } from '../../src/constants/delays';
describe('Проверка корректной работоспособности компонента List', () => {
  beforeEach(() => {
    cy.visit(LIST_PAGE);
    cy.url().should('include', LIST_PAGE);
  });
  it('Кнопки недоступны, если инпут пустой', () => {
    cy.get(INPUT_LIST).invoke('prop', 'value').should('eq', '');
    cy.get(INPUT_INDEX_LIST).invoke('prop', 'value').should('eq', '');
    cy.get(BUTTON_ADD_HEAD_LIST).should('have.attr', 'disabled');
    cy.get(BUTTON_ADD_TAIL_LIST).should('have.attr', 'disabled');
    cy.get(BUTTON_ADD_BY_INDEX_LIST).should('have.attr', 'disabled');
    cy.get(BUTTON_REMOVE_BY_INDEX_LIST).should('have.attr', 'disabled');
  });
  it('Проверка корректности отрисовки дефолтного списка', () => {
    cy.get(CIRCLE).should('have.length', '4');
    //Проверка первого элемента
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(0).should('contain.text', '0');
    cy.get(CIRCLE).eq(0).find(CIRCLE_INDEX).should('contain.text', '0');
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
    cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    //Проверка второго элемента
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(1).should('contain.text', '34');
    cy.get(CIRCLE).eq(1).find(CIRCLE_INDEX).should('contain.text', '1');
    cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    //Проверка третьего элемента
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(2).should('contain.text', '8');
    cy.get(CIRCLE).eq(2).find(CIRCLE_INDEX).should('contain.text', '2');
    cy.get(CIRCLE).eq(2).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    //Проверка четвертого элемента
    cy.get(CIRCLE).eq(3).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(3).should('contain.text', '1');
    cy.get(CIRCLE).eq(3).find(CIRCLE_INDEX).should('contain.text', '3');
    cy.get(CIRCLE).eq(3).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    cy.get(CIRCLE).eq(3).find(CIRCLE_TAIL).should('contain.text', 'tail');
  });
  it('Проверка корректности добавления элемента в head', () => {
    cy.get(INPUT_LIST).type('22');
    cy.get(BUTTON_ADD_HEAD_LIST).click();
    cy.get(CIRCLE)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '22')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).should('have.length', '5');
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(0).should('contain.text', '22');
    cy.get(CIRCLE).eq(0).find(CIRCLE_INDEX).should('contain.text', '0');
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
  });
  it('Проверка корректности добавления элемента в tail', () => {
    cy.get(INPUT_LIST).type('43');
    cy.get(BUTTON_ADD_TAIL_LIST).click();
    cy.get(CIRCLE)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '43')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(4).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).should('have.length', '5');
    cy.get(CIRCLE).eq(4).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(4).should('contain.text', '43');
    cy.get(CIRCLE).eq(4).find(CIRCLE_INDEX).should('contain.text', '4');
    cy.get(CIRCLE).eq(4).find(CIRCLE_TAIL).should('contain.text', 'tail');
  });
  it('Проверка корректности добавления элемента по индексу', () => {
    cy.get(INPUT_LIST).type('67');
    cy.get(INPUT_INDEX_LIST).type('3');
    cy.get(BUTTON_ADD_BY_INDEX_LIST).click();
    cy.get(CIRCLE)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '67')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.get(CIRCLE)
      .eq(1)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '67')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.get(CIRCLE)
      .eq(2)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '67')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.get(CIRCLE)
      .eq(3)
      .find(CIRCLE_HEAD)
      .find(CIRCLE_SMALL)
      .should('contain.text', '67')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(3).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_MODIFIED_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(3).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(3).should('contain.text', '67');
    cy.get(CIRCLE).should('have.length', '5');
  });
  it('Проверка корректности удаления элемента из head', () => {
    cy.get(BUTTON_REMOVE_HEAD_LIST).click();
    cy.get(CIRCLE).eq(0).should('contain.text', '');
    cy.get(CIRCLE)
      .eq(0)
      .find(CIRCLE_TAIL)
      .find(CIRCLE_SMALL)
      .should('contain.text', '0')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).should('have.length', '3');
    cy.get(CIRCLE).eq(0).should('contain.text', '34');
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
  });
  it('Проверка корректности удаления элемента из tail', () => {
    cy.get(BUTTON_REMOVE_TAIL_LIST).click();
    cy.get(CIRCLE).eq(3).should('contain.text', '');
    cy.get(CIRCLE)
      .eq(3)
      .find(CIRCLE_TAIL)
      .find(CIRCLE_SMALL)
      .should('contain.text', '1')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).should('have.length', '3');
    cy.get(CIRCLE).eq(2).should('contain.text', '8');
    cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('contain.text', 'tail');
  });
  it('Проверка корректности удаления элемента по индексу', () => {
    cy.get(INPUT_INDEX_LIST).type('3');
    cy.get(BUTTON_REMOVE_BY_INDEX_LIST).click();
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).eq(3).should('contain.text', '');
    cy.get(CIRCLE)
      .eq(3)
      .find(CIRCLE_TAIL)
      .find(CIRCLE_SMALL)
      .should('contain.text', '1')
      .should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).should('have.length', '3');
  });
});
