import { it } from "mocha";

export const LOCATORS = {
  clientConnectivityPolicyButton:
    '[data-testvalue="Client Connectivity Policy"]',
  ruleToggleButton:
    '[data-testid="switch-accessSettings.devicePostureEnabled"]',
  saveButton: '[data-testid="editor-submit-btn"]',
  applyButton: '[data-testid="catobutton-apply"]',
  cancelButton: '[data-testid="catobutton-cancel"]',
  newButton: '[data-testid="catobutton-new"]',
  enablePolicyToggle:
    '[data-testid="switch-accessSettings.alwaysOnPolicyEnabled"]',
  popUpMessage: "#notistack-snackbar",
  general: 'div[data-testid="section"]:contains("General")',
  generalNameField: "#name",
  generalPriorty: "#priority",
  generalEnabled:
    'div[data-testid="section"]:contains("General") .MuiV5-Switch-input',
  userAndGroup: 'div[data-testid="section"]:nth-child(3)',
  userAndGroupDropdownMenu1:
    '[data-testid="section"]:nth-child(3) [placeholder="Search or select "]',
  userAndGroupDropdownMenu2:
    '[data-testid="section"]:nth-child(3) [data-testid="entityfield-value"]',
  userAndGroupListBox:
    '[data-testid^="actionsmenulist-menu-action"], [class="MuiAutocomplete-popper"] [role="button"], .MuiV5-Autocomplete-popper div[role="button"], .MuiAutocomplete-listbox li',
  platform: 'div[data-testid="section"]:nth-child(4)',
  platformDropDownMenu1:
    '[data-testid="section"]:nth-child(4) [placeholder="Search or select "]',
  platformDropDownMenu2:
    '[data-testid="section"]:nth-child(4) [data-testid="entityfield-value"]',
  countries: 'div[data-testid="section"]:nth-child(5)',
  countriesDropDownMenu1:
    '[data-testid="section"]:nth-child(5) [placeholder="Search or select "]',
  countriesDropDownMenu2:
    '[data-testid="section"]:nth-child(5) [data-testid="entityfield-value"]',
  devicePostureProfiles: 'div[data-testid="section"]:nth-child(6)',
  devicePostureProfilesDropDownMenu1:
    '[data-testid="section"]:nth-child(6) [placeholder="Search or select "]',
  devicePostureProfilesDropDownMenu2:
    '[data-testid="section"]:nth-child(6) [data-testid="entityfield-value"]',
  action: 'div[data-testid="section"]:nth-child(7)',
  actionDropDownMenu:
    'div[data-testid="section"]:nth-child(7) [data-testid="select-action"]',
  actionListBox: '[role="listbox"]',
  applyButton: '[data-testid="catobutton-apply"]',
  listBox: ".MuiV5-Autocomplete-popper",
  tableTr: "table tr",
  tbodyTr: "tbody tr",
  ariaInvalid: "aria-invalid",
  roleOption: '[role="option"]',
  //options
  optionsButton: "div.MuiV5-Box-root button.MuiV5-IconButton-sizeSmall",
  optionsBox: ".MuiV5-Popper-root",
  confirmDeleteButton: "button.MuiButton-contained",
  enableRulesToggleButton: ".MuiV5-Switch-root > .MuiV5-Switch-switchBase input",
  confirmEnableRuleButton: '[data-testid="catodialog-actions"] button.MuiV5-Button-contained',
  ruleTable1:
  '[data-testid="awesometable-table-device_rules"] tbody tr',
};

export const PAGE_CONTENT_TEXT = {
  noData: "No data",
  country: "Country",
};

export const MSG = {
  periodError: "Device posture check interval must be a positive number",
  savedSuccessfully: "Saved successfully",
};

export const OPTIONS = {
  delete: "Delete Rule",
  enable: "Enable",
  disable: "Disable",
};

export const CLIENT_POLICY_DATA = [
  {
    ruleName: "rule1",
    ruleOrder: "1",
    enabled: true,
    usersAndGroups: [
      { type: "SDP User", value: "Leena34 BaniOdeh" },
      //   { type: "User Group", value: "Group1" },
    ],
    platforms: [
      { type: "Operating System", value: "Windows" },
      //   { type: "Operating System", value: "Android" },
    ],
    countries: [
      { type: "Country", value: "Oman" },
      { type: "Country", value: "Palestine" },
      { type: "Country", value: "Qatar" },
    ],
    devicePostureProfiles: [
      { type: "Device Profile", value: "device profile1" },
      { type: "Device Profile", value: "device profile5" },
    ],
    action: "Allow",
  },
  {
    ruleName: "rule2",
    ruleOrder: "2",
    enabled: true,
    usersAndGroups: [
      { type: "SDP User", value: "Leena BaniOdeh" },
      { type: "User Group", value: "Group2" },
    ],
    platform: [],
    countries: [
      { type: "Country", value: "Oman" },
      { type: "Country", value: "Palestine" },
    ],
    devicePostureProfiles: [
      { type: "Device Profile", value: "device profile2" },
      { type: "Device Profile", value: "device profile4" },
    ],
    action: "Block",
  },
  {
    ruleName: "rule3",
    ruleOrder: "3",
    enabled: true,
    usersAndGroups: [],
    platforms: [
      { type: "Operating System", value: "macOS" },
      { type: "Operating System", value: "iOS" },
    ],
    countries: [
      { type: "Country", value: "Oman" },
      { type: "Country", value: "Palestine" },
      { type: "Country", value: "Qatar" },
    ],
    devicePostureProfiles: [],
    action: "Allow",
  },
];

