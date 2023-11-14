export const LOCATORS = {
  devicePostureButton: '[data-testvalue="Device Posture"]',
  devicePosture: "#page-title",
  settings: '[data-testid="tabs-btn-settings"]',
  deviceChecks: '[data-testid="tabs-btn-tests"]',
  deviceProfiles: '[data-testid="tabs-btn-profiles"]',
  alertMessage: ".MuiV5-Alert-message",
  settingsSaveButton: '[data-testid="editor-submit-btn"]',
  settingsText: ".MuiV5-Box-root .MuiV5-Box-root",
  picker:
    '[data-testid="catotextinputfield-root-accessSettings.checkInterval"] input',
  newButton: '[data-testid="catobutton-new"]',
  ariaInvalid: "aria-invalid",
  popUpMessage: "#notistack-snackbar",
  general: 'div[data-testid="section"]:contains("General")',
  vendor: 'div[data-testid="section"]:contains("Vendor")',
  criteria: 'div[data-testid="section"]:contains("Criteria")',
  deviceTypelistBox: ".MuiV5-List-root li",
  listBox: ".MuiV5-Autocomplete-popper",
  deviceNumberListBox: ".MuiV5-Autocomplete-listbox",
  applyButton: '[data-testid="catobutton-apply"]',
  cancelButton: '[data-testid="catobutton-cancel"]',
  //General
  nameField: "#name",
  deviceTestType: '[data-testid="catotextinputfield-root-type"]',
  descriptionField: "#description",
  //Vendor
  osField: '[placeholder="Search or select Operating System"]',
  vendorField:
    '[data-testid="entityautocompletefieldprops-inputproducts.0.vendor"]',
  productField:
    '[data-testid="entityautocompletefieldprops-inputproducts.0.product"]',
  versionField: '[data-testid="select-products.0.operator"]',
  versionNumberField: '[placeholder="Search or select Version"]',
  //Criteria
  inputCheckBox: 'input[type="checkbox"]',
  realTimeCheckBox: '[data-testid="checkbox-realTimeProtection"]',
  bypassDeviceCheckBox: '[data-testid="checkbox-allowUnsupportedClients"]',
  driverField: '[data-testid="entityfield-value"] input',
  addDriverButton: ".MuiV5-InputAdornment-root button",
  driverTable: '[data-testid="awesometable-table-paths"]',
  //table
  deviceChecksTable1:
    '[data-testid="awesometable-table-device_tests"] tbody tr',
  deviceChecksTable2: '[data-testid="awesometable-table-device_tests"]',
  deviceProfilesTable: '[data-testid="table-no-items"]',
  nameCell: '[data-testid="device_tests-row-cell-name"]',
  categoryCell: '[data-testid="device_tests-row-cell-category"]',
  criteriaCell: '[data-testid="device_tests-row-cell-criteria"]',
  vendorCell: '[data-testid="device_tests-row-cell-vendor"]',
  descriptionCell: '[data-testid="device_tests-row-cell-description"]',
  saveButton: '[data-testid="editor-submit-btn"]',
  deleteButton: 'button[data-testid="table-btn-delete-row"]',
  tableTr: "table tr",
  tbodyTr: "tbody tr",

  //Device Profile Page
  //general
  generalSection: '[data-testid="device-profile-sections-message"]',
  toggleButton: ".MuiV5-Switch-input",
  //device checks
  deviceChecksField: '[placeholder="Search or select "]',
  deviceChecksProfile: '[data-testid="device-profile-sections-tests"]',
  devicesField: '[data-testid="entityfield-value"]',
  //options
  optionsButton: "div.MuiV5-Box-root button.MuiV5-IconButton-sizeSmall",
  optionsBox: ".MuiV5-Popper-root",
  confirmDeleteButton: "button.MuiButton-contained",
  createDeviceChecksButton: '[data-testid="tabs-content-profiles"] button',
  noDeviceChecksConfigText1: '[data-testid="tabs-content-profiles"] h4',
  noDeviceChecksConfigText2: '[data-testid="tabs-content-profiles"] p',
  stayButton: '[data-testid="catobutton-generic"]:nth(0)',
  continueButton: '[data-testid="catobutton-generic"]:nth(1)',
  dialogTitle: '[data-testid="catodialog-title"]',
  dialogContent: '[data-testid="catodialog-content"]',
  dialogActionButton:'[data-testid="catodialog-actions"] button'
};

