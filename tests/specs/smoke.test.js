const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const LoginPage = require('../pages/smoke.page');
// This test checks if the website is up and running
describe('Login Page Tests', function() {
  let driver;
  let loginPage;

  before(async function() {
    driver = await createDriver();
    loginPage = new LoginPage(driver);

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

  beforeEach(async function() {
    await loginPage.navigate();
  });

  it('should display error message with invalid credentials', async function() {
    await loginPage.login('invalid@email.com', 'invalidpassword');
    const errorMessage = await driver.findElement({ css: '.error' }).getText();
    expect(errorMessage).to.include('Invalid email or password');
  });

  // Add more test cases here
});