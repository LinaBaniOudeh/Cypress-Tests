export const LOCATORS = {
  ariaInvalid: "aria-invalid",
  saveButton: '[data-testid="editor-submit-btn"]',
  // popUpMessage: "#notistack-snackbar",
  popUpMessage: ".notistack-SnackbarContainer",
  exitButton: ".notistack-SnackbarContainer button",
  enableRemoteAccessCheckBox:
    '[data-testid="conditionalarea-checkbox-browseraccesssettings-remoteaccessenabled"] input',
  portalUrl: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(0)",
  portalLogo: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(1)",
  conditionalArea:
    '[data-testid="conditionalarea-content-browseraccesssettings-remoteaccessenabled"]',
  authentication: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(2)",
  natIPRange: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(3)",
  allowedDomains: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(4)",
  inputFile: "input[type=file]",
  logoErrorMsg: ".MuiV5-Box-root > .MuiV5-Grid2-root:nth(1) p:nth(1)",
  logoDeleteButton: '[data-testid="filedropzonefield-btn-delete-file"]',
  natIPRangeInput:
    '[data-testid="entitytextinputfield-root-cloudAccessConfiguration.settings.natIpRange"]',
  ariaDescribedBy: "aria-describedby",
  ariaInvalid: "aria-invalid",
  // body: '[data-testid="section"]:nth(0)',
  body: "body",
  addDomainButton: '[data-testid="entityappenderpopup-btn-add"]',
  domainField: '[data-testid="entityfield-value"] input',
  addButton: '[data-testid="entityfield-value"] button',
  applicationButton: '[data-testid="tabs-btn-applications"]',
  //Application
  newButton: '[data-testid="catobutton-new"]',
  applyButton: '[data-testid="catobutton-apply"]',
  name: "#appName",
  description: "#appDescription",
  landingPage: "#basePath",
  BasePath: "#hostSuffix",
  urlPrefix: "#hostPrefix",
  useSourceNATIPrange: '[data-testid="checkbox-useSourceNAT"] input',
  hostAddress: "#host",
  port: "#port",
  protocol: '[data-testid="select-protocol"]',
  hostName: "#hostName",
  // listBox: ".MuiV5-Paper-root",
  listBox: ".MuiV5-Autocomplete-popper",
  logoHelperMsg:
    ".MuiV5-Grid2-container > .MuiV5-Grid2-root >.MuiV5-Box-root p:nth(1)",
  //Access Policy
  accessPolicy: '[data-testid="tabs-btn-rules"]',
  general: 'div[data-testid="section"]:contains("General")',
  ruleName: "#description",
  switchEnable: '[data-testid="switch-enabled"] input',
  usersAndGroups: 'div[data-testid="section"]:contains("Users/Groups")',
  userAndGroupDropdownMenu1:
    '[data-testid="section"]:contains("Users/Groups") [placeholder="Search or select "]',
  userAndGroupDropdownMenu2:
    '[data-testid="section"]:contains("Users/Groups") [data-testid="entityfield-value"]',
  remoteAccessApplication:
    'div[data-testid="section"]:contains("Remote Access Applications")',
  remoteAccessDropDownMenu:
    '[data-testid="section"]:contains("Remote Access Applications") [placeholder="Search or select Cloud Application"]',
  optionsButton: "div.MuiV5-Box-root button.MuiV5-IconButton-sizeSmall",
  optionsBox: ".MuiV5-Popper-root",
  confirmDeleteButton: "button.MuiButton-contained",
  tableTr: "table tr",
};

export const OPTIONS = {
  delete: "Delete Rule",
  enable: "Enable",
  disable: "Disable",
};

export const IPs = {
  validIP: "10.0.0.4",
  validIPwithSubnet: "10.0.0.4/24",
  invalidIP: "10.0.4",
};
export const DOMAINS = {
  invalidDomain1: "https://www.example.com",
  invalidDomain2: "test",
  validDomain: "example.com",
  duplicateDomain: "www.example.com",
};
export const PAGE_CONTENT = {
  portalUrl: "Portal URL",
  leenaUrl: "Leena-testing.via.catonetworks.com",
  portalLogo: "Portal Logo",
  Authentication: "Authentication",
  allowLoginWithCatoUserCredentials: "Allow login with Cato user credentials",
  natIPRange: "NAT IP Range",
  natIPRangeForPortalApplications: "NAT IP Range for portal applications",
  allowedDomains: "Allowed Domains",
  domains: "Domains",
  FileIsLarge: "File is larger than 204800 bytes",
  invalidCIDRformat: "Invalid CIDR format",
  invalidDomain: "Enter a valid Domain Name (TLD), such as example.com",
  disabled: "disabled",
  duplicateDomain: "Already Exists {duplicate}",
  invalidIPOrHostFormat: "Invalid IP or Host format",
  thisInvalidNumber: "this: Invalid number",
  portMaxValueExceeded: "Max value is 65535",
  canNotDeleteApp:
    "Can’t delete – the application is used in one or more rules. Please remove this application from the rules and then delete it.",
};

