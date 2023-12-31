/// <reference types="Cypress"/>
import * as revliteHelper from "../support/revlite_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";
import * as devicePostureHelper from "../support/device_posture_helper.js";
import { aliasQuery, aliasMutation } from "../support/revlite_helper.js";

import { it } from "mocha";
describe("revlite Page", () => {
  // Run this code before each test
  before(() => {
    cy.bypassLogin(
      loginHelper.LOGIN_CREDENTIALS[1].userName,
      loginHelper.LOGIN_CREDENTIALS[1].password,
      loginHelper.SYSTEM_CMA_URL
    );
    loginHelper.navigateToURL(loginHelper.SYSTEM_CMA_URL);
  });

  it('Test enable "Enable End User Feedback" and "Require authentication in office" and check if values matches in Revlite ', () => {
    revliteHelper.enableUserFeedback(true);
    revliteHelper.enableAuthenticationInOffice(true);
    revliteHelper.navigateToRevlite(true);
    revliteHelper.assertCodeSelectorBoolean(
      revliteHelper.PAGE_CONTENT.vpnClientUserFeedbackFromClientEnabled,
      true
    );
    revliteHelper.assertCodeSelectorBoolean(
      revliteHelper.PAGE_CONTENT.vpnClientAuthenticationInOffice,
      true
    );
  });

  it('Test disable "Enable End User Feedback" and "Require authentication in office" and check if values matches in Revlite ', () => {
    loginHelper.navigateToURL(loginHelper.SYSTEM_CMA_URL);
    revliteHelper.enableUserFeedback(false);
    revliteHelper.enableAuthenticationInOffice(false);
    revliteHelper.navigateToRevlite(false);
    revliteHelper.assertCodeSelectorBoolean(
      revliteHelper.PAGE_CONTENT.vpnClientUserFeedbackFromClientEnabled,
      false
    );
    revliteHelper.assertCodeSelectorBoolean(
      revliteHelper.PAGE_CONTENT.vpnClientAuthenticationInOffice,
      false
    );
  });


  it("intercept device checks and validate matching data in revlite", () => {
    revliteHelper.navigateToURL(revliteHelper.DEVICE_CHECKS_URL);
    revliteHelper.interceptingGraphql().then((response) => {
      const formattedArray = revliteHelper.extractionLogic(response, revliteHelper.DEVICE_CHECKS_REVLITE);

      revliteHelper.navigateToRevlite(true);
      revliteHelper.assertContent(formattedArray);
    });

  });

  it.only("Test edit device checks", () => {
    revliteHelper.navigateToURL(revliteHelper.DEVICE_CHECKS_URL);
    devicePostureHelper.addNewDeviceCheck(
      revliteHelper.MODIFIED_CHECK2,
      true
    );
    revliteHelper.assertSave(revliteHelper.MSG.savedSuccessfully);
    revliteHelper.navigateToURL(revliteHelper.DEVICE_CHECKS_URL);
    revliteHelper.interceptingGraphql().then((response) => {
      const formattedArray = revliteHelper.extractionLogic(response, revliteHelper.MODIFIED_DEVICE_CHECKS_REVLITE);

      revliteHelper.navigateToRevlite(true);
      revliteHelper.assertContent(formattedArray);
    });
  });

  it.only("Teardown", () => {
    revliteHelper.navigateToURL(revliteHelper.DEVICE_CHECKS_URL);
    devicePostureHelper.addNewDeviceCheck(
      revliteHelper.CHECK2,
      true
    );
    revliteHelper.assertSave(revliteHelper.MSG.savedSuccessfully);
  });
});
