/// <reference types="Cypress"/>

describe("Wikipedia Test Suite", () => {
  const wikipediaURL = "https://www.wikipedia.org/";

  // Run this code before each test
  beforeEach(() => {
    // Visit the Wikipedia homepage
    cy.visit(wikipediaURL);
  });

  it("Should have the title 'Wikipedia - The Free Encyclopedia'", () => {
    cy.title().should("eq", "Wikipedia");
    cy.contains("The Free Encyclopedia").should("exist");
  });

  it("Should search for 'Google' and check page navigation", () => {
    // Search for 'Google' and check page navigation
    cy.get("#searchInput").type("Google", { delay: 200 });
    cy.get("#typeahead-suggestions").should("exist");
    cy.get('#typeahead-suggestions .suggestion-link').first().click();
    cy.url().should("eq", "https://en.wikipedia.org/wiki/Google");
    cy.title().should("include", "Google");
  });

  it("Should click the 'EN' button and assert the number of languages", () => {
    // Click the 'EN' button and assert the number of languages
    cy.get("#searchLanguage").should("exist");
    cy.get("#searchLanguage").find("option").should("have.length", 68);
  });

  it("Should click the 'Read Wikipedia in your language' button", () => {
    cy.contains("Read Wikipedia in your language").click();

  });
});
