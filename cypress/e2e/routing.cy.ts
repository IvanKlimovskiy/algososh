/// <reference types="cypress" />
import {
  BASE_URL,
  MAIN_PAGE,
  REVERSE_STRING_ID,
  FIBONACCI_ID,
  REVERSE_STRING_PAGE,
  FIBONACCI_PAGE,
  LIST_PAGE,
  LIST_ID,
  QUEUE_PAGE,
  QUEUE_ID,
  SORTING_PAGE,
  SORTING_ID,
  STACK_PAGE,
  STACK_ID,
} from '../../src/constants/selectors';

describe('Приложение работает корректно с переходами по страницам', () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE);
  });
  afterEach(() => {
    cy.get('p').contains('К оглавлению').click();
    cy.url().should('include', BASE_URL);
  });
  it('Должна открыться страница c алгоритмом разворота строки после клика на её окно', () => {
    cy.get(REVERSE_STRING_ID).click();
    cy.url().should('include', REVERSE_STRING_PAGE);
  });
  it('Должна открыться страница c последовательностью Фибоначчи после клика на её окно', () => {
    cy.get(FIBONACCI_ID).click();
    cy.url().should('include', FIBONACCI_PAGE);
  });
  it('Должна открыться страница c алгоритмом сортировки выбором и пузырьком после клика на её окно', () => {
    cy.get(SORTING_ID).click();
    cy.url().should('include', SORTING_PAGE);
  });
  it('Должна открыться страница cо стеком после клика на её окно', () => {
    cy.get(STACK_ID).click();
    cy.url().should('include', STACK_PAGE);
  });
  it('Должна открыться страница c очередью после клика на её окно', () => {
    cy.get(QUEUE_ID).click();
    cy.url().should('include', QUEUE_PAGE);
  });
  it('Должна открыться страница cо связным списком после клика на её окно', () => {
    cy.get(LIST_ID).click();
    cy.url().should('include', LIST_PAGE);
  });
});
