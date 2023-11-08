/// <reference types="Cypress"/>
import * as clientRolloutHelper from "../support/client_rollout_helper";
import * as loginHelper from "../support/login_to_system_helper.js";

import { it } from "mocha";
describe("Ckient Rollout Page", () => {
  // Run this code before each test
  before(() => {

    cy.bypassLogin(
      loginHelper.LOGIN_CREDENTIALS[0].userName,
      loginHelper.LOGIN_CREDENTIALS[0].password
    );
    loginHelper.navigateToURL(loginHelper.CLIENT_ROLLOUT_URL);

  });

  it("Test Assert Rollout Status Page content", () => {
    clientRolloutHelper.assertRolloutStatusPageContent();
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

  it('Test "More Info" button', () => {
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
    clientRolloutHelper.assertPageTitle(
      clientRolloutHelper.PAGE_CONTENT_TEXT.usersPageTitle
    );
    clientRolloutHelper.assertInputValue(
      clientRolloutHelper.LOCATORS.clientVersionInput,
      clientRolloutHelper.VERSIONS.linuxVersion
    );
  });

  it("Test Assert Upgrade Policy Page Content", () => {
    loginHelper.navigateToURL(loginHelper.CLIENT_ROLLOUT_UPGRADE_POLICY);
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    clientRolloutHelper.assertUpgradePolicyPageContent();
  });

  it("Assert default values", () => {
    //windows
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.windowsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.MODE.silent
    );
    //macOs
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.macOsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.MODE.silent
    );
    //linux
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.linuxPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.MODE.silent
    );
  });

  it('Test the disappearance of Mode dropMenu when the policy is set to "Managed by the Admin"', () => {
    //WINDOWS
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.LOCATORS.windowsPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    //MACos
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.LOCATORS.macOsPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    //linux
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.LOCATORS.linuxPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
    cy.reload();
  });
  it('Assert switching alert when changing from "Managed by the Admin" to "Automatic by Cato" ', () => {
    //Windows
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.LOCATORS.windowsPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    //MacOs
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.LOCATORS.macOsPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    //linux
    clientRolloutHelper.changePolicy(
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.LOCATORS.linuxPolicyInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it('assert changing Mode to "User Managed"', () => {

    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);

    cy.reload();
  });

  it('Test set back Mode to "silent"', () => {

    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.changeMode(
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);

    cy.reload();
  });

  it('Assert "Pilot Group" page content and # of SDP Users in listBox ', () => {
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.pilotGroupButton
    );
    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.header,
      clientRolloutHelper.PAGE_CONTENT_TEXT.pilotGroup
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.header,
      clientRolloutHelper.PAGE_CONTENT_TEXT.defineGroup
    );
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.dropdownMenu);
    // Assert the number of items in the list box
    cy.get(clientRolloutHelper.LOCATORS.listbox3)
      .find(clientRolloutHelper.LOCATORS.listBoxItem)
      .should("have.length", 5);
  });
  it("Test add all SDP Users", () => {
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.pilotGroupButton
    );
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.dropdownMenu);
    clientRolloutHelper.SDP_USERS.forEach((user) => {
      clientRolloutHelper.chooseFromDropDown1(
        user,
        clientRolloutHelper.LOCATORS.listbox3
      );
    });
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
  });

  it("Test Remove all SDP Users", () => {
    clientRolloutHelper.clickButton(
      clientRolloutHelper.LOCATORS.pilotGroupButton
    );
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.dropdownMenu);
    clientRolloutHelper.SDP_USERS.forEach((user) => {
      clientRolloutHelper.chooseFromDropDown1(
        user,
        clientRolloutHelper.LOCATORS.listbox3
      );
    });
    clientRolloutHelper.assertEmptyTable(
      clientRolloutHelper.LOCATORS.sdpUsersTable,
      clientRolloutHelper.PAGE_CONTENT_TEXT.noData
    );
    cy.reload();
    clientRolloutHelper.deleteTableContent(
      clientRolloutHelper.LOCATORS.sdpUsersTable,
      5
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
    clientRolloutHelper.assertEmptyTable(
      clientRolloutHelper.LOCATORS.sdpUsersTable,
      clientRolloutHelper.PAGE_CONTENT_TEXT.noData
    );
  });

});
