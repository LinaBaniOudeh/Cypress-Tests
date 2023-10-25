import { INVALID_IPS } from "./ip_allocation_helper";

export const LOCATORS = {
  trustedNetworkButton: '[data-testvalue="Trusted Networks"]',
  trustedNetwork: "#page-title",
  theClientWillIdentify: '[data-testid="account-settings-trustednetworks"]',
  trustedNetworkEnabled: ".MuiV5-Box-root label",
  toggleButton: '[data-testid="switch-trustedNetworksEnabled"] input',
  saveButton: '[data-testid="editor-submit-btn"]',
  newButton: '[data-testid="catobutton-new"]',
  searchField:
    '[data-testid="account-settings-trustednetworks"] [data-testid="SearchInput"]',
  table: '[data-testid="awesometable-table-trusted-networks"]',
  nameField: '[data-testid="catotextinputfield-root-name"]',
  descriptionField: '[data-testid="catotextinputfield-root-description"]',
  networkTypeDropDown: '[data-testid="select-trustedNetworkType"]',
  applyButton: '[data-testid="catobutton-apply"]',
  cancelButton: '[data-testid="catobutton-cancel"]',
  listBox: ".MuiV5-List-root li",
  sideBar: ".MuiV5-Drawer-paperAnchorRight",
  newTrustedNetwork: ".MuiV5-Drawer-paperAnchorRight h3",
  textInput: '[data-testid="entitytextinputadornment-container"]',
  hostNamePlaceholder: '[placeholder="e.g. example.com"]',
  httpsPlaceholder: '[placeholder="https://www.example.com"]',
  ipPlaeholder: '[placeholder="e.g. 192.0.2.1"]',
  deleteButton: 'button[data-testid="table-btn-delete-row"]',
  tableTr: "table tr",
  lastField1: '[data-testid="entitytextinputfield-root-host"] input',
  lastField2: '[data-testid="entitytextinputfield-root-ip"] input',
  ariaDescribedBy: "aria-describedby",
  ariaInvalid: "aria-invalid",
  popUpMessage: "#notistack-snackbar",
  tableSelector:'[data-testid=awesometable-table-trusted-networks]',
  body:'body'

};

const PAGE_CONTENT_TEXT = {
  trustedNetwork: "Trusted Networks",
  theClientWillIdentify:
    "The Client will identify a network as trusted if it can validate any of the following criteria",
  trustedNetworkEnabled: "Trusted Networks Enabled",
  trustedNetworkDisabled: "Trusted Networks Disabled",
  save: "Save",
  new: "New",
  noData: "No data",
  newTrustedNetwork: "New Trusted Network",
};

export const MSG = {
    savedSuccessfully: "Saved successfully",
    invalidHttp:"Invalid HTTPS Url",
    invalidIP:"Invalid IP address",
    invalidHostname:"Invalid URL",
    httpsError:"You cannot define more than 5 Trusted Networks based on a HTTPS Response",
    dnsError:"You cannot define more than 5 Trusted Networks based on a DNS query",
    pingError:"You cannot define more than 5 Trusted Networks based on a Ping Response"
};




const TRUSTED_NETWORK_DATA = [
  {
    name: "rule1",
    description: "",
    type: "HTTPS Response (most secure)",
    httpsAddress: "https://www.example.com",
    placeHolder:'[placeholder="https://www.example.com"]'
  },
  {
    name: "rule2",
    description: "",
    type: "DNS Resolving",
    hostname: "example.com",
    ipAddress: "10.41.0.0",
    placeHolder1:'[placeholder="e.g. example.com"]',
    placeHolder2:'[placeholder="e.g. 192.0.2.1"]'
  },
  {
    name: "rule3",
    description: "",
    type: "Ping Response - Hostname (least secure)",
    hostname: "example.com",
    placeHolder:'[placeholder="e.g. example.com"]'
  },
  {
    name: "rule4",
    description: "",
    type: "Ping Response - IP Address (least secure)",
    ipAddress: "10.40.0.0",
    placeHolder:'[placeholder="e.g. 192.0.2.1"]'
  },
];

// PLACE_HOLDERS = [

// ]

export function navigateToIpAllocation() {
  cy.get(LOCATORS.trustedNetworkButton).click();
}

