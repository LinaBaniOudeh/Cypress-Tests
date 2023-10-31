/// <reference types="Cypress"/>
import * as devicePostureHelper from "../support/device_posture_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";
import { it } from "mocha";

describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS);
    loginHelper.navigateToAccess();
    devicePostureHelper.navigateToDevicePosture();
  });

  it("Assert Page Content", () => {
    devicePostureHelper.assertSettingsPageContent();
  });

  it("Test Period Field Does Not Accept Negative Value", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.settings);
    devicePostureHelper.typeValidInput(
      devicePostureHelper.LOCATORS.picker,
      devicePostureHelper.PERIODS[0]
    ); // -4
    devicePostureHelper.assertSave(devicePostureHelper.MSG.periodError);
  });

  it('Test asserting "0" and positive number to period field', () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.settings);
    devicePostureHelper.typeValidInput(
      devicePostureHelper.LOCATORS.picker,
      devicePostureHelper.PERIODS[2]
    ); // 20
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
    cy.reload();

    devicePostureHelper.typeValidInput(
      devicePostureHelper.LOCATORS.picker,
      devicePostureHelper.PERIODS[1]
    ); // 0
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });

  it.only("Test adding different device checks", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);
    for (let i = 0; i < 5; i++) {
      devicePostureHelper.addNewDeviceCheck(
        devicePostureHelper.DEVICE_CHECKS_DATA[i]
      );
    }
    devicePostureHelper.assertDeviceChecksTableContent(
      devicePostureHelper.DEVICE_CHECKS_DATA
    );
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);

    //teardown
    devicePostureHelper.deleteTableContent(
      devicePostureHelper.LOCATORS.deviceChecksTable2
    );
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });
});