export const IMAGES_TO_UPLOAD = {
  validImage: "cypress/fixtures/images/validImage.png",
  InvalidImage: "cypress/fixtures/images/invalidImage.jpg",
  invalidType: "cypress/fixtures/images/invalidType.webp",
  largeImageSize: "cypress/fixtures/images/largeImageSize.jpg",
};

export const MSG = {
  invalidIP: "is not a valid CIDR block",
  savedSuccessfully: "Saved successfully",
  invalidDomain: "Domain 432 is invalid",
  hostNameIsNotValid: "Host Name is not a valid domain name",
  appDisplayNameisInUse: "Display name is already in use",
  urlCanContainOnlyLettersAndNumbers:
    "URL can contain only letters and numbers",

  // "Select one Login Authentication Method for the Remote Access Portal (SSO provider or Cato user credentials)",
  // "URL can contain only letters and numbers",
  // "Host is not a valid domain name or valid IP '10.0.04' is not an IP string literal.",
  // "Max value is 65535",
  // "Host Name is not a valid domain name"
  // "Enter a valid Domain Name (TLD), such as example.com",
  // "Can’t delete – the application is used in one or more rules. Please remove this application from the rules and then delete it."
};

export const APPLICATIONS = [
  {
    name: "app1",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "https",
    logo: IMAGES_TO_UPLOAD.validImage,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.4",
    port: "443",
    protocol: "Https",
    hostName: "anything",
  },
  {
    name: "app2",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "https://",
    logo: IMAGES_TO_UPLOAD.validImage,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.4",
    port: "443",
    protocol: "Https",
    hostName: "anything",
  },
  {
    name: "app3",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "https://",
    logo: IMAGES_TO_UPLOAD.largeImageSize,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.",
    port: "44356783",
    protocol: "Https",
    hostName: "example.com",
  },
  {
    name: "app4",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "https",
    logo: IMAGES_TO_UPLOAD.largeImageSize,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.",
    port: "port",
    protocol: "Https",
    hostName: "https://",
  },
  {
    name: "app5",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "http",
    logo: IMAGES_TO_UPLOAD.validImage,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.8",
    port: "443",
    protocol: "Http",
    hostName: "facebook.com",
  },
  {
    name: "app6",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "anything",
    logo: IMAGES_TO_UPLOAD.validImage,
    useSourceNATIPrange: true,
    hostAddress: "10.0.0.9",
    port: "443",
    protocol: "Https",
    hostName: "www.example.com",
  },
  {
    name: "app7",
    description: "",
    landingPage: "",
    BasePath: "",
    urlPrefix: "anything2",
    logo: IMAGES_TO_UPLOAD.validImage,
    useSourceNATIPrange: false,
    hostAddress: "10.0.0.22",
    port: "443",
    protocol: "Http",
    hostName: "example.com",
  },
];

export const ACCESS_POLICY_DATA = [
  {
    ruleName: "rule1",
    enabled: true,
    usersAndGroups: [
      { type: "User Group", value: "Group1" },
      { type: "SDP User", value: "leena+4 odeh" },
    ],
    remoteAccessApplication: ["app5", "app6"],
  },
  {
    ruleName: "rule2",
    enabled: true,
    usersAndGroups: [
      { type: "SDP User", value: "Leena BaniOdeh" },
      { type: "User Group", value: "Group2" },
    ],
    remoteAccessApplication: ["app7"],
  },
  {
    ruleName: "rule3",
    enabled: true,
    usersAndGroups: [],
    remoteAccessApplication: ["app7", "app6", "app5"],
  },
];
export function assertPageContent() {
  assertTextContent(LOCATORS.portalUrl, PAGE_CONTENT.portalUrl);
  assertTextContent(LOCATORS.portalUrl, PAGE_CONTENT.leenaUrl);
  assertTextContent(LOCATORS.portalLogo, PAGE_CONTENT.portalLogo);
  assertTextContent(LOCATORS.natIPRange, PAGE_CONTENT.natIPRange);
  assertTextContent(
    LOCATORS.natIPRange,
    PAGE_CONTENT.natIPRangeForPortalApplications
  );
  assertTextContent(LOCATORS.authentication, PAGE_CONTENT.Authentication);
  assertTextContent(
    LOCATORS.authentication,
    PAGE_CONTENT.allowLoginWithCatoUserCredentials
  );
  assertTextContent(LOCATORS.allowedDomains, PAGE_CONTENT.allowedDomains);
  assertTextContent(LOCATORS.allowedDomains, PAGE_CONTENT.domains);
}

export function setCheckboxAndAssert(selector, checked) {
  const checkbox = cy.get(selector);

  if (checked) {
    checkbox.check({ force: true }).should("be.checked");
  } else {
    checkbox.uncheck({ force: true }).should("not.be.checked");
  }
}

export function assertTextContent(selector, text) {
  cy.get(selector).should("include.text", text);
}