export function assertPageContent() {
  cy.get(LOCATORS.trustedNetwork).should(
    "contain.text",
    PAGE_CONTENT_TEXT.trustedNetwork
  );

  cy.get(LOCATORS.theClientWillIdentify).should(
    "contain.text",
    PAGE_CONTENT_TEXT.theClientWillIdentify
  );

  setRadioButtonState(LOCATORS.toggleButton, true);
  cy.get(LOCATORS.trustedNetworkEnabled).should(
    "contain.text",
    PAGE_CONTENT_TEXT.trustedNetworkEnabled
  );

  setRadioButtonState(LOCATORS.toggleButton, false);
  cy.get(LOCATORS.trustedNetworkEnabled).should(
    "contain.text",
    PAGE_CONTENT_TEXT.trustedNetworkDisabled
  );

  cy.get(LOCATORS.saveButton).should("contain.text", PAGE_CONTENT_TEXT.save);
  cy.get(LOCATORS.newButton).should("contain.text", PAGE_CONTENT_TEXT.new);
  cy.get(LOCATORS.searchField).should("be.visible");
  cy.get(LOCATORS.table).should("contain.text", PAGE_CONTENT_TEXT.noData);
  cy.get(LOCATORS.newButton).click();
  cy.get(LOCATORS.newTrustedNetwork).should(
    "contain.text",
    PAGE_CONTENT_TEXT.newTrustedNetwork
  );
  cy.get(LOCATORS.nameField).should("be.visible");
  cy.get(LOCATORS.descriptionField).should("be.visible");
  cy.get(LOCATORS.networkTypeDropDown).should("be.visible");
  cy.get(LOCATORS.httpsPlaceholder).should("be.visible");
  cy.get(LOCATORS.applyButton).should("be.visible");
  cy.get(LOCATORS.cancelButton).should("be.visible");

}
export function assertEmptyTable(){
  cy.get(LOCATORS.table).should("contain.text", PAGE_CONTENT_TEXT.noData);

}

export function setRadioButtonState(selector, targetValue) {
  cy.get(selector)
    .should("have.attr", "value")
    .then((currentValue) => {
      console.log(currentValue);
      // Parse the `currentValue` as a boolean
      const isCurrentChecked = currentValue === "true";

      if (isCurrentChecked !== targetValue) {
        cy.get(selector).click(); // Click the switch to toggle it
      }
    });
}

export function chooseFromDropDown(dropdownSelector, optionText, listSelector) {
  cy.get(dropdownSelector).click(); // Click to open the dropdown
  cy.get(listSelector).contains(optionText).should("be.visible").click();
}

export function addNewTrustedNetwork(trustedNetwork) {
  cy.get(LOCATORS.newButton).click();
  cy.get(LOCATORS.nameField).type(trustedNetwork.name);
  if (trustedNetwork.description !== '') {
    cy.get(LOCATORS.descriptionField).type(trustedNetwork.description);
  }

  chooseFromDropDown(
    LOCATORS.networkTypeDropDown,
    trustedNetwork.type,
    LOCATORS.listBox
  );
  if (trustedNetwork.type === "DNS Resolving") {
    typeValidInput(trustedNetwork.placeHolder1, trustedNetwork.hostname);
    typeValidInput(trustedNetwork.placeHolder2, trustedNetwork.ipAddress);
  } else {
    const values = Object.values(trustedNetwork);
    typeValidInput(trustedNetwork.placeHolder, values[3]);
  }
  clickButton(LOCATORS.applyButton);
}

export function typeValidInput(selector, value) {
  cy.get(selector).clear().type(value);
  cy.get(selector).should("have.attr", LOCATORS.ariaInvalid, "false"); //locator
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
    // cy.get(selector).trigger('keydown', { key: 'Tab', keyCode: 9, which: 9 })
    cy.get(LOCATORS.body).click();
    cy.get(selector)
      .should("have.attr", LOCATORS.ariaInvalid, "true") //locator
      .invoke("attr", LOCATORS.ariaDescribedBy) //locator
      .then((ariaDescribedBy) => {
        // Verify if the text "Invalid CIDR format" is present in the associated element
        cy.get(`[id="${ariaDescribedBy}"]`).should("contain", helperMsg);
    });
}

export function deleteRow() {
    cy.get(LOCATORS.tableTr)
      .eq(1) // Select the specific row by index
      .find(LOCATORS.deleteButton)
      .click();
}

export function getTableRowCount(tableSelector) {
  return cy.get(LOCATORS.tableSelector).find('tbody tr').its('length');
}

export function deleteTableContent(tableSelector) {
  getTableRowCount(tableSelector).then((rowCount) => {
    for (let i = 0; i < rowCount; i++) {
      cy.wait(1500)
      deleteRow();
    }
  });
}