export const TYPES = [
  "Anti-malware",
  "Firewall",
  "Disk Encryption",
  "Patch Management",
  "Device Certificate",
];

export const PERIODS = ["-4", "0", "20"];
const realTimeProtectionEnabled = "real time protection enabled";

export const PAGE_CONTENT_TEXT = {
  pageTitle: "Device Posture",
  deviceChecks: "Device Checks",
  devicePostureProfiles: "Device Posture Profiles",
  settings: "Settings",
  alertMessage:
    "Client periodic checks are supported for Windows and Mac Clients v5.2 and higher",
  settingsText1: "Client periodically checks for Device Posture every",
  settingsText2: "minutes. (0 means periodic check is disabled)",
  noData: "No data",
  noDeviceChecksConfigured: "No Device Checks configured",
  configureAtLeastOneDevice:
    "Configure at least one Device Check before you create a Device Profile",
  deviceChecksCuurentTab: "currentTab=%22tests%22",
  settingsCurrentTab: "currentTab=%22settings%22",
  continueWithoutSaving: "Continue without save?",
  unableToDeleteDeviceCheck:
    "Can’t delete – the Device Check is used in one or more profiles. \n Please remove it from the profiles and then delete it.",
  unableToDeleteDeviceProfile:
    "Can’t delete – the profile is used in one or more rules.\n Please remove this profile from the rules and then delete it",
};

export const MSG = {
  periodError: "Device posture check interval must be a positive number",
  savedSuccessfully: "Saved successfully",
};

export const OPTIONS = {
  delete: "Delete",
  enable: "Enable",
  disable: "Disable",
};

export const DEVICE_PROFILE_DATA = [
  {
    //General
    name: "device profile1",
    description: "description1",
    enabled: false,
    //Device Checks
    deviceChecksType: "Anti-Malware",
    devices: ["device1", "device6"],
  },
  {
    //General
    name: "device profile2",
    description: "description2",
    enabled: true,
    //Device Checks
    deviceChecksType: "Firewall",
    devices: ["device2"],
  },
  {
    //General
    name: "device profile3",
    description: "description3",
    enabled: true,
    //Device Checks
    deviceChecksType: "Disk Encryption",
    devices: ["device3"],
  },
  {
    //General
    name: "device profile4",
    description: "description4",
    enabled: true,
    //Device Checks
    deviceChecksType: "Patch Management",
    devices: ["device4"],
  },
  {
    //General
    name: "device profile5",
    description: "description5",
    enabled: true,
    //Device Checks
    deviceChecksType: "Device Certificate",
    devices: ["device5"],
  },
];

