/// <reference types="Cypress"/>
import * as clientRolloutHelper from "../support/client_rollout_helper";
import * as loginHelper from "../support/login_to_system_helper.js";

import { it } from "mocha";
describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMAUsingDirectURL(
      loginHelper.LOGIN_CREDENTIALS,
      loginHelper.CLIENT_ROLLOUT_URL
    );
  });

  it("Test Assert Page content", () => {
    clientRolloutHelper.assertPageContent();
  });

  it('Test "Pause Rollout" button', () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.pauseRollout);
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.dialogTitle,
      clientRolloutHelper.PAGE_CONTENT_TEXT.dialogPauseText
    );
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.dialogPauseButton
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.pauseRollout,
      clientRolloutHelper.PAGE_CONTENT_TEXT.resumeRollout
    );

    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.pauseRollout);
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.dialogTitle,
      clientRolloutHelper.PAGE_CONTENT_TEXT.dialogResumeRollout
    );
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.dialogPauseButton
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.pauseRollout,
      clientRolloutHelper.PAGE_CONTENT_TEXT.pauseRollout
    );
  });

  it('Test "Download Client" button', () => {
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.downloadClient
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.listBox,
      clientRolloutHelper.PAGE_CONTENT_TEXT.downloadPKG
    );
  });

  it.only('Test "More Info" button', () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.moreInfo);
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.listBox,
      clientRolloutHelper.PAGE_CONTENT_TEXT.versionReleaseNotes
    );

    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.moreInfo,
      clientRolloutHelper.PAGE_CONTENT_TEXT.viewUpgradedUsers,
      clientRolloutHelper.LOCATORS.listBox
    );

    clientRolloutHelper.assertInputValue(
      clientRolloutHelper.LOCATORS.clientVersionInput,
      clientRolloutHelper.IPs.linuxIp
    );
  });
});
