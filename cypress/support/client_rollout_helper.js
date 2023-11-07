export const LOCATORS = {
  saveButton: '[data-testid="editor-submit-btn"]',
  popUpMessage: "#notistack-snackbar",
  windowsHeadSection: '[data-testid="section"]:nth(0)',
  WindowsBodySection: '[data-testid="section"]:nth(1)',
  macOsHeadSection: '[data-testid="section"]:nth(2)',
  macOsBodySection: '[data-testid="section"]:nth(3)',
  linuxHeadSection: '[data-testid="section"]:nth(4)',
  linuxBodySection: '[data-testid="section"]:nth(5)',
  pauseRollout: '[data-testid="section"]:nth(0) button:nth(0)',
  downloadClient: '[data-testid="section"]:nth(2) button:nth(1)',
  moreInfo: '[data-testid="section"]:nth(4) button:nth(2)',
  dialogPauseButton: '[data-testid="catodialog-dialog"] button:nth(1)',
  dialogTitle: '[data-testid="catodialog-title"]',
  listBox: '[role="tooltip"] .MuiV5-List-root',
  clientVersionInput: ".MuiV5-InputBase-root:nth(5) input",
  upgradePolicy: 'button[data-testid="tabs-btn-upgradePolicyTab"]',
  header: ".MuiV5-CardHeader-root",
  upgradePolicyWindowsClient: '[data-testid="fieldlabel-root"] h6:nth(0)',
  upgradePolicyMacOsClient: '[data-testid="fieldlabel-root"] h6:nth(1)',
  upgradePolicyLinuxClient: '[data-testid="fieldlabel-root"] h6:nth(2)',
  windowsPolicyInput: '[data-testid="select-undefined"]:nth(0)',
  macOsPolicyInput: '[data-testid="select-undefined"]:nth(1)',
  linuxPolicyInput: '[data-testid="select-undefined"]:nth(2)',
  windowsModeInput: '[data-testid="select-controlUpgradePolicy.upgradePolicy"]',
  macOsModeInput:
    '[data-testid="select-controlUpgradePolicy.upgradePolicyMacOS"]',
  linuxModeInput:
    '[data-testid="select-controlUpgradePolicy.upgradePolicyLinux"]',
  listbox2: ".MuiV5-Menu-paper",
  listbox3: ".MuiV5-Autocomplete-popper",
  confirmButton:
    '[data-testid="catodialog-actions"] button.MuiV5-Button-contained',
  pilotGroupButton: 'button[data-testid="tabs-btn-pilotGroup"]',
  dropdownMenu: '[placeholder="Search or select SDP User"]',
  listBoxItem: ".MuiV5-ListItemButton-root",
  sdpUsersTable:
    'table[data-testid="awesometable-table-controlUpgradePolicy.canaryUsers"]',
  deleteButton: 'button[data-testid="table-btn-delete-row"]',
  tableTr: "table tr",
  tbodyTr: "tbody tr",
};
export const SDP_USERS = [
  "Leena34 BaniOdeh",
  "Leena BaniOdeh",
  "raghad.qadah@exalt.ps raghad.qadah@exalt.ps",
  "Leena4 BaniOdeh",
  "Leena5 BaniOdeh",
];

export const PAGE_CONTENT_TEXT = {
  pageTitle: "Client Rollout",
  windowsClient: "Windows Client",
  macOsClient: "macOS Client",
  linuxClient: "Linux Client",
  availableToPilotGroup: "Available to Pilot Group",
  gradualRollout: "Gradual Rollout",
  availableToAllUsers: "Available to All Users",
  recentlyConnected: "Recently connected:",
  dialogPauseText: "Pause Client Rollout - Windows  13.6.102.737 ",
  resumeRollout: "Resume Rollout",
  dialogResumeRollout: "Resume Client Rollout - Windows  13.6.102.737 ",
  pauseRollout: "Pause Rollout",
  downloadPKG: "Download PKG",
  viewUpgradedUsers: "View upgraded users",
  versionReleaseNotes: "Version release notes",
  usersPageTitle: "Cato|Leena-testing - Users",
  upgradePolicyText: "Upgrade Policy",
  policyText: "This policy defines how Clients are upgraded.",
  AutomaticByCato: "Automatic by Cato",
  managedByTheAdmin: "Managed by the Admin",
  switchingAlert:
    "You are switching the Client Upgrade policy from Managed to Automatic Silent. The new policy will start gradually upgrading Clients to the newest version.",
  pilotGroup: "Pilot Group",
  defineGroup:
    "Define a group of SDP Users to be upgraded first. Applies only when using the Automatic by Cato Upgrade Policy.",
  noData: "No data",
};

export const MSG = {
  periodError: "Device posture check interval must be a positive number",
  savedSuccessfully: "Saved successfully",
};

export const MODE = {
  silent: "Silent - Users are notified when the Client starts upgrade",
  userManaged: "User Managed - Users are prompted to start the Client upgrade",
};

