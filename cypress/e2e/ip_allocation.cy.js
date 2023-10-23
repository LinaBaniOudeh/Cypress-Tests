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


  it.only("Should assert page content", () => {
    ipAllocationHelper.validatePageContent()
  });


  it("Test dynamic ip input field false assertion", () => {
    ipAllocationHelper.typeInvalidInput(ipAllocationHelper.LOCATORS.dynamicIpInputField,ipAllocationHelper.INVALID_IPS[0],ipAllocationHelper.MSG.invalidCIDRFormat)
    ipAllocationHelper.assertDisabledSaveButton(ipAllocationHelper.LOCATORS.saveButton)
   });

   
  it("check validation on adding a static ip without adding a user rule", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.staticIpInputField,ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.noRuleAdded)
   });


   it("check validation on adding a user static ip that not in the range ", () => {
    ipAllocationHelper.addStaticIpRange(ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName,ipAllocationHelper.INVALID_IPS[1])
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.notInRangeIp)
   });

   it("check validation on adding a user static ip in the range ", () => {
    ipAllocationHelper.addStaticIpRange(ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName,ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.savedSuccessfully)
 
    // teardown
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.savedSuccessfully)
   });

   it("check validation on deleting the uers table and save while static ip is enabled", () => {
    ipAllocationHelper.addStaticIpRange(ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName, ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.savedSuccessfully)

    // teardown
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.noRuleAdded)
   });


   it("check validation on adding a duplicate sdp user with exsisted static ip", () => {
    ipAllocationHelper.addStaticIpRange(ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName, ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.savedSuccessfully)
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[1].userName, ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertPopUpMessage(ipAllocationHelper.MSG.duplicateIps)
    
    //teardown 
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.savedSuccessfully)
   });

  
   it("Test overlaps ip in dynamic and static ip range", () => {
    ipAllocationHelper.typeValidInput(ipAllocationHelper.LOCATORS.dynamicIpInputField,ipAllocationHelper.VALID_IPS_Range[1])
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.addStaticIpRange(ipAllocationHelper.VALID_IPS_Range[0])
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName, ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertSave(ipAllocationHelper.MSG.overlapIps)

    //teardown
    ipAllocationHelper.deleteTable()
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,false)
    ipAllocationHelper.clearInputField(ipAllocationHelper.LOCATORS.staticIpInputField)
    ipAllocationHelper.assertSave()
    // ipAllocationHelper.assertPopUpMessage('Saved successfully')
   });

   it("Test adding an SDP user without specifying static ip range", () => {
    ipAllocationHelper.setRadioButtonState(ipAllocationHelper.LOCATORS.staticIpsToggleButton,true)
    ipAllocationHelper.addSDPUser(ipAllocationHelper.USERS[0].userName, ipAllocationHelper.USERS[0].userIP)
    ipAllocationHelper.assertPopUpMessage(ipAllocationHelper.MSG.noIpIsAdded)

   });

});
