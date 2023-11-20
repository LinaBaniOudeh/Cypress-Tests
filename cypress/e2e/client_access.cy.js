/// <reference types="Cypress"/>
import * as clientAccessHelper from "../support/client_access_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";

import { it } from "mocha";
describe("Ckient Access Page", () => {
  // Run this code before each test
  before(() => {
    cy.bypassLogin(
      loginHelper.LOGIN_CREDENTIALS[0].userName,
      loginHelper.LOGIN_CREDENTIALS[0].password
    );
    loginHelper.navigateToURL(loginHelper.CLIENT_ACCESS_URL);
  });

  it("Test Change Authentication from User & Password to SSO", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.authentication
    );
    clientAccessHelper.setAuthentication(
      clientAccessHelper.AUTHENTICATION_DATA[2]
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it("Test Change Authentication from SSO to SSO", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.authentication
    );
    clientAccessHelper.setAuthentication(
      clientAccessHelper.AUTHENTICATION_DATA[6]
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it('Test Change Authentication to "MFA" with valid duration', () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.authentication
    );
    clientAccessHelper.setAuthentication(
      clientAccessHelper.AUTHENTICATION_DATA[4]
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it('Test Change Authentication to "MFA" with unvalid duration', () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.authentication
    );
    clientAccessHelper.setAuthentication(
      clientAccessHelper.AUTHENTICATION_DATA[3]
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.negativeDuration);
    cy.reload();
  });

  it("Test Change Authentication to User & Password ", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.authentication
    );
    clientAccessHelper.setAuthentication(
      clientAccessHelper.AUTHENTICATION_DATA[0]
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it('Test adding all operating systems under "Blocked operating systems" and assert "No option" will appear under "Operating systems that require a certificate" ', () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    const operatingSystemsList = Object.values(
      clientAccessHelper.OPERATING_SYSTEMS
    );
    operatingSystemsList.forEach((os) => {
      clientAccessHelper.chooseFromDropDown(
        clientAccessHelper.LOCATORS.blockedOperatingSystems,
        os,
        clientAccessHelper.LOCATORS.listBox2
      );
    });

    clientAccessHelper.clickButton(
      clientAccessHelper.LOCATORS.operatingSystemsThatRequireACertificate
    );
    clientAccessHelper.assertTextContent(
      clientAccessHelper.LOCATORS.listBox2,
      clientAccessHelper.PAGE_CONTENT.noOptions
    );
    clientAccessHelper.assertOptionsExist(
      clientAccessHelper.LOCATORS.osTable,
      operatingSystemsList
    );
    cy.reload();
  });

  it('Assert selectd Os under "Blocked operating systems" will not appear under "Operating systems that require a certificate"', () => {
    const operatingSystemsList = [
      clientAccessHelper.OPERATING_SYSTEMS.windows,
      clientAccessHelper.OPERATING_SYSTEMS.macOS,
    ];
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    operatingSystemsList.forEach((os) => {
      clientAccessHelper.chooseFromDropDown(
        clientAccessHelper.LOCATORS.blockedOperatingSystems,
        os,
        clientAccessHelper.LOCATORS.listBox2
      );
    });
    clientAccessHelper.clickButton(
      clientAccessHelper.LOCATORS.operatingSystemsThatRequireACertificate
    );
    clientAccessHelper.assertOptionsDoNotExist(
      clientAccessHelper.LOCATORS.listBox2,
      operatingSystemsList
    );
    clientAccessHelper.assertOptionsExist(
      clientAccessHelper.LOCATORS.osTable,
      operatingSystemsList
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
    cy.reload();
  });

  it("Test upload certificate and assert certificate table content ", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    clientAccessHelper.addCertificate(clientAccessHelper.CERTIFICATE);
    clientAccessHelper.assertPopUpMessage(
      clientAccessHelper.MSG.certificateUploadedSuccessfully
    );
    cy.reload();
  });

  it('Assert selectd Os under "Operating systems that require a certificate" will not appear under "Blocked operating systems"', () => {
    const operatingSystemsList = [
      clientAccessHelper.OPERATING_SYSTEMS.linux,
      clientAccessHelper.OPERATING_SYSTEMS.iOS,
    ];

    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    operatingSystemsList.forEach((os) => {
      clientAccessHelper.chooseFromDropDown(
        clientAccessHelper.LOCATORS.operatingSystemsThatRequireACertificate,
        os,
        clientAccessHelper.LOCATORS.listBox2
      );
    });
    clientAccessHelper.clickButton(
      clientAccessHelper.LOCATORS.blockedOperatingSystems
    );
    clientAccessHelper.assertOptionsDoNotExist(
      clientAccessHelper.LOCATORS.listBox2,
      operatingSystemsList
    );
    clientAccessHelper.assertOptionsExist(
      clientAccessHelper.LOCATORS.osCertificateTable,
      operatingSystemsList
    );
    clientAccessHelper.deleteRowByIndex(clientAccessHelper.LOCATORS.osCertificateTable, 0)
    cy.wait(1000)
    clientAccessHelper.assertTextContent(
      clientAccessHelper.LOCATORS.tableError,
      clientAccessHelper.PAGE_CONTENT.uploadCertificate
    );
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
  });

  it("Test Assert certificate details", () => {
    const certificateDetails = Object.values(
      clientAccessHelper.CERTIFICATE.details
    );
    clientAccessHelper.clickButton(clientAccessHelper.LOCATORS.showDetails);
    certificateDetails.forEach((element) => {
      clientAccessHelper.assertTextContent(
        clientAccessHelper.LOCATORS.dialog,
        element
      );
    });
    clientAccessHelper.clickButton(clientAccessHelper.LOCATORS.closeButton);
    cy.reload();
  });

  it("Test upload duplicate certificate and assert error msg", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    clientAccessHelper.addCertificate(clientAccessHelper.CERTIFICATE);
    clientAccessHelper.assertPopUpMessage(
      clientAccessHelper.MSG.certificateAlreadyUploaded
    );
    cy.reload();
  });

  it("Test Delete certificate", () => {
    clientAccessHelper.expandDropdownIfNotExpanded(
      clientAccessHelper.LOCATORS.deviceAuthentication
    );
    clientAccessHelper.deleteRowByIndex(
      clientAccessHelper.LOCATORS.certificateTable,
      0
    );

  });

  it("Teardown", () => {
    for (let index = 0; index < 2; index++) {
      clientAccessHelper.deleteRowByIndex(
        clientAccessHelper.LOCATORS.osCertificateTable,
        0
      );
      clientAccessHelper.deleteRowByIndex(
        clientAccessHelper.LOCATORS.osTable,
        0
      );
    }
    clientAccessHelper.assertSave(clientAccessHelper.MSG.savedSuccessfully);
  });
});
