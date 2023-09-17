/// <reference types="cypress" />
describe('Приложение запускается', () => {
  it('Приложение должно быть доступно по адресу localhost:3000', () => {
    cy.visit('/');
  });
});