export function assertPopUpMessage(message) {
  cy.get(LOCATORS.popUpMessage)
    .scrollIntoView()
    .should("be.visible")
    .contains(message); //constant
  if (message != MSG.savedSuccessfully) {
    clickButton(LOCATORS.exitButton);
  }
}
export function clickButton(selector) {
  cy.get(selector).click({ force: true });
}
export function doubleClickButton(selector) {
  cy.get(selector).dblclick({ force: true });
}
export function assertSave(message) {
  doubleClickButton(LOCATORS.saveButton);
  assertPopUpMessage(message);
}

export function checkButtonDisabled(buttonSelector, isDisabled) {
  cy.get(buttonSelector).should(
    "have.attr",
    PAGE_CONTENT.disabled,
    isDisabled ? PAGE_CONTENT.disabled : undefined
  );
}

export function assertAreaVisibility(selector, shouldBeHidden) {
  cy.get(selector).should(shouldBeHidden ? "not.exist" : "exist");
}

export function uploadIamge(path) {
  if (path != "") {
    cy.get(LOCATORS.inputFile).selectFile(path, { force: true });
  }
}

export function formatString(template, ...values) {
  return template.replace(/{}/g, () => values.shift());
}

export function typeValidInput(selector, input) {
  if (input != "") {
    cy.get(selector).clear().type(input).should("have.value", input);
    cy.get(selector).should("have.attr", LOCATORS.ariaInvalid, "false");
  }
}

export function typeInvalidInput(selector, value, helperMsg) {
  //arg message
  cy.get(selector).scrollIntoView().clear().type(value);
  if (selector != LOCATORS.domainField) {
    cy.get(LOCATORS.body).click();
    // cy.document().click(0, 0);
  }
  cy.get(selector)
    // .should("have.attr", LOCATORS.ariaInvalid, "true")
    .invoke("attr", LOCATORS.ariaDescribedBy)
    .then((ariaDescribedBy) => {
      cy.get(`[id="${ariaDescribedBy}"]`).should("contain", helperMsg);
    });
}

export function addDomain(value, isValid, helpMsg) {
  clickButton(LOCATORS.addDomainButton);
  if (isValid) {
    typeValidInput(LOCATORS.domainField, value);
    clickButton(LOCATORS.addButton);
    assertSave(MSG.savedSuccessfully);
  } else {
    typeInvalidInput(LOCATORS.domainField, value, helpMsg);
    checkButtonDisabled(LOCATORS.addButton, true);
    cy.reload();
  }
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector)
    .contains(optionText)
    .scrollIntoView()
    // .should("be.visible")
    .click({ force: true });
}

export function addApplication(app) {
  clickButton(LOCATORS.newButton);
  typeValidInput(LOCATORS.name, app.name);
  typeValidInput(LOCATORS.description, app.description);
  typeValidInput(LOCATORS.landingPage, app.landingPage);
  typeValidInput(LOCATORS.BasePath, app.BasePath);
  typeValidInput(LOCATORS.urlPrefix, app.urlPrefix);
  uploadIamge(app.logo);
  setCheckboxAndAssert(LOCATORS.useSourceNATIPrange, app.useSourceNATIPrange);
  typeValidInput(LOCATORS.hostAddress, app.hostAddress);
  typeValidInput(LOCATORS.port, app.port);
  typeValidInput(LOCATORS.hostName, app.hostName);
  chooseFromDropDown(LOCATORS.protocol, app.protocol, LOCATORS.listBox);
  clickButton(LOCATORS.applyButton);
}

export function addNewRule(ruleData) {
  clickButton(LOCATORS.newButton);
  //General
  fillGeneralSection(ruleData);

  //Users/Groups
  fillSection(ruleData.usersAndGroups, {
    container: LOCATORS.usersAndGroups,
    dropdownMenu1: LOCATORS.userAndGroupDropdownMenu1,
    dropdownMenu2: LOCATORS.userAndGroupDropdownMenu2,
    listBox: LOCATORS.listBox,
  });
  //Remote Access Application
  remoteAccessApplication(ruleData.remoteAccessApplication, {
    container: LOCATORS.remoteAccessApplication,
    dropdownMenu: LOCATORS.remoteAccessDropDownMenu,
    listBox: LOCATORS.listBox,
  });
  clickButton(LOCATORS.applyButton);
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
      if (element.type != "All Authenticated Users") {
        chooseFromDropDown(
          sectionLocators.dropdownMenu2,
          element.value,
          sectionLocators.listBox
        );
      }
    });
  }
}

function fillGeneralSection(ruleData) {
  expandDropdownIfNotExpanded(LOCATORS.general);
  typeValidInput(LOCATORS.ruleName, ruleData.ruleName);
  setRadioButtonState(LOCATORS.switchEnable, ruleData.enabled);
}

function remoteAccessApplication(sectionData, sectionLocators) {
  if (sectionData) {
    expandDropdownIfNotExpanded(sectionLocators.container);
    cy.wrap(sectionData).each((element) => {
      chooseFromDropDown(
        sectionLocators.dropdownMenu,
        element,
        sectionLocators.listBox
      );
    });
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
