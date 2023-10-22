
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
enableStaticIps:'.cQVevh',
staticIpsToggleButton:'input[name="accessSettings.staticIpAllocationEnabled"]',
warningText:'.yVPiD > .sc-gXLHMB > .sc-cUoWTh',
staticIpRange:'.seedV5-jssV529 > .cSQsIm',
allocateIpPerSDPUser:'.sc-jhbjDc > .sc-cUoWTh',
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
//[placeholder="Search or select SDP User"]
}

export function navigateToIpAllocation(){
    cy.get(LOCATORS.ipAllocationButton).click()
       
}

export function validatePageContent(){
    cy.title().should("include", "IP Allocation Policy");
    cy.get(LOCATORS.pageTitle).should('have.text',"IP Allocation Policy")
    cy.get(LOCATORS.dynamicIp).should('contain', 'Dynamic IP');
    cy.get(LOCATORS.dynamicIpText1).should('contain', 'Define the default IP range for your SDP users');
    cy.get(LOCATORS.dynamicIpRange).should('have.text',"IP Range")
    cy.get(LOCATORS.staticIp).should('contain', 'Static IP');
    cy.get(LOCATORS.staticIpText1).should('contain', 'Allocate a pre-defined static IP address to SDP users, instead of from the dynamic IP range');
    cy.get(LOCATORS.enableStaticIps).should('contain.text',"Enable Static IPs")
    // Find the toggle button
    cy.get(LOCATORS.staticIpsToggleButton).should('not.be.checked');

    // Find the text and assert its visibility
    cy.get(LOCATORS.warningText)
    .should('be.visible')
    .should('have.text', 'When disabled, all IPs are only allocated from the Dynamic IP range');
    cy.get(LOCATORS.staticIpRange).should('contain.text',"IP Range")
    cy.get(LOCATORS.allocateIpPerSDPUser).should('contain.text',"Allocate IP per SDP User")
    cy.get(LOCATORS.sdpUser).should('contain.text',"SDP User")
    cy.get(LOCATORS.roleTable).should('contain.text', "No data")
    cy.get(LOCATORS.roleTableCell)
    .eq(0) // Select the first <td>
    .should('contain', 'SDP User');

    cy.get(LOCATORS.roleTableCell)
    .eq(1) // Select the second <td>
    .should('contain', 'Static IP address');
}

export function typeInvalidInput(selector,value){
    cy.get(selector).clear().type(value);
    cy.get(selector).should('have.attr', 'aria-invalid', 'true');

}

export function assertDisabledSaveButton(selector){
    cy.get(selector).should('have.attr', 'disabled');

}

export function typeValidInput(selector, value){
    cy.get(selector).clear().type(value)
    cy.get(selector).should('have.attr', 'aria-invalid', 'false');

}

export function assertSave(message) {
    // Save and assert pop-up message
    cy.get(LOCATORS.saveButton).click();
    // cy.get(LOCATORS.popUpMessage)
    //   .should('be.visible')
    //   .contains(message); //constant
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
  
    // cy.get(dropdownSelector).type(optionText ,{ delay: 500 }).should('be.visible'); // Type the text to search for the option
  
    // Wait for the option to become visible in the dropdown list
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

function deleteRows(rows) {
    if (rows.length === 0) {
      // All rows are deleted, exit the recursion
      return;
    }
  
    const currentRow = rows[0];
  
    // Click the delete button in the current row
    cy.wrap(currentRow)
      .find('button[data-testid="table-btn-delete-row"]')
      .click()
      .then(() => {
        // Use should('not.exist') to check if the current row is removed
        // cy.wrap(currentRow).should('not.exist', { timeout: 10000 });
  
        // Recursively call deleteRows with the remaining rows
        deleteRows(rows.slice(1));
      });
  }
  


export function deleteTable() {

      cy.get(LOCATORS.tableTr) 
      .eq(1) // Select the specific row by index
      .find(LOCATORS.deleteUserButton)
      .click();
}

export function clearInputField(selector){
    cy.get(selector).clear()
}
