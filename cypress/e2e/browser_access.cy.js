/// <reference types="Cypress"/>
import * as browserAccessHelper from "../support/browser_access_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";

import { it } from "mocha";
describe("Browser Access Page", () => {
  // Run this code before each test
  before(() => {
    cy.bypassLogin(
      loginHelper.LOGIN_CREDENTIALS[0].userName,
      loginHelper.LOGIN_CREDENTIALS[0].password
    );
    loginHelper.navigateToURL(loginHelper.BROWSER_ACCESS_URL);
  });

  //Settings
  it("Test Remote Access Conditional Area Visibility Toggle with page content", () => {
    browserAccessHelper.assertAreaVisibility(
      browserAccessHelper.LOCATORS.conditionalArea,
      true
    ); //true:hidden

    browserAccessHelper.setCheckboxAndAssert(
      browserAccessHelper.LOCATORS.enableRemoteAccessCheckBox,
      true
    );
    browserAccessHelper.assertAreaVisibility(
      browserAccessHelper.LOCATORS.conditionalArea,
      false
    ); //false:visible
    browserAccessHelper.assertPageContent();
  });

  it("Test Settings Page Assertion Logo, Ip and Domains", () => {
    //Logo
    browserAccessHelper.uploadIamge(
      browserAccessHelper.IMAGES_TO_UPLOAD.largeImageSize
    );
    browserAccessHelper.assertTextContent(
      browserAccessHelper.LOCATORS.logoErrorMsg,
      browserAccessHelper.PAGE_CONTENT.FileIsLarge
    );
    browserAccessHelper.checkButtonDisabled(
      browserAccessHelper.LOCATORS.saveButton,
      true
    );
    //NAT ip Range
    browserAccessHelper.typeInvalidInput(
      browserAccessHelper.LOCATORS.natIPRangeInput + " input",
      browserAccessHelper.IPs.invalidIP,
      browserAccessHelper.PAGE_CONTENT.invalidCIDRformat
    );
    browserAccessHelper.checkButtonDisabled(
      browserAccessHelper.LOCATORS.saveButton,
      true
    );

    //domain
    browserAccessHelper.addDomain(
      browserAccessHelper.DOMAINS.invalidDomain1,
      false,
      browserAccessHelper.PAGE_CONTENT.invalidDomain
    );
    browserAccessHelper.addDomain(
      browserAccessHelper.DOMAINS.duplicateDomain,
      false,
      browserAccessHelper.PAGE_CONTENT.duplicateDomain
    );
    cy.reload();
  });

  it("Test set Valid Settings", () => {
    browserAccessHelper.setSettings(
      browserAccessHelper.IMAGES_TO_UPLOAD.validImage,
      browserAccessHelper.IPs.validIPwithSubnet,
      browserAccessHelper.DOMAINS.validDomain
    );
    cy.reload();
  });

  it("Assert add application with invalid Host Name", () => {
    browserAccessHelper.clickButton(
      browserAccessHelper.LOCATORS.applicationButton
    );
    browserAccessHelper.addApplication(browserAccessHelper.APPLICATIONS[0]);
    browserAccessHelper.assertSave(browserAccessHelper.MSG.hostNameIsNotValid);
  });

  it("Assert add duplicate application name", () => {
    browserAccessHelper.addApplication(browserAccessHelper.APPLICATIONS[0]);
    browserAccessHelper.assertSave(
      browserAccessHelper.MSG.appDisplayNameisInUse
    );
  });

  it("Assert add application with invalid URL Prefix", () => {
    browserAccessHelper.addApplication(browserAccessHelper.APPLICATIONS[1]);
    browserAccessHelper.assertSave(
      browserAccessHelper.MSG.urlCanContainOnlyLettersAndNumbers
    );
  });

  it("Assert add application with invalid logo, host address, host Name and port", () => {
    //Logo
    browserAccessHelper.clickButton(browserAccessHelper.LOCATORS.newButton);
    browserAccessHelper.uploadIamge(browserAccessHelper.APPLICATIONS[2].logo);
    browserAccessHelper.assertTextContent(
      browserAccessHelper.LOCATORS.logoHelperMsg,
      browserAccessHelper.PAGE_CONTENT.FileIsLarge
    );

    //Host Address
    browserAccessHelper.typeInvalidInput(
      browserAccessHelper.LOCATORS.hostAddress,
      browserAccessHelper.APPLICATIONS[2].hostAddress,
      browserAccessHelper.PAGE_CONTENT.invalidIPOrHostFormat
    );
    //PORT
    browserAccessHelper.typeInvalidInput(
      browserAccessHelper.LOCATORS.port,
      browserAccessHelper.APPLICATIONS[2].port,
      browserAccessHelper.PAGE_CONTENT.portMaxValueExceeded
    );
    browserAccessHelper.typeInvalidInput(
      browserAccessHelper.LOCATORS.port,
      browserAccessHelper.APPLICATIONS[3].port,
      browserAccessHelper.PAGE_CONTENT.thisInvalidNumber
    );
    //Host Name
    browserAccessHelper.typeInvalidInput(
      browserAccessHelper.LOCATORS.hostName,
      browserAccessHelper.APPLICATIONS[3].hostName,
      browserAccessHelper.PAGE_CONTENT.invalidDomain
    );
    cy.reload();
  });

  it("Test Add Valid Applications", () => {
    browserAccessHelper.APPLICATIONS.forEach((app, index) => {
      if (index >= 4) {
        browserAccessHelper.addApplication(app);
        browserAccessHelper.assertSave(
          browserAccessHelper.MSG.savedSuccessfully
        );
      }
    });
  });

  it("Test Add access policy rules", () => {
    browserAccessHelper.clickButton(browserAccessHelper.LOCATORS.accessPolicy);
    browserAccessHelper.ACCESS_POLICY_DATA.forEach((rule) => {
      browserAccessHelper.addNewRule(rule);
    });
    browserAccessHelper.assertSave(browserAccessHelper.MSG.savedSuccessfully);
  });

  it("Test Prevents App Deletion When Policy Is Using It", () => {
    browserAccessHelper.clickButton(
      browserAccessHelper.LOCATORS.applicationButton
    );
    browserAccessHelper.deleteRow(1);
    browserAccessHelper.assertTextContent(
      browserAccessHelper.LOCATORS.dialogContent,
      browserAccessHelper.PAGE_CONTENT.canNotDeleteApp
    );
    browserAccessHelper.clickButton(browserAccessHelper.LOCATORS.confirmButton);
  });

  it("teardown", () => {
    //delete all access policy rules
    browserAccessHelper.clickButton(browserAccessHelper.LOCATORS.accessPolicy);

    for (let i = 0; i < 3; i++) {
      browserAccessHelper.DeleteByIndex(1);
    }
    browserAccessHelper.assertEmptyTable(
      browserAccessHelper.LOCATORS.accessPolicyRuleTable
    );
    browserAccessHelper.assertSave(browserAccessHelper.MSG.savedSuccessfully);
    browserAccessHelper.clickButton(
      browserAccessHelper.LOCATORS.applicationButton
    );
    browserAccessHelper.deleteTableContent(
      browserAccessHelper.LOCATORS.applicationTable2
    );
    browserAccessHelper.assertEmptyTable(
      browserAccessHelper.LOCATORS.applicationTable1
    );
    browserAccessHelper.assertSave(browserAccessHelper.MSG.savedSuccessfully);
  });
});