export const DEVICE_CHECKS_DATA = [
  {
    //General
    deviceTestType: "Anti-malware",
    name: "device1",
    description: "description1",
    //Vendor
    os: "Linux",
    vendor: "Cisco Systems, Inc.",
    product: "ClamAV",
    version: "any version", //versionNumber will disappear
    versionNumber: "",
    //Criteria
    realTimeProtectionEnabled: true,
    bypassDeviceCheckforunsupportedSDPClients: true,
  },
  {
    //General
    deviceTestType: "Firewall",
    name: "device2",
    description: "description2",
    //Vendor
    os: "macOS",
    vendor: "Apple Inc.",
    product: "Mac OS X Builtin Firewall",
    version: "equals",
    versionNumber: "12.2.X",
    //Criteria
    bypassDeviceCheckforunsupportedSDPClients: false,
  },
  {
    //General
    deviceTestType: "Disk Encryption",
    name: "device3",
    description: "description3",
    driverPath: "C:\\",
    bypassDeviceCheckforunsupportedSDPClients: true,
  },
  {
    //General
    deviceTestType: "Patch Management",
    name: "device4",
    description: "description4",
    //Vendor
    os: "Windows",
    vendor: "Dell Inc.",
    product: "Dell KACE Agent",
    version: "equals or higher than",
    versionNumber: "9.0.X",
    //Criteria
    bypassDeviceCheckforunsupportedSDPClients: true,
  },
  {
    //General
    deviceTestType: "Device Certificate",
    name: "device5",
    description: "description5",
    bypassDeviceCheckforunsupportedSDPClients: true,
  },
  {
    //General
    deviceTestType: "Anti-malware",
    name: "device6",
    description: "description6",
    //Vendor
    os: "Linux",
    vendor: "Cisco Systems, Inc.",
    product: "ClamAV",
    version: "any version", //versionNumber will disappear
    versionNumber: "",
    //Criteria
    realTimeProtectionEnabled: true,
    bypassDeviceCheckforunsupportedSDPClients: true,
  },
];

export function assertPageURL(url) {
  cy.url().should("include", url);
}

export function navigateToDevicePosture() {
  cy.get(LOCATORS.devicePostureButton).click();
}

export function assertSettingsPageContent() {
  assertTextContent(LOCATORS.devicePosture, PAGE_CONTENT_TEXT.pageTitle);
  assertTextContent(
    LOCATORS.deviceProfiles,
    PAGE_CONTENT_TEXT.devicePostureProfiles
  );
  assertTextContent(LOCATORS.deviceChecks, PAGE_CONTENT_TEXT.deviceChecks);
  assertTextContent(LOCATORS.settings, PAGE_CONTENT_TEXT.settings);
  clickButton(LOCATORS.settings);
  assertTextContent(LOCATORS.alertMessage, PAGE_CONTENT_TEXT.alertMessage);
  assertTextContent(LOCATORS.settingsText, PAGE_CONTENT_TEXT.settingsText1);
  assertTextContent(LOCATORS.settingsText, PAGE_CONTENT_TEXT.settingsText2);
  assertVisibility(LOCATORS.settingsSaveButton);
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
    .click();
}

export function addNewDeviceCheck(data) {
  cy.get(LOCATORS.newButton).click();
  expandDropdownIfNotExpanded(LOCATORS.general);
  fillGeneralSection(data);
  fillVendorSection(data);
  fillCriteriaSection(data);
  clickButton(LOCATORS.applyButton);
}

function fillGeneralSection(data) {
  chooseFromDropDown(
    LOCATORS.deviceTestType,
    data.deviceTestType,
    LOCATORS.deviceTypelistBox
  );
  typeValidInput(LOCATORS.nameField, data.name);
  if (data.description !== "") {
    typeValidInput(LOCATORS.descriptionField, data.description);
  }
}

function fillVendorSection(data) {
  if (data.deviceTestType !== TYPES[2] && data.deviceTestType !== TYPES[4]) {
    expandDropdownIfNotExpanded(LOCATORS.vendor);
    chooseFromDropDown(LOCATORS.osField, data.os, LOCATORS.listBox);
    chooseFromDropDown(LOCATORS.vendorField, data.vendor, LOCATORS.listBox);
    chooseFromDropDown(LOCATORS.productField, data.product, LOCATORS.listBox);
    chooseFromDropDown(
      LOCATORS.versionField,
      data.version,
      LOCATORS.deviceTypelistBox
    );
    if (data.version !== "any version") {
      chooseFromDropDown(
        LOCATORS.versionNumberField,
        data.versionNumber,
        LOCATORS.deviceNumberListBox
      );
    }
  }
}

