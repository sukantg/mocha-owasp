const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const LoginPage = require('../pages/login.page');

describe('Login Page Tests', function() {
  let driver;
  let loginPage;

  before(async function() {
    driver = await createDriver();
    loginPage = new LoginPage(driver);
  });

  after(async function() {
    await driver.quit();
  });

  beforeEach(async function() {
    await loginPage.navigate();

    // Dismiss welcome banner popup if it appears
    try {
      const dismissBannerButton = await driver.findElement({ css: 'button[aria-label="Close Welcome Banner"]' });
      await dismissBannerButton.click();
    } catch (error) {
      console.log('No welcome banner displayed.');
    }

    // Dismiss cookie message if it appears
    try {
      const dismissCookieButton = await driver.findElement({ css: 'a[aria-label="dismiss cookie message"]' });
      await dismissCookieButton.click();
    } catch (error) {
      console.log('No cookie message displayed.');
    }
  });

  it('should display error message with invalid credentials', async function() {
    await loginPage.login('invalid@email.com', 'invalidpassword');
    const errorMessage = await driver.findElement({ css: '.error' }).getText();
    expect(errorMessage).to.include('Invalid email or password');
  });

  // Add more test cases here
});
