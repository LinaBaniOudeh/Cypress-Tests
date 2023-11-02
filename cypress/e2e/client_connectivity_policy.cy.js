/// <reference types="Cypress"/>
import * as clientConnectivityPolicyHelper from "../support/client_connectivity_policy_helper";
import { clickButton } from "../support/device_posture_helper";
import * as loginHelper from "../support/login_to_system_helper.js";
import { it } from "mocha";
describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS);
    loginHelper.navigateToAccess();
    clientConnectivityPolicyHelper.navigateToclientConnectivityPolicy();
  });

  it("Assert number of Countries", () => {
    clientConnectivityPolicyHelper.clickButton(
      clientConnectivityPolicyHelper.LOCATORS.newButton
    );
    clientConnectivityPolicyHelper.expandDropdownIfNotExpanded(
      clientConnectivityPolicyHelper.LOCATORS.countries
    );

    clientConnectivityPolicyHelper.chooseFromDropDown(
      clientConnectivityPolicyHelper.LOCATORS.countriesDropDownMenu1,
      clientConnectivityPolicyHelper.PAGE_CONTENT_TEXT.country,
      clientConnectivityPolicyHelper.LOCATORS.listBox
    );
    clientConnectivityPolicyHelper.assertNumberOfOptions(
      clientConnectivityPolicyHelper.LOCATORS.countriesDropDownMenu2,
      clientConnectivityPolicyHelper.LOCATORS.listBox,
      249
    );
  });

  it("Test Add client Connectivity Policy rules", () => {
    for (let i = 0; i < 3; i++) {
      clientConnectivityPolicyHelper.addNewRule(
        clientConnectivityPolicyHelper.CLIENT_POLICY_DATA[i]
      );
    }
    clientConnectivityPolicyHelper.assertSave(
      clientConnectivityPolicyHelper.MSG.savedSuccessfully
    );
  });

  it("Assert Enable Rules ", () => {
    clientConnectivityPolicyHelper.setRadioButtonState(
      clientConnectivityPolicyHelper.LOCATORS.enableRulesToggleButton,
      true
    );
    clickButton(
      clientConnectivityPolicyHelper.LOCATORS.confirmEnableRuleButton
    );
    clientConnectivityPolicyHelper.assertSave(
      clientConnectivityPolicyHelper.MSG.savedSuccessfully
    );
  });

  it.only("Teardown", () => {
    for (let i = 0; i < 3; i++) {
      clientConnectivityPolicyHelper.DeleteByIndex(1);
    }
    clientConnectivityPolicyHelper.assertEmptyTable(
      clientConnectivityPolicyHelper.LOCATORS.ruleTable1
    );
    clientConnectivityPolicyHelper.setRadioButtonState(
      clientConnectivityPolicyHelper.LOCATORS.enableRulesToggleButton,
      false
    );

    clientConnectivityPolicyHelper.assertSave(
      clientConnectivityPolicyHelper.MSG.savedSuccessfully
    );
  });
});
