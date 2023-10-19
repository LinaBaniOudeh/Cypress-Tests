export const CMA_URL = 'https://cc.test.catonet.works/'
export const LOGIN_URL = 'https://leena-testing.auth.test.catonet.works/'

export const LOGIN_CREDENTIALS = [{
    userName: 'leena.baniodeh@exalt.ps',
    password: 'Lena.1999'
}]

export const LOCATORS = {
  submitButton: '.btn-submit',
  userNameField: '#username',
  passwordField: '#password',
  accessButton: '[data-testvalue="Access"]',
  alwaysOnPolicyButton: '[data-testvalue="Always-On Policy"]',
  addNewRuleButton: '[data-testid="catobutton-new"]',
  saveButton: '[data-testid="editor-submit-btn"]',
  enablePolicyToggle: '[data-testid="switch-accessSettings.alwaysOnPolicyEnabled"]',
  general:'[data-testid="section"]:nth-child(2) ',
  generalNameField:'#name',
  generalPriorty:'#priority',
  generalEnabled:'[data-testid="switch-enabled"]',
  userAndGroup:'[data-testid="section"]:nth-child(3)',
  userAndGroupDropdownMenu1:'[data-testid="section"]:nth-child(3) .MuiV5-Autocomplete-inputRoot input',
  userAndGroupDropdownMenu2:'[data-testid="section"]:nth-child(3) [placeholder*="Search or select SDP User"]',
  userAndGroupListBox:'[data-testid^="actionsmenulist-menu-action"], [class="MuiAutocomplete-popper"] [role="button"], .MuiV5-Autocomplete-popper div[role="button"], .MuiAutocomplete-listbox li',
  platform:'[data-testid="section"]:nth-child(4) ',
  platformDropDownMenu1:'[data-testid="section"]:nth-child(4) .MuiV5-Autocomplete-inputRoot input',
  platformDropDownMenu2:'[data-testid="section"]:nth-child(4) [placeholder*="Search or select Operating System"]',
  platformListBox:'[data-testid="entityfield-value"] , div.MuiV5-Autocomplete-popper [role="listbox"]',
  connected:'[data-testid="section"]:nth-child(5) ',
  alwaysOnDropDownMenu:'#mui-component-select-action',
  alwaysOnListBox:'[role="listbox"]',
  applyButton:'[data-testid="catobutton-apply"]',
  ruleTable:'.MuiV5-TableBody-root',
  ruleRows:'[role="row"]',
  ruleNameCell:'[data-testid="always-on-table-row-cell-name"]',
  usersAndGroupsCell:'[data-testid="always-on-table-row-cell-from"]',
  platformCell:'[data-testid="always-on-table-row-cell-ostypes"]',
  connectedCell:'.MuiV5-Typography-body2',
  popUpmessage:'.notistack-MuiContent-success',
  disconnectSentence:'[data-testid="account-settings-alwayson"] p',
  optionsButton:'[data-testid="actionscell-menu-button"]',
  deleteButton:'[data-testid="actionsmenulist-menu-action-3"]',
  deleteDialog:'.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded[role="dialog"]',
  dialogDeleteButton:'[data-testid="catobutton-generic"]',
  noItemTable:'[data-testid="table-no-items"]',
  expandedList:'Mui-expanded',
  radioButton:' input[type="checkbox"]',
  tableTr:'table tr',
}

export const ALWAYS_ON_RULE_DATA = [{
  ruleName:"Test_always on1",
  ruleOrder:"1",
  enabled: true,
  userType:"SDP User",
  userName:'Leena34 BaniOdeh',
  platform:"Operating System",
  osType:"Windows",
  connected:"Always-On",
},
{
  ruleName:"Test_always on2",
  ruleOrder:"2",
  enabled: true,
  userType:"SDP User",
  userName:"Leena BaniOdeh",
  platform:"Operating System",
  osType:"iOS",
  connected:"Always-On",
}];

export const DISCONNECT_USER_SENTENCE = 'Users that don’t match Always-On rules are allowed to disconnect from the network'
export const SAVE_MESSAGE = 'Saved successfully'
// functions

export function loginToCMA(LOGIN_CREDENTIALS){
  cy.visit(CMA_URL);
  cy.get(LOCATORS.userNameField).type(LOGIN_CREDENTIALS[0].userName)
  cy.get(LOCATORS.submitButton).click()
  cy.url().should("contain",LOGIN_URL);
  cy.get(LOCATORS.userNameField).type(LOGIN_CREDENTIALS[0].userName)
  cy.get(LOCATORS.passwordField).type(LOGIN_CREDENTIALS[0].password)
  cy.get(LOCATORS.submitButton).click()
}
export function navigateToAccess(){
  cy.get(LOCATORS.accessButton).click()
}

