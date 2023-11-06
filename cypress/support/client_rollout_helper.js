export const LOCATORS = {
  saveButton: '[data-testid="editor-submit-btn"]',
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
  clientVersionInput:".MuiV5-InputBase-root:nth(5) input"

};

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
  viewUpgradedUsers:"View upgraded users",
  versionReleaseNotes:"Version release notes",
};

export const IPs = {
  windowsIp: "13.6.102.737",
  macOsIp: "5.4.0.270",
  linuxIp: "5.1.119.19",
};

export function assertSave(message) {
  cy.get(LOCATORS.saveButton).click();
  assertPopUpMessage(message);
}

export function assertInputValue(selector, value){
    cy.get(selector).should('have.value', value)
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
export function assertEmptyTable(selector) {
  assertTextContent(selector, PAGE_CONTENT_TEXT.noData);
}

export function assertVisibility(selector) {
  cy.get(selector).should("be.visible");
}

export function assertPageTitle(title){
    cy.title().should('contain.text', title)
}

export function assertPageURL(url){
    cy.url().should('contain.text', url)
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    .click({ force: true });
}

export function assertPageContent() {
  assertTextContent(
    LOCATORS.windowsHeadSection,
    PAGE_CONTENT_TEXT.windowsClient
  );
  assertTextContent(LOCATORS.windowsHeadSection, IPs.windowsIp);
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
  assertTextContent(LOCATORS.macOsHeadSection, IPs.macOsIp);
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
  assertTextContent(LOCATORS.linuxHeadSection, IPs.linuxIp);
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
