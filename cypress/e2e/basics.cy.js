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
    // cy.contains("Read Wikipedia in your language").click();
    cy.get("#js-lang-list-button").should("contain","Read Wikipedia in your language")

  });

  it("Should click the English language element and check the URL and some sub-text", () => {
    cy.get(".central-featured-lang.lang1").click();

    // After clicking, check if the URL has changed to the English Wikipedia page
    cy.url().should("eq", "https://en.wikipedia.org/wiki/Main_Page"); 
    cy.get("#mp-otd > :nth-child(3) >:nth-child(3)").should("include.text","1888 – The Washington Monument  in Washington, D.C., at the time the world's tallest building, officially opened to the general public.")

  });

});
