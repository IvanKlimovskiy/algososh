/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  QUEUE_PAGE,
  INPUT_QUEUE,
  BUTTON_SUBMIT_QUEUE,
  BUTTON_DELETE_QUEUE,
  BUTTON_RESET_QUEUE,
  CIRCLE,
  CIRCLE_BORDER,
  CIRCLE_CHANGING_STYLE,
  CIRCLE_DEFAULT_STYLE,
  CIRCLE_HEAD,
  CIRCLE_INDEX,
  CIRCLE_TAIL,
} from '../../src/constants/selectors';

describe('Проверка корректной работоспособности компонента Queue', () => {
  beforeEach(() => {
    cy.visit(QUEUE_PAGE);
    cy.url().should('include', QUEUE_PAGE);
  });
  it('Кнопки недоступны, если инпут пустой', () => {
    cy.get(INPUT_QUEUE).invoke('prop', 'value').should('eq', '');
    cy.get(BUTTON_SUBMIT_QUEUE).should('have.attr', 'disabled');
  });
  it('Кнопка Удалить доступна, если в очереди есть элементы', () => {
    cy.get(INPUT_QUEUE).type('123');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(BUTTON_DELETE_QUEUE).should('not.be.disabled');
  });
  it('Проверка корректного добавления элемента в очередь', () => {
    // Добавляем первый элемент в очередь
    cy.get(INPUT_QUEUE).type('123');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).should('contain.text', '123');
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(0).find(CIRCLE_INDEX).should('contain.text', '0');
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
    cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('contain.text', 'tail');
    // Проверяем что у первого элемента есть указатель tail и есть указатель head
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
    cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('contain.text', 'tail');
    // Добавляем второй элемент в очередь
    cy.get(INPUT_QUEUE).type('85');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(1).should('contain.text', '85');
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(1).find(CIRCLE_INDEX).should('contain.text', '1');
    // Проверяем что у первого элемента нет указателя tail и есть указатель head
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('contain.text', 'head');
    cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    // Проверяем что у второго элемента есть указатель tail и нет указателя head
    cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('contain.text', 'tail');
    cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    // Добавляем третий элемент в очередь
    cy.get(INPUT_QUEUE).type('69');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(2).should('contain.text', '69');
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(2).find(CIRCLE_INDEX).should('contain.text', '2');
    // Проверяем что у второго элемента нет указателя tail и нет указателя head
    cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    // Проверяем что у третьего элемента есть указатель tail и нет указателя head
    cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('contain.text', 'tail');
    cy.get(CIRCLE).eq(2).find(CIRCLE_HEAD).should('not.contain.text', 'head');
  });
  it('Проверка корректного удаления элемента из очереди', () => {
    // Добавим три элемента в очередь
    cy.get(INPUT_QUEUE).type('123');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(INPUT_QUEUE).type('85');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(INPUT_QUEUE).type('69');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    cy.get(CIRCLE).eq(2).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_DEFAULT_STYLE);
    // Удаляем элемент из очереди
    cy.get(BUTTON_DELETE_QUEUE).click();
    cy.get(CIRCLE).eq(0).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).should('not.contain.text');
    // Проверяем что у первого элемента нет указателя tail и нет указателя head
    cy.get(CIRCLE).eq(0).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    cy.get(CIRCLE).eq(0).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    // Проверяем что у второго элемента нет указателя tail и есть указатель head
    cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('contain.text', 'head');
    // Проверяем что у третьего элемента есть указатель tail и нет указателя head
    cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('contain.text', 'tail');
    cy.get(CIRCLE).eq(2).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    // Удаляем ещё один элемент из очереди
    cy.get(BUTTON_DELETE_QUEUE).click();
    cy.get(CIRCLE).eq(1).find(CIRCLE_BORDER).should('have.css', 'border', CIRCLE_CHANGING_STYLE);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(1).should('not.contain.text');
    // Проверяем что у второго элемента нет указателя tail и нет указателя head
    cy.get(CIRCLE).eq(1).find(CIRCLE_TAIL).should('not.contain.text', 'tail');
    cy.get(CIRCLE).eq(1).find(CIRCLE_HEAD).should('not.contain.text', 'head');
    // Проверяем что у третьего элемента есть указатель tail и есть указатель head
    cy.get(CIRCLE).eq(2).find(CIRCLE_TAIL).should('contain.text', 'tail');
    cy.get(CIRCLE).eq(2).find(CIRCLE_HEAD).should('contain.text', 'head');
  });
  it('Проверка корректности очищения очереди', () => {
    // Добавим три элемента в очередь
    cy.get(INPUT_QUEUE).type('123');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(INPUT_QUEUE).type('85');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(INPUT_QUEUE).type('69');
    cy.get(BUTTON_SUBMIT_QUEUE).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(BUTTON_RESET_QUEUE).click();
    cy.get(CIRCLE).each(($el) => {
      cy.wrap($el).should('contain.text', '');
    });
    cy.get(CIRCLE)
      .find(CIRCLE_HEAD)
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });
    cy.get(CIRCLE)
      .find(CIRCLE_TAIL)
      .each(($el) => {
        cy.wrap($el).should('contain.text', '');
      });
  });
});
