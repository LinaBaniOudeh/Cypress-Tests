import * as loginHelper from "../support/login_to_system_helper";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('waitUntilElementNotExists', { prevSubject: true }, (subject) => {
    cy.wrap(subject).should('not.exist', { timeout: 10000 });
  });
  
Cypress.Commands.add('bypassLogin', (name, password, url) => {
    cy.session([name, password], () => {
            cy.visit(url)
            cy.get(loginHelper.LOCATORS.userNameField).type(name);
            cy.get(loginHelper.LOCATORS.passwordField).type(password);
            cy.get(loginHelper.LOCATORS.submitButton).click();
        },
        // {
        //     // cacheAcrossSpecs:true
        // }
        )
 });