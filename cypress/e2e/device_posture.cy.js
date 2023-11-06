/// <reference types="Cypress"/>
import * as devicePostureHelper from "../support/device_posture_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";
import { it } from "mocha";

describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMAUsingDirectURL(
      loginHelper.LOGIN_CREDENTIALS,
      loginHelper.DEVICE_POSTURE_URL
    );
  });

  it('Assert "No Device Checks configured" page ', () => {
    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.noDeviceChecksConfigText1,
      devicePostureHelper.PAGE_CONTENT_TEXT.noDeviceChecksConfigured
    );
    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.noDeviceChecksConfigText2,
      devicePostureHelper.PAGE_CONTENT_TEXT.configureAtLeastOneDevice
    );
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.createDeviceChecksButton
    );
    devicePostureHelper.assertPageURL(
      devicePostureHelper.PAGE_CONTENT_TEXT.deviceChecksCuurentTab
    );
  });

  it("Assert Continue dialog in settings page after changing the period without saving", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.settings);
    devicePostureHelper.typeValidInput(
      devicePostureHelper.LOCATORS.picker,
      devicePostureHelper.PERIODS[2]
    ); // change the value from 0 to 20
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);
    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.dialogTitle,
      devicePostureHelper.PAGE_CONTENT_TEXT.continueWithoutSaving
    );
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.stayButton);
    devicePostureHelper.assertPageURL(
      devicePostureHelper.PAGE_CONTENT_TEXT.settingsCurrentTab
    );
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.continueButton
    );

    devicePostureHelper.assertPageURL(
      devicePostureHelper.PAGE_CONTENT_TEXT.deviceChecksCuurentTab
    );
  });

  it("Assert Continue dialog after adding device check without saving", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);
    devicePostureHelper.addNewDeviceCheck(
      devicePostureHelper.DEVICE_CHECKS_DATA[0]
    );
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.settings);
    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.dialogTitle,
      devicePostureHelper.PAGE_CONTENT_TEXT.continueWithoutSaving
    );
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.stayButton);
    devicePostureHelper.assertPageURL(
      devicePostureHelper.PAGE_CONTENT_TEXT.deviceChecksCuurentTab
    );
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.settings);
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.continueButton
    );
    devicePostureHelper.assertPageURL(
      devicePostureHelper.PAGE_CONTENT_TEXT.settingsCurrentTab
    );
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

  it("Test adding different device checks", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);
    for (let i = 0; i < 6; i++) {
      devicePostureHelper.addNewDeviceCheck(
        devicePostureHelper.DEVICE_CHECKS_DATA[i]
      );
    }
    devicePostureHelper.assertDeviceChecksTableContent(
      devicePostureHelper.DEVICE_CHECKS_DATA
    );
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);

    // teardown
    // devicePostureHelper.deleteTableContent(
    //   devicePostureHelper.LOCATORS.deviceChecksTable2
    // );
    // devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });

  it("Test add 5 Device Profiles", () => {
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.deviceProfiles
    );
    for (let i = 0; i < 5; i++) {
      devicePostureHelper.addNewDeviceProfil(
        devicePostureHelper.DEVICE_PROFILE_DATA[i]
      );
    }
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });

  it('Test Enable "device3"', () => {
    devicePostureHelper.enableByIndex(2);
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });

  it('Test Disable "device2"', () => {
    devicePostureHelper.disableByIndex(1);
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });

  it.only("Assert unable to delete device check when it being used by device profile ", () => {
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);

    devicePostureHelper.deleteRow(1);
    devicePostureHelper.assertTextContent(
      devicePostureHelper.LOCATORS.dialogContent,
      devicePostureHelper.PAGE_CONTENT_TEXT.unableToDeleteDeviceCheck
    );
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.dialogActionButton
    );
  });

  it("Teardown", () => {
    //teardown
    devicePostureHelper.clickButton(
      devicePostureHelper.LOCATORS.deviceProfiles
    );
    for (let i = 0; i < 5; i++) {
      devicePostureHelper.DeleteByIndex(1);
    }
    devicePostureHelper.assertEmptyTable(
      devicePostureHelper.LOCATORS.deviceProfilesTable
    );
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
    devicePostureHelper.clickButton(devicePostureHelper.LOCATORS.deviceChecks);

    devicePostureHelper.deleteTableContent(
      devicePostureHelper.LOCATORS.deviceChecksTable2
    );
    devicePostureHelper.assertEmptyTable(
      devicePostureHelper.LOCATORS.deviceChecksTable1
    );
    devicePostureHelper.assertSave(devicePostureHelper.MSG.savedSuccessfully);
  });
});