function fillCriteriaSection(data) {
  expandDropdownIfNotExpanded(LOCATORS.criteria);
  setCheckbox(
    LOCATORS.bypassDeviceCheckBox,
    data.bypassDeviceCheckforunsupportedSDPClients
  );

  if (data.deviceTestType === TYPES[0]) {
    //"Anti-malware"
    setCheckbox(LOCATORS.realTimeCheckBox, data.realTimeProtectionEnabled);
  }

  if (data.deviceTestType === TYPES[2]) {
    //"Disk Encryption"
    typeValidInput(LOCATORS.driverField, data.driverPath);
    clickButton(LOCATORS.addDriverButton);
    assertTextContent(LOCATORS.driverTable, data.driverPath);
  }
}

export function setCheckbox(selector, value) {
  if (value) {
    cy.get(selector).find(LOCATORS.inputCheckBox).check({ force: true });
  } else {
    cy.get(selector).find(LOCATORS.inputCheckBox).uncheck({ force: true });
  }
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

export function deleteRow(index) {
  cy.get(LOCATORS.tableTr).eq(index).find(LOCATORS.deleteButton).click();
}

export function getTableRowCount(tableSelector) {
  return cy.get(tableSelector).find(LOCATORS.tbodyTr).its("length");
}

export function deleteTableContent(tableSelector) {
  getTableRowCount(tableSelector).then((rowCount) => {
    for (let i = 0; i < rowCount; i++) {
      cy.wait(1500);
      deleteRow(1);
    }
  });
}

export function assertDeviceChecksTableContent(data) {
  cy.get(LOCATORS.deviceChecksTable1).each((row, index) => {
    const rowData = data[index];
    if (!rowData) return; // Skip if rowData is undefined

    const assertTextCaseInsensitive = (elementSelector, expectedText) => {
      cy.wrap(row)
        .find(elementSelector)
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.equal(expectedText.toLowerCase());
        });
    };
    // Assert the "Name" column
    assertTextCaseInsensitive(LOCATORS.nameCell, rowData.name);

    // Assert the "Category" column
    assertTextCaseInsensitive(LOCATORS.categoryCell, rowData.deviceTestType);

    // Assert the "Criteria" column if realTimeProtectionEnabled is true
    if (rowData.realTimeProtectionEnabled) {
      assertTextCaseInsensitive(
        LOCATORS.criteriaCell,
        realTimeProtectionEnabled
      );
    }
    // Check if the "Vendor" property exists in rowData
    if (rowData.vendor) {
      cy.wrap(row).find(LOCATORS.vendorCell).should("exist");
      assertTextCaseInsensitive(LOCATORS.vendorCell, rowData.vendor);
    }
    // Assert the "Description" column
    assertTextCaseInsensitive(LOCATORS.descriptionCell, rowData.description);
  });
}

export function addNewDeviceProfil(data) {
  cy.get(LOCATORS.newButton).click();
  //General
  expandDropdownIfNotExpanded(LOCATORS.generalSection);
  typeValidInput(LOCATORS.nameField, data.name);
  if (data.description !== "") {
    typeValidInput(LOCATORS.descriptionField, data.description);
  }
  setRadioButtonState(LOCATORS.toggleButton, data.enabled);

  //Device checks
  expandDropdownIfNotExpanded(LOCATORS.deviceChecksProfile);
  chooseFromDropDown(
    LOCATORS.deviceChecksField,
    data.deviceChecksType,
    LOCATORS.listBox
  );
  cy.wrap(data.devices).each((device) => {
    chooseFromDropDown(LOCATORS.devicesField, device, LOCATORS.listBox);
  });
  clickButton(LOCATORS.applyButton);
}

export function chooseOption(rowIndex, option) {
  // Select the three-dot option in the specified row and click it
  cy.get(LOCATORS.tableTr)
    .eq(rowIndex) // Select the specific row by index
    .find(LOCATORS.optionsButton)
    .click();
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