export function navigateToclientConnectivityPolicy() {
  cy.get(LOCATORS.clientConnectivityPolicyButton).click();
}

export function assertTextContent(selector, text) {
  cy.get(selector).should("contain.text", text);
}
export function assertEmptyTable(selector) {
  assertTextContent(selector, PAGE_CONTENT_TEXT.noData);
}
LOCATORS.deviceChecksTable1;
export function assertVisibility(selector) {
  cy.get(selector).should("be.visible");
}

export function setRadioButtonState(selector, targetValue) {
  cy.get(selector)
    .should("have.attr", "value")
    .then((currentValue) => {
      console.log(currentValue);
      const isCurrentChecked = currentValue === "true";

      if (isCurrentChecked !== targetValue) {
        cy.get(selector).click();
      }
    });
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
}

export function expandDropdownIfNotExpanded(selector) {
  cy.get(selector).then(($dropdown) => {
    if (!$dropdown.hasClass(LOCATORS.expandedList)) {
      // If it's not expanded, click on it to expand
      cy.get(selector).click();
    }
  });
}

export function typeValidInput(selector, input) {
  cy.get(selector).clear().type(input).should("have.value", input);
  cy.get(selector).should("have.attr", LOCATORS.ariaInvalid, "false");
}

export function assertSave(message) {
  cy.get(LOCATORS.saveButton).click();
  assertPopUpMessage(message);
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

export function typeInvalidInput(selector, value, helperMsg) {
  //arg message
  cy.get(selector).clear().type(value);
  cy.get(LOCATORS.body).click();
  cy.get(selector)
    .should("have.attr", LOCATORS.ariaInvalid, "true")
    .invoke("attr", LOCATORS.ariaDescribedBy)
    .then((ariaDescribedBy) => {
      cy.get(`[id="${ariaDescribedBy}"]`).should("contain", helperMsg);
    });
}

export function addNewRule(ruleData) {
  clickNewButton();
  fillGeneralSection(ruleData);
  fillSection(ruleData.usersAndGroups, {
    container: LOCATORS.userAndGroup,
    dropdownMenu1: LOCATORS.userAndGroupDropdownMenu1,
    dropdownMenu2: LOCATORS.userAndGroupDropdownMenu2,
    listBox: LOCATORS.listBox,
  });

  fillSection(ruleData.platforms, {
    container: LOCATORS.platform,
    dropdownMenu1: LOCATORS.platformDropDownMenu1,
    dropdownMenu2: LOCATORS.platformDropDownMenu2,
    listBox: LOCATORS.listBox,
  });

  fillSection(ruleData.countries, {
    container: LOCATORS.countries,
    dropdownMenu1: LOCATORS.countriesDropDownMenu1,
    dropdownMenu2: LOCATORS.countriesDropDownMenu2,
    listBox: LOCATORS.listBox,
  });

  fillSection(ruleData.devicePostureProfiles, {
    container: LOCATORS.devicePostureProfiles,
    dropdownMenu1: LOCATORS.devicePostureProfilesDropDownMenu1,
    dropdownMenu2: LOCATORS.devicePostureProfilesDropDownMenu2,
    listBox: LOCATORS.listBox,
  });
  fillActionSection(ruleData.action);
  clickApplyButton();
}

function clickNewButton() {
  cy.get(LOCATORS.newButton).click();
}

function fillGeneralSection(ruleData) {
  expandDropdownIfNotExpanded(LOCATORS.general);
  typeValidInput(LOCATORS.generalNameField, ruleData.ruleName);
  typeValidInput(LOCATORS.generalPriorty, ruleData.ruleOrder);
  setRadioButtonState(LOCATORS.generalEnabled, ruleData.enabled);
}

function fillActionSection(action) {
  expandDropdownIfNotExpanded(LOCATORS.action);
  chooseFromDropDown(
    LOCATORS.actionDropDownMenu,
    action,
    LOCATORS.actionListBox
  );
}

function clickApplyButton() {
  cy.get(LOCATORS.applyButton).click();
}

function fillSection(sectionData, sectionLocators) {
  if (sectionData) {
    expandDropdownIfNotExpanded(sectionLocators.container);
    cy.wrap(sectionData).each((element) => {
      chooseFromDropDown(
        sectionLocators.dropdownMenu1,
        element.type,
        sectionLocators.listBox
      );
      chooseFromDropDown(
        sectionLocators.dropdownMenu2,
        element.value,
        sectionLocators.listBox
      );
    });
  }
}

export function chooseOption(rowIndex, option) {
  cy.get(LOCATORS.tableTr).eq(rowIndex).find(LOCATORS.optionsButton).click();
  cy.get(LOCATORS.optionsBox).contains(option).click();
}

export function DeleteByIndex(rowIndex) {
  chooseOption(rowIndex, OPTIONS.delete);
  clickButton(LOCATORS.confirmDeleteButton);
}

export function enableByIndex(rowIndex) {
  chooseOption(rowIndex, OPTIONS.enable);
}

export function disableByIndex(rowIndex) {
  chooseOption(rowIndex, OPTIONS.disable);
}

export function assertNumberOfOptions(
  dropdownMenuSelector,
  listboxSelector,
  expectedCount
) {
  cy.get(dropdownMenuSelector).click();
  cy.get(listboxSelector)
    .find(LOCATORS.roleOption)
    .should("have.length", expectedCount);
}
