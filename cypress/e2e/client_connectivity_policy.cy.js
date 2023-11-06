/// <reference types="Cypress"/>
import * as clientConnectivityPolicyHelper from "../support/client_connectivity_policy_helper";
import * as loginHelper from "../support/login_to_system_helper.js";
import * as devicePostureHelper from "../support/device_posture_helper.js";

import { it } from "mocha";
describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMAUsingDirectURL(
      loginHelper.LOGIN_CREDENTIALS,
      loginHelper.CLIENT_CONNECTIVITY_POLICY_URL
    );
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

  it("Assert unable to delete device profile rule when it being used by client_connectivity rule ", () => {
    devicePostureHelper.navigateToDevicePosture();
    devicePostureHelper.chooseOption(1, devicePostureHelper.OPTIONS.delete); // 1 means delete first element by index

    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.dialogContent,
      devicePostureHelper.PAGE_CONTENT_TEXT.unableToDeleteDeviceProfile
    );
    clientConnectivityPolicyHelper.clickButton(
      devicePostureHelper.LOCATORS.dialogActionButton
    );
  });

  it("Teardown", () => {
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
