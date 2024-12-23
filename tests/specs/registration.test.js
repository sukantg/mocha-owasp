const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const { By, until } = require('selenium-webdriver');

describe('Registration Page', function() {
  let driver;

  before(async function() {
    driver = await createDriver();

    // Dismiss welcome banner if it appears
    try {
      const dismissButton = await driver.findElement(By.css('button[aria-label="Close Welcome Banner"]'));
      await dismissButton.click();
    } catch (error) {
      console.log('No welcome banner displayed.');
    }

    // Dismiss cookie message if it appears
    try {
      const dismissCookieButton = await driver.findElement(By.css('a[aria-label="dismiss cookie message"]'));
      await dismissCookieButton.click();
    } catch (error) {
      console.log('No cookie message displayed.');
    }    
  });

  after(async function() {
    await driver.quit();
  });


  it('should display all validation messages', async function() {
    // Navigate to the registration page
    await driver.get('https://juice-shop.herokuapp.com/#/register');

    // Click the email field
    const emailField = await driver.findElement(By.id('email'));
    await emailField.click();

    // Wait for the validation message to appear
    const emailErrorMessage = await driver.findElement(By.css('.mat-error-messages div:first-child'));
    expect(emailErrorMessage.getText()).to.equal('Please provide an email address.');
 
    // Click the password field
    const passwordField = await driver.findElement(By.id('password'));
    await passwordField.click();

    // Wait for the validation message to appear
    const passwordErrorMessage = await driver.findElement(By.css('.mat-error-messages div:last-child'));
    expect(passwordErrorMessage.getText()).to.equal('Please provide a password.');

    // Click the repeat password field
    const repeatPasswordField = await driver.findElement(By.id('repeatPassword')); 
    await repeatPasswordField.click();

    // Wait for the validation message to appear
    const repeatPasswordErrorMessage = await driver.findElement(By.css('.mat-error-messages div:last-child')); 
    expect(repeatPasswordErrorMessage.getText()).to.equal('Please repeat your password.');

    // Click the security answer field
    const securityAnswerField = await driver.findElement(By.id('securityAnswerControl')); 
    await securityAnswerField.click(); 

    // Wait for the validation message to appear
    const securityAnswerErrorMessage = await driver.findElement(By.css('.mat-error-messages div:last-child')); 
    expect(securityAnswerErrorMessage.getText()).to.equal('Please provide an answer to your security question.');
    
    // Find the toggle element to show password advice
    const toggleElement = await driver.findElement(By.css('mat-slide-toggle'));

    // display password advice
    await toggleElement.click();

   // Find the password strength advice elements
   const passwordStrengthAdviceElements = await driver.findElements(By.css('.mat-password-strength-info .info-row'));

   // Expected advice texts
   const expectedAdviceTexts = [
     "contains at least one lower character",
     "contains at least one upper character",
     "contains at least one digit",
     "contains at least one special character",
     "contains at least 8 characters"
   ];

   // Validate that all advice elements are displayed and have the correct text
   for (let i = 0; i < passwordStrengthAdviceElements.length; i++) {
     const elementText = await passwordStrengthAdviceElements[i].getText();
     expect(elementText).to.equal(expectedAdviceTexts[i]);
   }   
    
  });


  it('should complete a registration', async function() {
    // Navigate to the registration page
    await driver.get('https://juice-shop.herokuapp.com/#/register');

    const email = 'workingmail@gmail.com'
    const password = 'Workingpass20204!'
    const maiden = 'workingname'

    // Fill in the fields
    const emailField = await driver.findElement(By.id('email'));
    emailField.sendKeys(email);
    const passwordField = await driver.findElement(By.id('password'));
    passwordField.sendKeys(password);
    const repeatField = await driver.findElement(By.id('repeatPassword'));
    repeatField.sendKeys(password);

    // Find the security question dropdown
    const securityQuestionDropdown = await driver.findElement(By.css('mat-select[aria-label="Security Question"]'));
    await securityQuestionDropdown.click();
    const mothersMaidenNameOption = await driver.findElement(By.xpath('//mat-option[contains(text(), "Mother\'s maiden name?")]'));
    await mothersMaidenNameOption.click();

    const securityAnswerField = await driver.findElement(By.id('securityAnswerControl'));
    await securityAnswerField.sendKeys(maiden); 

    // Find the register button
    const registerButton = await driver.findElement(By.css('button[type="submit"]'));

    // Check if the register button is enabled (active)
    const isButtonEnabled = await registerButton.isEnabled(); 
    expect(isButtonEnabled).to.be.true; 

    // Click the register button if enabled
    if (isButtonEnabled) {
      await registerButton.click();
    }

    // Wait for the login page to appear
    const loginPage = await driver.wait(
      until.elementLocated(By.css('mat-card[title="Login"]')),
      5000
    );
    expect(loginPage).to.exist;
  });
});