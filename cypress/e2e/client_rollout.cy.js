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
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    clientRolloutHelper.assertUpgradePolicyPageContent();
  });

  it("Assert default values", () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
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
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    //WINDOWS
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      true
    );
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.windowsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      false
    );
    //MACos
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      true
    );
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.macOsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      false
    );
    //linux
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      true
    );
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.linuxPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.managedByTheAdmin,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      false
    );

    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
  });
  it('Assert switching alert when changing from "Managed by the Admin" to "Automatic by Cato" ', () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    //Windows
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.windowsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.confirmButton);
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      true
    );
    //MacOs
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.macOsPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.confirmButton);
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      true
    );
    //linux
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.linuxPolicyInput,
      clientRolloutHelper.PAGE_CONTENT_TEXT.AutomaticByCato,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.confirmButton);
    clientRolloutHelper.assertElementExistence(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      true
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
  });

  it('assert changing Mode to "User Managed"', () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.MODE.userManaged,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.MODE.userManaged
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.MODE.userManaged
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.MODE.userManaged
    );
  });

  it('Test set back Mode to "silent"', () => {
    clientRolloutHelper.clickButton(clientRolloutHelper.LOCATORS.upgradePolicy);
    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.listbox2
    );

    clientRolloutHelper.chooseFromDropDown(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.MODE.silent,
      clientRolloutHelper.LOCATORS.listbox2
    );
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.windowsModeInput,
      clientRolloutHelper.MODE.silent
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.macOsModeInput,
      clientRolloutHelper.MODE.silent
    );

    clientRolloutHelper.assertTextContent(
      clientRolloutHelper.LOCATORS.linuxModeInput,
      clientRolloutHelper.MODE.silent
    );
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
    cy.reload()
    clientRolloutHelper.deleteTableContent(clientRolloutHelper.LOCATORS.sdpUsersTable, 5)
    clientRolloutHelper.assertSave(clientRolloutHelper.MSG.savedSuccessfully);
    clientRolloutHelper.assertEmptyTable(
      clientRolloutHelper.LOCATORS.sdpUsersTable,
      clientRolloutHelper.PAGE_CONTENT_TEXT.noData
    );
  });
});