export function navigateToalwaysOnPolicy(){
  cy.get(LOCATORS.alwaysOnPolicyButton).click()
}

export function assertEmptyTable(){
  cy.get(LOCATORS.noItemTable).should('exist');
  cy.get(LOCATORS.enablePolicyToggle).should('not.be.checked')
}

function expandDropdownIfNotExpanded(selector) {
  cy.get(selector).then(($dropdown) => {
    if (!$dropdown.hasClass(LOCATORS.expandedList)) {
      // If it's not expanded, click on it to expand
      cy.get(selector).click();
    }
  });
}

export const setRadioButtonState=(selector, shouldBeEnabled) =>{
  cy.get(selector + LOCATORS.radioButton).then(($input) => { 
    const isChecked = $input.is(':checked');
    if (isChecked !== shouldBeEnabled) {
      cy.get(selector).click();
    }
  });
}

export function assertRuleTableContent(){
  cy.get(LOCATORS.ruleTable)
  .find(LOCATORS.ruleRows)
  .should('have.length', 2)
  .each((row, index) => {
    const record = ALWAYS_ON_RULE_DATA[index];
    const cellData = {
      [LOCATORS.ruleNameCell]: record.ruleName,
      [LOCATORS.usersAndGroupsCell]: record.userName,
      [LOCATORS.platformCell]: record.osType,
      [LOCATORS.connectedCell]: record.connected,
    };
    assertCellContent(row, cellData);
  });
}

export function assertCellContent(row, data) {
  cy.wrap(row).within(() => {
    Object.entries(data).forEach(([locator, expectedValue]) => {
      cy.get(locator).should('contain', expectedValue);
    });
  });
}

export function addNewRule(ruleData) {

  // Click the "New" button to open the side menu
  cy.get(LOCATORS.addNewRuleButton).click()

  // General Section
  expandDropdownIfNotExpanded(LOCATORS.general)
  cy.get(LOCATORS.generalNameField).type(ruleData.ruleName);
  cy.get(LOCATORS.generalPriorty).clear().type(ruleData.ruleOrder);
  setRadioButtonState(LOCATORS.generalEnabled, ruleData.enabled)

  // Users & Group Section
  expandDropdownIfNotExpanded(LOCATORS.userAndGroup)
  cy.get(LOCATORS.userAndGroupDropdownMenu1).type(ruleData.userType)
  cy.contains(ruleData.userType).click();
  cy.get(LOCATORS.userAndGroupDropdownMenu2).type(ruleData.userName);
  cy.contains(LOCATORS.userAndGroupListBox,ruleData.userName).click();

  // Platform Section
  expandDropdownIfNotExpanded(LOCATORS.platform);
  cy.get(LOCATORS.platformDropDownMenu1).type(ruleData.platform);  
  cy.contains(ruleData.platform).click();
  cy.get(LOCATORS.platformDropDownMenu2).type(ruleData.osType)
  cy.contains(LOCATORS.platformListBox,ruleData.osType).click();
  
  //Connected Section
  expandDropdownIfNotExpanded(LOCATORS.connected);
  cy.get(LOCATORS.alwaysOnDropDownMenu).click()
  cy.get(LOCATORS.alwaysOnListBox).contains(ruleData.connected).click();

  // Click the "Apply" button to save the rule
  cy.get(LOCATORS.applyButton).click();
}

export function deleteRowByIndex(rowIndex) {
  // Select the three-dot option in the specified row and click it
  cy.get(LOCATORS.tableTr) 
    .eq(rowIndex) // Select the specific row by index
    .find(LOCATORS.optionsButton)
    .click();

  // Click the delete button in the dropdown menu
  cy.get(LOCATORS.deleteButton).as('btn');
  cy.get('@btn').click();
  cy.get(LOCATORS.deleteDialog)
  .contains('button', 'Delete')
  .click();
}

export function assertSavedSuccessfully() {
  // Save and assert pop-up message
  cy.get(LOCATORS.saveButton).click();
  cy.get(LOCATORS.popUpmessage)
    .should('be.visible')
    .contains(SAVE_MESSAGE); //constant
}
  
  
