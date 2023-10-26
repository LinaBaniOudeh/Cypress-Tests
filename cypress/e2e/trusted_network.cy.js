/// <reference types="Cypress"/>
import * as trustedNetworkHelper from "../support/trusted_network_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";
import { it } from "mocha";

const TYPES = [
  "HTTPS Response (most secure)",
  "DNS Resolving",
  "Ping Response - Hostname (least secure)",
  "Ping Response - IP Address (least secure)",
];

export const INVALID_HTTP = "www.example.com";
export const INVALID_IP = "10.41.0";
export const INVALID_HOSTNAME = "https://www.example.com";
const TRUSTED_NETWORK_DATA = [
  {
    name: "rule1",
    description: "",
    type: "HTTPS Response (most secure)",
    httpsAddress: "https://www.example.com",
    placeHolder: '[placeholder="https://www.example.com"]',
  },
  {
    name: "rule2",
    description: "",
    type: "DNS Resolving",
    hostname: "example.com",
    ipAddress: "10.41.0.0",
    placeHolder1: '[placeholder="e.g. example.com"]',
    placeHolder2: '[placeholder="e.g. 192.0.2.1"]',
  },
  {
    name: "rule3",
    description: "",
    type: "Ping Response - Hostname (least secure)",
    hostname: "example.com",
    placeHolder: '[placeholder="e.g. example.com"]',
  },
  {
    name: "rule4",
    description: "",
    type: "Ping Response - IP Address (least secure)",
    ipAddress: "10.40.0.0",
    placeHolder: '[placeholder="e.g. 192.0.2.1"]',
  },
];

describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS);
    loginHelper.navigateToAccess();
    trustedNetworkHelper.navigateToIpAllocation();
  });

  it("Assert Page Content", () => {
    trustedNetworkHelper.assertPageContent();
  });

  it("test adding HTTP Response, DNS Resolving, Ping Response - IP and Ping Response - Hostname with valid URL", () => {
    for (let i = 0; i < 4; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[i]);
    }
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding HTTP Response with Invalid URL", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton); //function
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      TYPES[0],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      TRUSTED_NETWORK_DATA[0].placeHolder,
      INVALID_HTTP,
      trustedNetworkHelper.MSG.invalidHttp
    );
  });

  it("test adding DNS Resolving with Invalid hostname", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      TYPES[1],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      TRUSTED_NETWORK_DATA[1].placeHolder1,
      INVALID_HOSTNAME,
      trustedNetworkHelper.MSG.invalidHostname
    );
  });

  it("test adding DNS Resolving with Invalid IP Address", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      TYPES[1],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      TRUSTED_NETWORK_DATA[1].placeHolder2,
      INVALID_IP,
      trustedNetworkHelper.MSG.invalidIP
    );
  });

  it("test adding Ping Response - Hostname (least secure) with Invalid Hostname", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      TYPES[2],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      TRUSTED_NETWORK_DATA[2].placeHolder,
      INVALID_HOSTNAME,
      trustedNetworkHelper.MSG.invalidHostname
    );
  });

  it("test adding Ping Response - IP Address (least secure)with Invalid ip address", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      TYPES[3],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      TRUSTED_NETWORK_DATA[3].placeHolder,
      INVALID_IP,
      trustedNetworkHelper.MSG.invalidIP
    );
  });

  it("test adding 3 Ping Response - IP Address rules (least secure) and test adding 2 Ping Response - Hostname rules", () => {
    for (let i = 0; i < 3; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[2]);
    }
    for (let i = 0; i < 2; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[3]);
    }
    trustedNetworkHelper.assertEmptyTable();
    cy.wait(2000);
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 4 Ping Response - IP Address rules (least secure) and test adding 2 Ping Response - Hostname rules", () => {
    trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[2]);
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.pingError);    
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 5 HTTPresponse rules", () => {
    for (let i = 0; i < 4; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[0]);
    }
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.httpsError);
  });

  it("test adding 6 HTTPresponse rules", () => {

    trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[0]);
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.httpsError);
    cy.reload();
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 6 DNS Resolving rules", () => {
    for (let i = 0; i < 5; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[1]);
    }

    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.dnsError);
    cy.reload();
    trustedNetworkHelper.assertEmptyTable();
  });
  
  it("test adding 5 HTTPresponse rules and 5 DNS Resolving rules", () => {
    for (let i = 0; i < 4; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[0]);
    }
    for (let i = 0; i < 4; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(TRUSTED_NETWORK_DATA[1]);
    }
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });
});
