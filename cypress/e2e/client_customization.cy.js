/// <reference types="Cypress"/>
import * as clientCustomizationHelper from "../support/client_customization_helper.js";
import { LOCATORS, clickButton } from "../support/client_rollout_helper.js";
import * as loginHelper from "../support/login_to_system_helper.js";

import { it } from "mocha";
describe("Ckient Customization Page", () => {
  // Run this code before each test
  before(() => {
    cy.bypassLogin(
      loginHelper.LOGIN_CREDENTIALS[0].userName,
      loginHelper.LOGIN_CREDENTIALS[0].password
    );
    loginHelper.navigateToURL(loginHelper.CLIENT_CUSTOMIZATION_URL);
  });

  it("Assert Page Content", () => {
    clientCustomizationHelper.assertPageContent();
  });

  it("upload Invalid type of image", () => {
    clientCustomizationHelper.uploadIamge(
      clientCustomizationHelper.imagesToUpload.invalidType
    );
    clientCustomizationHelper.assertTextContent(
      clientCustomizationHelper.LOCATORS.underImageText,
      clientCustomizationHelper.MSG.unsupportedType
    );
    clientCustomizationHelper.checkButtonDisabled(LOCATORS.saveButton, true);
  });

  it("upload large size Image", () => {
    clientCustomizationHelper.uploadIamge(
      clientCustomizationHelper.imagesToUpload.largeImageSize
    );
    clientCustomizationHelper.assertTextContent(
      clientCustomizationHelper.LOCATORS.underImageText,
      clientCustomizationHelper.MSG.largeImageSize
    );
    clientCustomizationHelper.checkButtonDisabled(LOCATORS.saveButton, true);
  });


  it("upload image with valid size and Type", () => {
    clientCustomizationHelper.uploadIamge(
      clientCustomizationHelper.imagesToUpload.validImage
    );
    clientCustomizationHelper.assertSave(
      clientCustomizationHelper.MSG.savedSuccessfully
    );
  });

  it("Remove Image ", () => {
    cy.reload()
    clientCustomizationHelper.clickButton(
      clientCustomizationHelper.LOCATORS.removeButton
    );
    clientCustomizationHelper.assertSave(
      clientCustomizationHelper.MSG.savedSuccessfully
    );
  });
});
