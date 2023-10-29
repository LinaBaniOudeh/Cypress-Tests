/// <reference types="Cypress"/>
import * as trustedNetworkHelper from "../support/trusted_network_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";
import { it } from "mocha";

describe("Trusted Network Page", () => {
  // Run this code before each test
  beforeEach(() => {
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS);
    loginHelper.navigateToAccess();
    trustedNetworkHelper.navigateToTrustedNetwork();
  });

  it("Assert Page Content", () => {
    trustedNetworkHelper.assertPageContent();
  });

  it("test adding HTTP Response with Invalid URL", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      trustedNetworkHelper.TYPES[0],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[0].placeHolder,
      trustedNetworkHelper.INVALID_HTTP,
      trustedNetworkHelper.MSG.invalidHttp
    );
  });

  it("test adding DNS Resolving with Invalid hostname", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      trustedNetworkHelper.TYPES[1],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[1].placeHolder1,
      trustedNetworkHelper.INVALID_HOSTNAME,
      trustedNetworkHelper.MSG.invalidHostname
    );
  });

  it("test adding DNS Resolving with Invalid IP Address", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      trustedNetworkHelper.TYPES[1],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[1].placeHolder2,
      trustedNetworkHelper.INVALID_IP,
      trustedNetworkHelper.MSG.invalidIP
    );
  });

  it("test adding Ping Response - Hostname (least secure) with Invalid Hostname", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      trustedNetworkHelper.TYPES[2],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[2].placeHolder,
      trustedNetworkHelper.INVALID_HOSTNAME,
      trustedNetworkHelper.MSG.invalidHostname
    );
  });

  it("test adding Ping Response - IP Address (least secure)with Invalid ip address", () => {
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.newButton);
    trustedNetworkHelper.chooseFromDropDown(
      trustedNetworkHelper.LOCATORS.networkTypeDropDown,
      trustedNetworkHelper.TYPES[3],
      trustedNetworkHelper.LOCATORS.listBox
    );
    trustedNetworkHelper.typeInvalidInput(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[3].placeHolder,
      trustedNetworkHelper.INVALID_IP,
      trustedNetworkHelper.MSG.invalidIP
    );
  });

  it("test adding HTTP Response, DNS Resolving, Ping Response - IP and Ping Response - Hostname with valid URL", () => {
    for (let i = 0; i < 4; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(
        trustedNetworkHelper.TRUSTED_NETWORK_DATA[i]
      );
    }
    trustedNetworkHelper.setRadioButtonState(
      trustedNetworkHelper.LOCATORS.toggleButton,
      true
    );
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
    cy.reload();
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.setRadioButtonState(
      trustedNetworkHelper.LOCATORS.toggleButton,
      false
    );
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
    trustedNetworkHelper.assertEmptyTable();
  });

  it("test adding 3 Ping Response - IP Address rules (least secure) and test adding 2 Ping Response - Hostname rules", () => {
    for (let i = 0; i < 3; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(
        trustedNetworkHelper.TRUSTED_NETWORK_DATA[2]
      );
    }
    for (let i = 0; i < 2; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(
        trustedNetworkHelper.TRUSTED_NETWORK_DATA[3]
      );
    }
    cy.wait(2000);
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 4 Ping Response - IP Address rules (least secure) and test adding 2 Ping Response - Hostname rules", () => {
    trustedNetworkHelper.addNewTrustedNetwork(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[2]
    );
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.pingError);
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.exitButton);
    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 5 HTTPresponse rules", () => {
    for (let i = 0; i < 5; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(
        trustedNetworkHelper.TRUSTED_NETWORK_DATA[0]
      );
    }
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 5 HTTPresponse rules and 5 DNS Resolving rules", () => {
    for (let i = 0; i < 5; i++) {
      trustedNetworkHelper.addNewTrustedNetwork(
        trustedNetworkHelper.TRUSTED_NETWORK_DATA[1]
      );
    }
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });

  it("test adding 6 HTTPresponse rules", () => {
    trustedNetworkHelper.addNewTrustedNetwork(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[0]
    );
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.httpsError);
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.exitButton);
  });

  it("test adding 6 DNS Resolving rules", () => {
    trustedNetworkHelper.addNewTrustedNetwork(
      trustedNetworkHelper.TRUSTED_NETWORK_DATA[1]
    );
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.dnsError);
    trustedNetworkHelper.clickButton(trustedNetworkHelper.LOCATORS.exitButton);

    trustedNetworkHelper.deleteTableContent(
      trustedNetworkHelper.LOCATORS.tableSelector
    );
    trustedNetworkHelper.assertEmptyTable();
    trustedNetworkHelper.assertSave(trustedNetworkHelper.MSG.savedSuccessfully);
  });
});