export const VERSIONS = {
  windowsVersion: "13.6.102.737",
  macOsVersion: "5.4.0.270",
  linuxVersion: "5.1.119.19",
};

export function assertSave(message) {
  cy.get(LOCATORS.saveButton).click();
  assertPopUpMessage(message);
}

export function assertInputValue(selector, value) {
  cy.get(selector).should("have.value", value);
}

export function getTableRowCount(tableSelector) {
  return cy.get(tableSelector).find(LOCATORS.tbodyTr).its("length");
}

export function assertPopUpMessage(message) {
  cy.get(LOCATORS.popUpMessage)
    .scrollIntoView()
    .should("be.visible")
    .contains(message); //constant
}

export function clickButton(selector) {
  cy.get(selector).click();
}

export function assertTextContent(selector, text) {
  cy.get(selector).should("contain.text", text);
}
export function assertEmptyTable(selector, text) {
  assertTextContent(selector, text);
}

export function assertVisibility(elementSelector, shouldBeVisible = true) {
  if (shouldBeVisible) {
    cy.get(elementSelector).should("be.visible");
  } else {
    cy.get(elementSelector).should("not.be.visible");
  }
}

export function assertElementExistence(elementSelector, shouldExist) {
  if (shouldExist) {
    cy.get(elementSelector).should("exist");
  } else {
    cy.get(elementSelector).should("not.exist");
  }
}

export function assertPageTitle(title) {
  cy.title().should("include", title);
}

export function assertPageURL(url) {
  cy.url().should("contain.text", url);
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    .click({ force: true });
}

export function chooseFromDropDown1(optionText, listSelector) {
  // cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    .click({ force: true });
}

export function assertUpgradePolicyPageContent() {
  assertTextContent(LOCATORS.header, PAGE_CONTENT_TEXT.upgradePolicyText);
  assertTextContent(LOCATORS.header, PAGE_CONTENT_TEXT.policyText);
  assertTextContent(
    LOCATORS.upgradePolicyWindowsClient,
    PAGE_CONTENT_TEXT.windowsClient
  );
  assertTextContent(
    LOCATORS.upgradePolicyMacOsClient,
    PAGE_CONTENT_TEXT.macOsClient
  );
  assertTextContent(
    LOCATORS.upgradePolicyLinuxClient,
    PAGE_CONTENT_TEXT.linuxClient
  );
}

export function assertRolloutStatusPageContent() {
  assertTextContent(
    LOCATORS.windowsHeadSection,
    PAGE_CONTENT_TEXT.windowsClient
  );
  assertTextContent(LOCATORS.windowsHeadSection, VERSIONS.windowsVersion);
  assertTextContent(
    LOCATORS.windowsHeadSection,
    PAGE_CONTENT_TEXT.recentlyConnected
  );
  assertTextContent(
    LOCATORS.WindowsBodySection,
    PAGE_CONTENT_TEXT.availableToAllUsers
  );
  assertTextContent(
    LOCATORS.WindowsBodySection,
    PAGE_CONTENT_TEXT.availableToPilotGroup
  );
  assertTextContent(
    LOCATORS.WindowsBodySection,
    PAGE_CONTENT_TEXT.gradualRollout
  );

  assertTextContent(LOCATORS.macOsHeadSection, PAGE_CONTENT_TEXT.macOsClient);
  assertTextContent(LOCATORS.macOsHeadSection, VERSIONS.macOsVersion);
  assertTextContent(
    LOCATORS.macOsHeadSection,
    PAGE_CONTENT_TEXT.recentlyConnected
  );
  assertTextContent(
    LOCATORS.macOsBodySection,
    PAGE_CONTENT_TEXT.availableToAllUsers
  );
  assertTextContent(
    LOCATORS.macOsBodySection,
    PAGE_CONTENT_TEXT.availableToPilotGroup
  );
  assertTextContent(
    LOCATORS.macOsBodySection,
    PAGE_CONTENT_TEXT.gradualRollout
  );

  assertTextContent(LOCATORS.linuxHeadSection, PAGE_CONTENT_TEXT.linuxClient);
  assertTextContent(LOCATORS.linuxHeadSection, VERSIONS.linuxVersion);
  assertTextContent(
    LOCATORS.linuxHeadSection,
    PAGE_CONTENT_TEXT.recentlyConnected
  );
  assertTextContent(
    LOCATORS.linuxBodySection,
    PAGE_CONTENT_TEXT.availableToAllUsers
  );
  assertTextContent(
    LOCATORS.linuxBodySection,
    PAGE_CONTENT_TEXT.availableToPilotGroup
  );
  assertTextContent(
    LOCATORS.linuxBodySection,
    PAGE_CONTENT_TEXT.gradualRollout
  );
}

export function deleteTableContent(tableSelector, rowCount) {
  // getTableRowCount(tableSelector).then((rowCount) => {
    for (let i = 0; i < rowCount; i++) {
      cy.wait(1500);
      deleteRow(1);
    }
  // });
}
export function deleteRow(index) {
  cy.get(LOCATORS.tableTr).eq(index).find(LOCATORS.deleteButton).click();
}

