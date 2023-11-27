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

export const DEVICE_CHECKS_REVLITE = 
[{"id":"{{ID_PLACEHOLDER}}","name":"check1","rule":{"op":"BOOL_OR","expression":[{"op":"BOOL_AND","predicate":[{"field_name":"check_posture(device_posture, antimalware,256,564)","op":"OP_EQ","values":[{"type":"field_type_bool","num":"1"}]},{"field_name":"os_type","op":"OP_EQ","values":[{"type":"field_type_netorder_uint","num":"4"}]}]}]},"display_name":"AVG Technologies CZ, s.r.o. AVG AntiVirus","allow_unsupported_clients":false,"product_type":"antimalware"},
 {"id":"{{ID_PLACEHOLDER}}","name":"check2","rule":{"op":"BOOL_OR","expression":[{"op":"BOOL_AND","predicate":[{"field_name":"check_posture(device_posture, antimalware,1684,3029)","op":"OP_EQ","values":[{"type":"field_type_bool","num":"1"}]},{"field_name":"os_type","op":"OP_EQ","values":[{"type":"field_type_netorder_uint","num":"4"}]}]}]},"display_name":"TotalAV TotalAV","allow_unsupported_clients":false,"product_type":"antimalware"},
 {"id":"{{ID_PLACEHOLDER}}","name":"Disk1","rule":{"op":"BOOL_OR","expression":[{"op":"BOOL_AND","predicate":[{"field_name":"check_posture(device_posture, disk_encryption,Any,Any,(encrypted_partition==\"C:\\\\\"), encryption_active, state_encrypted)","op":"OP_EQ","values":[{"type":"field_type_bool","num":"1"}]}]}]},"display_name":"disk encryption: partition 'C:\\' (encryption_active, state_encrypted)","allow_unsupported_clients":false,"product_type":"disk_encryption"},
 {"id":"{{ID_PLACEHOLDER}}","name":"cer","rule":{"op":"BOOL_OR","predicate":[{"field_name":"certificate","op":"OP_EQ","values":[{"type":"field_type_bool","num":"1"}]}]},"display_name":"Certificate","allow_unsupported_clients":true,"product_type":"certificate"},
 {"id":"{{ID_PLACEHOLDER}}","name":"check3","rule":{"op":"BOOL_OR","expression":[{"op":"BOOL_AND","predicate":[{"field_name":"check_posture(device_posture, antimalware,1566,3128,(version>=\'12.7.X\'),enabled)","op":"OP_EQ","values":[{"type":"field_type_bool","num":"1"}]},{"field_name":"os_type","op":"OP_EQ","values":[{"type":"field_type_netorder_uint","num":"4"}]}]}]},"display_name":"adaware adaware antivirus version 12.7.X and above","allow_unsupported_clients":true,"product_type":"antimalware"}
]

export const DEVICE_CHECKS_URL =
  "https://system.cc.test.catonet.works/?#/account/54556/settings;DevicePosture?currentTab=%22tests%22";
export const REVLITE_URL =
  "https://system.cc2.test.catonet.works/catoadmin#!/revlite?start=1700517600453&end=1700517600453&accountId=54556";

export const MSG = {
  invalidIP: "is not a valid CIDR block",
  savedSuccessfully: "Saved successfully",
};

export const GraphQl = {
  post: "POST",
  endpoint: "/api/v1/graphql",
  operationName: "account",
  alias: "@gqlaccountQuery",
};

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

  // Use map to transform the devices and substitute the id
  const formattedDevices = DEVICE_CHECKS_REVLITE.map((device, index) => {
    if (extractedDevices[index]) {
      return {
        ...device,
        id: extractedDevices[index].id,
      };
    }
  });

  return formattedDevices;
}

export function interceptingGraphql() {
  cy.intercept(GraphQl.post, GraphQl.endpoint, (req) => {
    aliasQuery(req, GraphQl.operationName);
  });
  cy.reload(); 
  return cy.wait(GraphQl.alias).then((interception) => {
    return interception.response.body; 
  });
}

export function assertContent(devicesData){
  cy.get(LOCATORS.code)
  .should("be.visible")
  .invoke("text")
  .then((actualText) => {
    const cleanedActualText = actualText.replace(/\s/g, "");
    // Iterate through each device in devicesData
    devicesData.forEach((device) => {
      const deviceString = JSON.stringify(device, null, 2).replace(/\s/g, "");

      // Replace Unicode escape sequences in cleanedActualText
      const cleanedActualTextWithoutUnicode = cleanedActualText.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
        return String.fromCharCode(parseInt(match.substring(2), 16));
      });

      expect(cleanedActualTextWithoutUnicode).to.include(deviceString);
    });
  });

}


export function generateDeviceCheckRevLite(deviceTemplate, dynamicId) {
  return {
    ...deviceTemplate,
    id: deviceTemplate.id.replace("{{ID_PLACEHOLDER}}", dynamicId),
  };
}
