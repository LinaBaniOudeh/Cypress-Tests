/// <reference types="Cypress"/>
import * as loginHelper from "../support/login_to_system_helper.js";

describe("login to CMA", () => {
  // Run this code before each test
  beforeEach(() => {
    // Visit the Wikipedia homepage
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS);
    loginHelper.navigateToAccess();
    loginHelper.navigateToalwaysOnPolicy();
  });

  it.only("Should add a new always-on rule", () => {
    // assert no data in the table and enable policy toggle button is off.
    loginHelper.assertEmptyTable();

    //Add Always-on first rule
    loginHelper.addNewRule(loginHelper.ALWAYS_ON_RULE_DATA[0]);
    //Add Always-on second rule
    loginHelper.addNewRule(loginHelper.ALWAYS_ON_RULE_DATA[1]);
    //save and enable policy
    loginHelper.setRadioButtonState(
      loginHelper.LOCATORS.enablePolicyToggle,
      true
    );
    loginHelper.assertSavedSuccessfully();
    //assert Table content
    loginHelper.assertRuleTableContent();
    cy.wait(5000);
    //teardown
    loginHelper.deleteRowByIndex(2);
    loginHelper.deleteRowByIndex(2);
    loginHelper.setRadioButtonState(
      loginHelper.LOCATORS.enablePolicyToggle,
      false
    );
    loginHelper.assertSavedSuccessfully();
  });
});
