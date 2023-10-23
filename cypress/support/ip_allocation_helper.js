
import './commands'
export const SAVE_MESSAGE = 'Saved successfully'

export const LOCATORS = {
ipAllocationButton: '[data-testvalue="IP Allocation Policy"]',
pageTitle:'#page-title > .MuiTypography-root',
ipRangeLabel:'[data-testid="fieldlabel-root"]',
dynamicIp:'[data-testid="section"]:nth-child(1) h4',
dynamicIpText1:'[data-testid="section"]:nth-child(1) h6',
dynamicIpRange:'[data-testid="fieldlabel-root"]:nth-child(1) p',
staticIp:'[data-testid="section"]:nth-child(2) h4',
staticIpText1:'[data-testid="section"]:nth-child(2) h6',
enableStaticIps:"#MarginFixContainer-1-1-2:nth(0)",
staticIpsToggleButton:'input[name="accessSettings.staticIpAllocationEnabled"]',
warningText:'.MuiV5-Grid2-root > .MuiV5-Box-root> .MuiV5-Typography-root',
staticIpRange:".MuiV5-Box-root > #MarginFixContainer-1-1-2:nth(1)" ,
allocateIpPerSDPUser:'.MuiV5-Grid2-root > .MuiV5-Typography-root',
sdpUser:'[data-testid="catotextinput-label"]',
roleTable:'[data-testid="awesometable-table-static-ips"]',
noItems:'[data-testid="table-no-items"]',
roleTableCell:'tr.MuiV5-TableRow-head td',
dynamicIpInputField:'[data-testid="entitytextinputfield-root-vpnRange-input"] input',
saveButton:'[data-testid="editor-submit-btn"]',
popUpMessage:"#notistack-snackbar",
staticIpInputField:'[data-testid="entitytextinputfield-root-accessSettings.staticIpRange-input"] input',
sdpUserInput:'[data-testid="entityautocompletefieldprops-inputuser"] [placeholder="Search or select SDP User"]',
listBox:'.MuiV5-Autocomplete-listbox li',
sdpIPInput:'[data-testid="entitytextinputfield-root-ip-input"] [placeholder="Insert IP from defined range"]',
addButton:'button.MuiV5-Button-containedSizeMedium',
dropdownListButton:'[data-testid="ArrowDropDownIcon"]',
deleteUserButton:'button[data-testid="table-btn-delete-row"]',
tableTr:'table tr',
overrideButton:'[data-testid="catodialog-actions"] > .MuiButton-contained > .MuiButton-label',
helperText:"#vpnRange-helper-text",
ariaDescribedBy:'aria-describedby',
ariaInvalid:'aria-invalid',
//[placeholder="Search or select SDP User"]
}

export const INVALID_IPS=["20.41.0.","10.44.0.0"]
export const VALID_IPS_Range=["10.41.0.0/16", "10.41.0.0/24"]
export const VALID_IPS=["10.41.0.0", "10.41.0.1"]
export const USERS =
[{
    userName:"Leena BaniOdeh",
    userIP:"10.41.0.1"
},
{
    userName:"Leena34 BaniOdeh",
    userIP:"10.41.0.1"
}]


export const MSG = {
    savedSuccessfully: "Saved successfully" ,
    noRuleAdded: "Static IP enabled but no rules were defined",
    overlapIps:"Dynamic IP range overlaps Static IP range",
    duplicateIps:"10.41.0.1 is already allocated to an SDP user",
    notInRangeIp:"10.44.0.0 is not in the static IP range 10.41.0.0/16",
    noIpIsAdded:"Please add a static IP range",
    invalidCIDRFormat:"Invalid CIDR format",
}

export const TEXT_CONTENT= {
    iPAllocationPolicy:"IP Allocation Policy",
    dynamicIp:'Dynamic IP',
    defineTheDefaultIp:'Define the default IP range for your SDP users',
    ipRange:"IP Range",
    staticIp:'Static IP',
    allocateApreDefinedIp:'Allocate a pre-defined static IP address to SDP users, instead of from the dynamic IP range',
    enableStaticIPs:"Enable Static IPs",
    warningMessage:'When disabled, all IPs are only allocated from the Dynamic IP range',
    allocateIpPerSDPUser:"Allocate IP per SDP User",
    sdpUser:"SDP User",
    noData:"No data",
    staticIpAddress:'Static IP address'

}


export function navigateToIpAllocation(){
    cy.get(LOCATORS.ipAllocationButton).click()
       
}

