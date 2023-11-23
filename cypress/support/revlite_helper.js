export const LOCATORS = {
  saveButton: '[data-testid="editor-submit-btn"]',
  popUpMessage: "#notistack-snackbar",
  access: '[data-testvalue="Access"]',
  endUserFeedback: '[data-testid="section"]:nth(3)',
  enableUserFeedback:
    '[data-testid="checkbox-userFeedbackFromClientEnabled"] input',
  clientAccess: '[data-testvalue="Client Access"]',
  alwaysOnPolicy: '[data-testvalue="Always-On Policy"]',
  settings: '[data-testid="tabs-btn-settings"]',
  enableAuthenticationInOffice:
    '[data-testid="checkbox-accessSettings.alwaysOnPolicyConfiguration.authenticationInOffice"] input',
  avatar: ".MuiV5-ButtonBase-root > .MuiV5-Avatar-circular",
  adminPage: ".MuiV5-List-root li:nth(3)",
  adminArea: "#admin-link > a",
  revlite: `:nth-child(2) > [ng-show="page.type != 'category'"]`,
  accountID: ":nth-child(6) > .tree-label",
  code: "code",
};

export const DEVICE_CHECKS_URL =
  "https://system.cc.test.catonet.works/?#/account/54556/settings;DevicePosture?currentTab=%22tests%22";
export const REVLITE_URL =
  "https://system.cc2.test.catonet.works/catoadmin#!/revlite?start=1700517600453&end=1700517600453&accountId=54556";

export const MSG = {
  invalidIP: "is not a valid CIDR block",
  savedSuccessfully: "Saved successfully",
};

export const GraphQl = {
  post:"POST",
  endpoint:"/api/v1/graphql",
  operationName:"account",
  alias:"@gqlaccountQuery"
}

export const PAGE_CONTENT = {
  vpnClientUserFeedbackFromClientEnabled:
    "vpn_client_userFeedbackFromClientEnabled",
  vpnClientAuthenticationInOffice: "vpn_client_authenticationInOffice",
};

export function assertCodeSelectorBoolean(targetText, expectedValue) {
  const expectedText = `"${targetText}": ${expectedValue}`;

  cy.get(LOCATORS.code).should("be.visible").contains(expectedText);
}

export function navigateToRevlite(adminArea) {
  clickButton(LOCATORS.avatar);
  clickButton(LOCATORS.adminPage);
  if (adminArea) {
    clickButton(LOCATORS.adminArea);
  }
  navigateToURL(REVLITE_URL);

  //   doubleClickButton(LOCATORS.revlite)
  cy.wait(10000);
  clickButton(LOCATORS.accountID);
}

export function doubleClickButton(selector) {
  cy.get(selector).dblclick();
}
export function enableUserFeedback(value) {
  clickButton(LOCATORS.clientAccess);
  expandDropdownIfNotExpanded(LOCATORS.endUserFeedback);
  setCheckboxAndAssert(LOCATORS.enableUserFeedback, value);
  assertSave(MSG.savedSuccessfully);
}

export function navigateToURL(url) {
  cy.visit(url);
}
export function enableAuthenticationInOffice(value) {
  clickButton(LOCATORS.alwaysOnPolicy);
  clickButton(LOCATORS.settings);
  setCheckboxAndAssert(LOCATORS.enableAuthenticationInOffice, value);
  assertSave(MSG.savedSuccessfully);
}

export function expandDropdownIfNotExpanded(selector) {
  cy.get(selector).then(($dropdown) => {
    if (!$dropdown.hasClass(LOCATORS.expandedList)) {
      // If it's not expanded, click on it to expand
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

export function assertSave(message) {
  cy.get(LOCATORS.saveButton).click();
  assertPopUpMessage(message);
}

export function assertPopUpMessage(message) {
  cy.get(LOCATORS.popUpMessage)
    .scrollIntoView()
    .should("be.visible")
    .contains(message);
}

export function clickButton(selector) {
  cy.get(selector).click();
}

export function assertTextContent(selector, text) {
  cy.get(selector).should("contain.text", text);
}

export function setCheckboxAndAssert(selector, checked) {
  const checkbox = cy.get(selector);

  if (checked) {
    checkbox.check({ force: true }).should("be.checked");
  } else {
    checkbox.uncheck({ force: true }).should("not.be.checked");
  }
}

export const hasOperationName = (req, operationName) => {
  const { body } = req;
  return (
    Object.prototype.hasOwnProperty.call(body, "operationName") &&
    body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

export function extractionLogic(response) {
  const extractedDevices =
    response.data.account.accessSettings.deviceAccessTests;
  const formattedDevices = extractedDevices.map((device) => {
    const formattedDevices = {
      name: device.name,
      id: device.id,
      // descreption: device.descreption,
      // allow_unsupported_clients: device.allowUnsupportedClients,
      // product_type: device.type,
    };
    if (device.products && device.products.length > 0) {
      formattedDevices.display_name =
        device.products[0].vendor.name + " " + device.products[0].product.name;
    }
    return formattedDevices;
  });
  return formattedDevices;
}

export function interceptingGraphql(){
  cy.intercept(GraphQl.post, GraphQl.endpoint, (req) => {
    // Queries
    aliasQuery(req, GraphQl.operationName);
  });
  cy.reload(); //trigger the request
  cy.wait(GraphQl.alias).then((interception) => {
    const response = interception.response.body;
    const formattedArray = extractionLogic(response);
    cy.setDevicesData(formattedArray);
  });
}

export function assertCellContent(){
  cy.get("@devicesData").then((devicesData) => {
    cy.log("Devices Data:", JSON.stringify(devicesData, null, 2));

    // Iterate through each device in devicesData
    devicesData.forEach((device) => {
      // Iterate through each value in the device object
      Object.values(device).forEach((value) => {
        cy.log(value)
        cy.get(LOCATORS.code).should("be.visible").contains(value);
      });
    });
  });

}
