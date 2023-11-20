export const LOCATORS = {
  saveButton: '[data-testid="editor-submit-btn"]',
  popUpMessage: "#notistack-snackbar",
  authentication: '[data-testid="section"]:nth(0)',
  deviceAuthentication: '[data-testid="section"]:nth(1)',
  windowsRadioGroup:
    "radio-group-vpnAuthentication.vpnClientBrowserConfiguration.windows",
  defaultMethod: '[data-testid="select-vpnAuthentication.authMethod"]',
  listBox: ".MuiV5-Menu-paper",
  listBox2: ".MuiV5-Autocomplete-popper",
  macOsRadioGroup:
    "radio-group-vpnAuthentication.vpnClientBrowserConfiguration.macOs",
  dialog: '[data-testid="catodialog-content"]',
  modeInput:
    '[data-testid="select-vpnAuthentication.mfaConfiguration.mfaMode"]',
  authenticationMethodInput:
    '[data-testid="select-vpnAuthentication.mfaConfiguration.mfaAuthMethod"]',
  durationInput:
    '[data-testid="select-vpnAuthentication.mfaConfiguration.cookieSettings.enforceCookieDuration"]',
  numberInput:
    '[data-testid="catotextinputfield-root-vpnAuthentication.mfaConfiguration.cookieSettings.cookieDuration"] input',
  timeUnitField:
    '[data-testid="select-vpnAuthentication.mfaConfiguration.cookieSettings.cookieTimeUnit"]',
  okButton: '[data-testid="catobutton-generic"]:nth(1)',
  closeButton: '[data-testid="catobutton-generic"]',
  ariaInvalid: "aria-invalid",
  blockedOperatingSystems: '[data-testid="entityfield-value"]:nth(0)',
  operatingSystemsThatRequireACertificate:
    '[data-testid="entityfield-value"]:nth(1)',
  tableTr: "table tr",
  tbodyTr: "tbody tr",
  deleteButton: 'button[data-testid="table-btn-delete-row"]',
  name: "#systemName",
  osTable:
    '[data-testid="awesometable-table-deviceAuthentication.blockedOsTypes"]',
  osCertificateTable:
    '[data-testid="awesometable-table-deviceAuthentication.requiredCertificateOsTypes"]',
  newButton: '[data-testid="section"]:nth(1) [data-testid="catobutton-new"]',
  tableError: '[data-testid="table-error"]',
  inputFile: "input[type=file]",
  certificateTable:
    '[data-testid="awesometable-table-account-device-auth-edit"]',
  showDetails: '.MuiV5-TableCell-body a:contains("Show Details")',
  tableRow: "tbody tr.MuiV5-TableRow-hover",
  radioGroup:'input[type="radio"]',
  selectClass:".MuiV5-Select-select"
};

export const PAGE_CONTENT = {
  ssoConfirmationText:
    "Enabling SSO and Always-On is supported from the following Client versions: Windows v5.3 and macOS, Android, iOS, Linux v5.0 and higher",
  noOptions: "No options",
  uploadCertificate:
    "Please upload the certificate that is required for these operating systems",
  noData: "No data",
};

export const CERTIFICATE = {
  name: "C1",
  path: "cypress/fixtures/certificates/oneday.pem",
  details: {
    version: "1",
    notValidBefore: "3/8/2021, 11:56:33 AM",
    notValidAfter: "3/8/2021, 11:56:33 AM",
    subjectName:
      "EMAILADDRESS=diala.abuobeid@exalt.ps, CN=cato, OU=cato, O=cato, L=ramalah, ST=ramallah, C=ps",
    issuerName:
      "EMAILADDRESS=diala.abuobeid@exalt.ps, CN=cato, OU=cato, O=cato, L=ramalah, ST=ramallah, C=ps",
    signatureAlgorithm: "SHA256withRSA",
  },
};

export const OPERATING_SYSTEMS = {
  windows: "Windows",
  macOS: "macOS",
  iOS: "iOS",
  android: "Android",
  linux: "Linux",
};

export const DEFAULT_METHODS = {
  userAndPassword: "User & Password",
  sso: "SSO",
  mfa: "MFA",
};

export const MSG = {
  savedSuccessfully: "Saved successfully",
  negativeDuration: "Token duration value must be greater than 1",
  certificateUploadedSuccessfully: "Certificate uploaded successfully",
  certificateAlreadyUploaded:
    "This certificate is already uploaded to Device Authentication",
};

