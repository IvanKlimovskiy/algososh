/// <reference types="cypress" />
import { MAIN_PAGE } from '../../src/constants/selectors';

describe('Приложение запускается', () => {
  it('Приложение должно быть доступно по адресу localhost:3000', () => {
    cy.visit(MAIN_PAGE);
  });
});