export function validatePageContent(){
    cy.title().should("include", TEXT_CONTENT.iPAllocationPolicy);
    cy.get(LOCATORS.pageTitle).should('have.text',TEXT_CONTENT.iPAllocationPolicy)
    cy.get(LOCATORS.dynamicIp).should('contain', TEXT_CONTENT.dynamicIp);
    cy.get(LOCATORS.dynamicIpText1).should('contain', TEXT_CONTENT.defineTheDefaultIp);
    cy.get(LOCATORS.dynamicIpRange).should('have.text',TEXT_CONTENT.ipRange)
    cy.get(LOCATORS.staticIp).should('contain', TEXT_CONTENT.staticIp);
    cy.get(LOCATORS.staticIpText1).should('contain', TEXT_CONTENT.allocateApreDefinedIp);
    cy.get(LOCATORS.enableStaticIps).should('contain.text',TEXT_CONTENT.enableStaticIPs)
    // Find the toggle button
    cy.get(LOCATORS.staticIpsToggleButton).should('not.be.checked');

    // Find the text and assert its visibility
    cy.get(LOCATORS.warningText)
    .should('be.visible')
    .should('have.text', TEXT_CONTENT.warningMessage);
    cy.get(LOCATORS.staticIpRange).should('contain.text',TEXT_CONTENT.ipRange)
    cy.get(LOCATORS.allocateIpPerSDPUser).should('contain.text',TEXT_CONTENT.allocateIpPerSDPUser)
    cy.get(LOCATORS.sdpUser).should('contain.text',TEXT_CONTENT.sdpUser)
    cy.get(LOCATORS.roleTable).should('contain.text', TEXT_CONTENT.noData)
    cy.get(LOCATORS.roleTableCell)
    .eq(0) // Select the first <td>
    .should('contain', TEXT_CONTENT.sdpUser);

    cy.get(LOCATORS.roleTableCell)
    .eq(1) // Select the second <td>
    .should('contain', TEXT_CONTENT.staticIpAddress);
}

export function typeInvalidInput(selector,value,helperMsg){//arg message
    cy.get(selector).clear().type(value);
    cy.get(selector).should('have.attr', LOCATORS.ariaInvalid, 'true') //locator
    .invoke('attr', LOCATORS.ariaDescribedBy)//locator
    .then((ariaDescribedBy) => {
    // Verify if the text "Invalid CIDR format" is present in the associated element
    cy.get(`[id="${ariaDescribedBy}"]`).should('contain', helperMsg);
  });


}

export function assertDisabledSaveButton(selector){
    cy.get(selector).should('have.attr', 'disabled');

}

export function typeValidInput(selector, value){
    cy.get(selector).clear().type(value)
    cy.get(selector).should('have.attr', LOCATORS.ariaInvalid, 'false'); //locator

}

export function assertSave(message) {
    cy.get(LOCATORS.saveButton).click();
    assertPopUpMessage(message)
}

export function assertPopUpMessage(message){

    cy.get(LOCATORS.popUpMessage)
    .scrollIntoView()
    .should('be.visible')
    .contains(message); //constant
}


export function setRadioButtonState(selector, targetValue) {
    cy.get(selector).should('have.attr', 'value').then((currentValue) => {
      if (currentValue !== targetValue) {
        cy.get(selector).click(); // Click the switch to toggle it
      }
    });
}


export function chooseFromDropDown(dropdownSelector, optionText, searchSelector) {
    cy.get(dropdownSelector).click(); // Click to open the dropdown
    cy.get(searchSelector).contains(optionText).should('be.visible').click();
  }


export function clickButton(selector){

    cy.get(selector).click()
}

// export function deleteTable() {
//     // Select the three-dot option in the specified row and click it
//     // cy.get(LOCATORS.tableTr) 
//     //   .eq(1) // Select the specific row by index
//     //   .find(LOCATORS.deleteUserButton)
//     //   .click();

//     // cy.get(LOCATORS.tableTr).each(($row) => {
//     //     // Click the delete button in each row to delete it
//     //     cy.wrap($row)
//     //       .find(LOCATORS.deleteUserButton)
//     //       .click();
    
//     //     // After clicking, you can perform additional actions if needed,
//     //     // such as confirming the delete action or checking for a confirmation message.
//     //   });
    
//     cy.get('table[data-testid="awesometable-table-static-ips"] tbody tr').each(($row) => {
//         // Click the delete button in each row to delete it
//         // cy.wrap($row)
//         //   .find('button[data-testid="table-btn-delete-row"]')
//         //   .click();
//         cy.wrap($row)
//         .find('button[data-testid="table-btn-delete-row"]')
//         .click();
      
//       // Wait for the element to disappear (you can adjust the timeout as needed)
//         // cy.get($row).should('not.exist', { timeout: 10000 });
    
//         // You can perform additional actions if needed, such as confirming the delete action.
//       });
//     cy.get(LOCATORS.roleTable).should('contain.text', "No data")
// }

// function deleteRows(rows) {
//     if (rows.length === 0) {
//       // All rows are deleted, exit the recursion
//       return;
//     }
  
//     const currentRow = rows[0];
  
//     // Click the delete button in the current row
//     cy.wrap(currentRow)
//       .find('button[data-testid="table-btn-delete-row"]')
//       .click()
//       .then(() => {
//         // Use should('not.exist') to check if the current row is removed
//         // cy.wrap(currentRow).should('not.exist', { timeout: 10000 });
  
//         // Recursively call deleteRows with the remaining rows
//         deleteRows(rows.slice(1));
//       });
//   }
  


export function deleteTable() {

      cy.get(LOCATORS.tableTr) 
      .eq(1) // Select the specific row by index
      .find(LOCATORS.deleteUserButton)
      .click();
}

export function clearInputField(selector){
    cy.get(selector).clear()
}

export function addSDPUser(user,ip){

    chooseFromDropDown(LOCATORS.sdpUserInput,user,LOCATORS.listBox)
    typeValidInput(LOCATORS.sdpIPInput,ip)
    clickButton(LOCATORS.addButton)
}

export function addStaticIpRange(ip){

    typeValidInput(LOCATORS.staticIpInputField,ip)
    setRadioButtonState(LOCATORS.staticIpsToggleButton, true)
}