export const AUTHENTICATION_DATA = [
  {
    defaultMethod: "User & Password",
    windowsRadioGroup: "Embedded browser (recommended)",
    macOsRadioGroup: "Embedded browser (recommended)",
  },
  {
    defaultMethod: "User & Password",
    windowsRadioGroup: "External Browser",
    macOsRadioGroup: "External Browser",
  },
  {
    defaultMethod: "SSO",
    windowsRadioGroup: "Embedded browser (recommended)",
    macOsRadioGroup: "External Browser",
  },
  {
    defaultMethod: "MFA",
    mode: "User selection",
    authenticationMethod: "Authentication app",
    tokenvalidity: "Always Prompt",
    number: "-12",
    timeUnit: "Days",
    windowsRadioGroup: "Embedded browser (recommended)",
    macOsRadioGroup: "External Browser",
  },
  {
    defaultMethod: "MFA",
    mode: "Enabled",
    authenticationMethod: "Any",
    tokenvalidity: "Duration",
    number: "30",
    timeUnit: "Minutes",
    windowsRadioGroup: "Embedded browser (recommended)",
    macOsRadioGroup: "External Browser",
  },
  {
    defaultMethod: "MFA",
    mode: "Enabled",
    authenticationMethod: "SMS",
    tokenvalidity: "Always Prompt",
    number: "100",
    timeUnit: "Hours",
    windowsRadioGroup: "Embedded browser (recommended)",
    macOsRadioGroup: "External Browser",
  },
  {
    defaultMethod: "SSO",
    windowsRadioGroup: "External Browser",
    macOsRadioGroup: "External Browser",
  },
];

export function assertTextContent(selector, text) {
  cy.get(selector).should("contain.text", text);
  //   cy.get(selector).invoke("text").invoke('trim').should("include", text);
}

export function getDropdownSelectedValue(selector) {
  return cy
    .get(selector)
    .find(LOCATORS.selectClass)
    .invoke("text")
    .then((text) => {
      cy.log(text);
      return cy.wrap(text.trim()); // Wrap the text and trim to remove extra spaces
    });
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
export function assertSave(message) {
  cy.get(LOCATORS.saveButton).click();
  assertPopUpMessage(message);
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    .should("be.visible")
    .click({ force: true });
}

export function typeValidInput(selector, input) {
  cy.get(selector).clear().type(input).should("have.value", input);
  cy.get(selector).should("have.attr", LOCATORS.ariaInvalid, "false");
}

export function expandDropdownIfNotExpanded(selector) {
  cy.get(selector).then(($dropdown) => {
    if (!$dropdown.hasClass(LOCATORS.expandedList)) {
      // If it's not expanded, click on it to expand
      cy.get(selector).click();
    }
  });
}

export function selectRadioOption(groupName, optionText) {
  cy.get(`[data-testid="${groupName}"]`)
    .contains("label", optionText)
    .find(LOCATORS.radioGroup)
    .check()
    .should("be.checked");
}

export function getInputValue(selector) {
  return cy.get(selector).find("input").invoke("attr", "value");
}

export function setAuthentication(data) {
  //Default Method

  getDropdownSelectedValue(LOCATORS.defaultMethod).then(
    (currentDefaultMethod) => {
      cy.log(currentDefaultMethod);
      chooseFromDropDown(
        LOCATORS.defaultMethod,
        data.defaultMethod,
        LOCATORS.listBox
      );
      //only for SSO
      if (
        data.defaultMethod == DEFAULT_METHODS.sso &&
        currentDefaultMethod != DEFAULT_METHODS.sso
      ) {
        assertTextContent(LOCATORS.dialog, PAGE_CONTENT.ssoConfirmationText);
        clickButton(LOCATORS.okButton);
      }
    }
  );
  //only for MFA
  if (data.defaultMethod == DEFAULT_METHODS.mfa) {
    chooseFromDropDown(LOCATORS.modeInput, data.mode, LOCATORS.listBox);
    chooseFromDropDown(
      LOCATORS.authenticationMethodInput,
      data.authenticationMethod,
      LOCATORS.listBox
    );
    chooseFromDropDown(
      LOCATORS.durationInput,
      data.tokenvalidity,
      LOCATORS.listBox
    );
    chooseFromDropDown(LOCATORS.timeUnitField, data.timeUnit, LOCATORS.listBox);
    typeValidInput(LOCATORS.numberInput, data.number);
  }

  //Browser Authentication
  selectRadioOption(LOCATORS.windowsRadioGroup, data.windowsRadioGroup);
  selectRadioOption(LOCATORS.macOsRadioGroup, data.macOsRadioGroup);
}


export function deleteRow(index) {
  cy.get(LOCATORS.tableTr).eq(index).find(LOCATORS.deleteButton).click();
}

export function deleteRowByIndex(tableSelector, rowIndex) {
  cy.get(tableSelector)
    .find(LOCATORS.tableRow)
    .eq(rowIndex)
    .find(LOCATORS.deleteButton)
    .click();
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

export function uploadFile(path) {
  cy.get(LOCATORS.inputFile).selectFile(path, { force: true });
}

export function assertOptionsDoNotExist(selector, optionsToCheck) {
  optionsToCheck.forEach((option) => {
    cy.get(selector).should("not.contain", option);
  });
}

export function assertOptionsExist(selector, optionsToCheck) {
  optionsToCheck.forEach((option) => {
    cy.get(selector).should("contain", option);
  });
}

export function addCertificate(certificate) {
  clickButton(LOCATORS.newButton);
  typeValidInput(LOCATORS.name, certificate.name);
  uploadFile(certificate.path);
}

export function assertEmptyTable(selector) {
  assertTextContent(selector, PAGE_CONTENT.noData);
}
