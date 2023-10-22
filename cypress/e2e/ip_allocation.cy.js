/// <reference types="Cypress"/>
import * as ipAllocationHelper from '../support/ip_allocation_helper.js';
import * as loginHelper from '../support/login_to_system_helper.js';


describe("Ip Allocation Page", () => {
  // Run this code before each test
  beforeEach(() => {
    // Visit the Wikipedia homepage
    loginHelper.loginToCMA(loginHelper.LOGIN_CREDENTIALS)
    loginHelper.navigateToAccess()
    ipAllocationHelper.navigateToIpAllocation()
  });


  it("Should assert page content", () => {
    ipAllocationHelper.validatePageContent()
  });


  it("Test dynamic ip input field false assertion", () => {
    ipAllocationHelper.typeInvalidInput(ipAllocationHelper.LOCATORS.dynamicIpInputField,"20.41.0.")
    ipAllocationHelper.assertDisabledSaveButton(ipAllocationHelper.LOCATORS.saveButton)
   });

   
  it("check validation on adding a static ip without adding a user rule", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,"10.41.0.0/16")
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('Static IP enabled but no rules were defined')
   });

   it("check validation on adding a user static ip that not in the range ", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,"10.41.0.0/16")
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.chooseFromDropDown(ipAllocationHelper.LOCATORS.sdpUserInput,"Leena BaniOdeh",ipAllocationHelper.LOCATORS.listBox)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.sdpIPInput,"10.44.0.0")
    ipAllocationHelper.clickButton(ipAllocationHelper.LOCATORS.addButton)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('10.44.0.0 is not in the static IP range 10.41.0.0/16')
   });

   it("check validation on adding a duplicate sdp user with exsisted static ip", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,"10.41.0.0/16")
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.chooseFromDropDown(ipAllocationHelper.LOCATORS.sdpUserInput,"Leena4 BaniOdeh",ipAllocationHelper.LOCATORS.listBox)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.sdpIPInput,"10.41.0.1")
    ipAllocationHelper.clickButton(ipAllocationHelper.LOCATORS.addButton)
    ipAllocationHelper.chooseFromDropDown(ipAllocationHelper.LOCATORS.sdpUserInput,"Leena34 BaniOdeh",ipAllocationHelper.LOCATORS.listBox)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.sdpIPInput,"10.41.0.1")
    ipAllocationHelper.clickButton(ipAllocationHelper.LOCATORS.addButton)
    ipAllocationHelper.assertPopUpMessage('10.41.0.1 is already allocated to an SDP user')
    
    //teardown 
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('Saved successfully')

   });

   it("check validation on adding a user static ip in the range ", () => {
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,"10.41.0.0/16")
    ipAllocationHelper.chooseFromDropDown(ipAllocationHelper.LOCATORS.sdpUserInput,"Leena BaniOdeh",ipAllocationHelper.LOCATORS.listBox)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.sdpIPInput,"10.41.0.1")
    ipAllocationHelper.clickButton(ipAllocationHelper.LOCATORS.addButton)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('Saved successfully')

    // teardown
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('Saved successfully')

   });

   it.only("Test overlaps ip in dynamic and static ip range", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.dynamicIpInputField,"10.41.0.0/24")
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,"10.41.0.0/16")
    ipAllocationHelper.chooseFromDropDown(ipAllocationHelper.LOCATORS.sdpUserInput,"Leena BaniOdeh",ipAllocationHelper.LOCATORS.listBox)
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.sdpIPInput,"10.41.0.1")
    ipAllocationHelper.clickButton(ipAllocationHelper.LOCATORS.addButton)
    ipAllocationHelper.assertSave()
    ipAllocationHelper.assertPopUpMessage('Dynamic IP range overlaps Static IP range')
    
    //teardown
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave()
    // ipAllocationHelper.assertPopUpMessage('Saved successfully')
   });

});
