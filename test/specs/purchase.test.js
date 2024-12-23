const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const { By, until } = require('selenium-webdriver');

describe('Login Functionality Tests', function() {
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

  it('should login with valid credentials', async function() {
    // Navigate to the Juice Shop login page
    await driver.get('https://juice-shop.herokuapp.com/#/login');

    // Replace with your actual credentials before running the test
    const username = 'zuki.sfo@gmail.com';
    const password = 'test1234';

    // Find the username field and enter username
    const usernameField = await driver.findElement(By.id('email')); 
    await usernameField.sendKeys(username);

    // Find the password field and enter password
    const passwordField = await driver.findElement(By.id('password')); 
    await passwordField.sendKeys(password);

    // Submit the login form
    const submitButton = await driver.findElement(By.id('loginButton')); 
    await submitButton.click();

    // Wait for the successful login indication (e.g., presence of a specific element)
    const successElement = await driver.wait(
      until.elementLocated(By.css('.mat-toolbar-single-row')), // Adjust selector as needed
      5000
    );

    // Assert successful login (e.g., check for welcome message)
    const welcomeMessage = await successElement.getText();
    expect(welcomeMessage).to.include('Welcome'); 

  });
});