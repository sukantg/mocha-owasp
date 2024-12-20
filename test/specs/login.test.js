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
  });

  it('should display error message with invalid credentials', async function() {
    await loginPage.login('invalid@email.com', 'invalidpassword');
    const errorMessage = await driver.findElement({ css: '.error' }).getText();
    expect(errorMessage).to.include('Invalid email or password');
  });

  // Add more test cases here
});