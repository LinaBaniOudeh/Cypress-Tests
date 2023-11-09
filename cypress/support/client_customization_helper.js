export const LOCATORS = {
  pageTitle: "#page-title h3",
  fieldLabel: '[data-testid="fieldlabel-root"] h6',
  logoText: '[data-testid="fieldlabel-root"]',
  saveButton: '[data-testid="editor-submit-btn"]',
  removeButton: ".MuiV5-Grid2-root > .MuiV5-Box-root button",
  underImageText: ".MuiV5-Grid2-root > .MuiV5-Box-root span",
  droArea: ".dropArea",
  inputFile: "input[type=file]",
  popUpMessage: "#notistack-snackbar",
};

export const PAGE_CONTENT = {
  clientCustomization: "Client Customization",
  chooseTheLogo: "Choose the logo to display for your users on SDP Client",
  logo: "Logo",
  upload: "Upload a transparent logo image",
  dropHere: "Drop here or browse",
  disabled: "disabled",
};

export const MSG = {
  invalidType: "Image type is not supported",
  savedSuccessfully: "Saved successfully",
  unsupportedType: "Supported types are: png, jpg, jpeg, gif",
  largeImageSize: "File size exceeds 200 KB",
};

export const imagesToUpload = {
  validImage: "cypress/fixtures/validImage.png",
  InvalidImage: "cypress/fixtures/invalidImage.jpg",
  invalidType: "cypress/fixtures/invalidType.webp",
  largeImageSize: "cypress/fixtures/largeImageSize.jpg",
};

export function assertTextContent(selector, text) {
  cy.get(selector).should("contain.text", text);
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

export function assertPageContent() {
  assertTextContent(LOCATORS.pageTitle, PAGE_CONTENT.clientCustomization);

  assertTextContent(LOCATORS.fieldLabel, PAGE_CONTENT.chooseTheLogo);
  assertTextContent(LOCATORS.logoText, PAGE_CONTENT.logo);
  assertTextContent(LOCATORS.logoText, PAGE_CONTENT.upload);
  assertTextContent(LOCATORS.underImageText, PAGE_CONTENT.dropHere);
}

export function uploadIamge(path) {
  cy.get(LOCATORS.inputFile).selectFile(path, { force: true });
}

export function checkButtonDisabled(buttonSelector, isDisabled) {
  cy.get(buttonSelector).should(
    "have.attr",
    PAGE_CONTENT.disabled,
    isDisabled ? PAGE_CONTENT.disabled : undefined
  );
}
