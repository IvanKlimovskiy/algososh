/// <reference types="cypress" />

describe('Приложение работает корректно с переходами по страницам', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  afterEach(() => {
    cy.get('p').contains('К оглавлению').click();
    cy.url().should('include', 'http://localhost:3000/');
  });
  it('Должна открыться страница c алгоритмом разворота строки после клика на её окно', () => {
    cy.get('[data-testid="link-to-recursion"]').click();
    cy.url().should('include', '/recursion');
  });
  it('Должна открыться страница c последовательностью Фибоначчи после клика на её окно', () => {
    cy.get('[data-testid="link-to-fibonacci"]').click();
    cy.url().should('include', '/fibonacci');
  });
  it('Должна открыться страница c алгоритмом сортировки выбором и пузырьком после клика на её окно', () => {
    cy.get('[data-testid="link-to-sorting"]').click();
    cy.url().should('include', '/sorting');
  });
  it('Должна открыться страница cо стеком после клика на её окно', () => {
    cy.get('[data-testid="link-to-stack"]').click();
    cy.url().should('include', '/stack');
  });
  it('Должна открыться страница c очередью после клика на её окно', () => {
    cy.get('[data-testid="link-to-queue"]').click();
    cy.url().should('include', '/queue');
  });
  it('Должна открыться страница cо связным списком после клика на её окно', () => {
    cy.get('[data-testid="link-to-list"]').click();
    cy.url().should('include', '/list');
  });
});
