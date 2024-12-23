const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const { By, until } = require('selenium-webdriver');

describe('Product Purchase Tests', function() {
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

  it('verify that a purchase can be completed', async function() {
    // Navigate to the Juice Shop login page
    await driver.get('https://juice-shop.herokuapp.com/#/login');

    // Replace with your actual credentials before running the test
    const username = 'workingmail@gmail.com';
    const password = 'workingname';

    // Find the username field and enter username
    const usernameField = await driver.findElement(By.id('email')); 
    await usernameField.sendKeys(username);

    // Find the password field and enter password
    const passwordField = await driver.findElement(By.id('password')); 
    await passwordField.sendKeys(password);

    // Submit the login form
    const submitButton = await driver.findElement(By.id('loginButton')); 
    await submitButton.click();

    // Wait for the successful login indication and assert that the "Your Basket" element is visible
    const successElement = await driver.wait(
      until.elementLocated(By.xpath("//span[contains(text(), 'Your Basket')]")), 
      5000
    );

    // Get the "Add to Basket" buttons for the first 5 products
    const addButtons = await driver.findElements(By.css('.btn-basket')); 

    // Add the first 5 products to the basket and assert the message
  for (let i = 0; i < 5; i++) {
    await addButtons[i].click();

    // Wait for the message to appear
   const productAddedMessage = await driver.wait(
     until.elementLocated(By.css('.mat-simple-snackbar-content')),
      5000,
      'Product added message did not appear within 5 seconds.'
    );

     // Assert that the message says placed product into basket
    const messageText = await productAddedMessage.getText();
    expect(messageText).toMatch(/Placed (.+) into basket\./);
    }

    const basketButton = await driver.findElement(By.xpath("//span[contains(text(), 'Your Basket')]")); 
    expect(basketButton).to.exist; // Assert that the basket button exists
    await basketButton.click();

    // Get initial total price
    const initialTotalPriceElement = await driver.findElement(By.id('price'));
    const initialTotalPrice = await initialTotalPriceElement.getText();

    // Increase product quantity
    const increaseButton = await driver.findElement(By.css('button.mat-icon-button')); 
    await increaseButton.click();

    // Remove the product
    const removeButton = await driver.findElement(By.css('svg.svg-inline--fa.fa-trash-alt.fa-w-14'));
    await removeButton.click();

    // Get latest total price
    const latestTotalPriceElement = await driver.findElement(By.id('price'));
    const latestTotalPrice = await latestTotalPriceElement.getText();
    
    // Assert price change
    expect(latestTotalPrice).not.to.equal(initialTotalPrice); 

    // Proceed to checkout
    const checkoutButton = await driver.findElement(By.id('checkoutButton'));
    await checkoutButton.click();

    // Add a new address
    await driver.wait(until.elementToBeClickable(By.xpath("//button[@routerLink='/address/create']")), 5000);
    await addNewAddressButton.click();

    const country = await driver.findElement(By.id('mat-input-1')); 
    await country.sendKeys('USA');

    const name = await driver.findElement(By.id('mat-input-2')); 
    await name.sendKeys('Sukant');

    const mobile = await driver.findElement(By.id('mat-input-3')); 
    await mobile.sendKeys('4085552222');

    const zip = await driver.findElement(By.id('mat-input-4')); 
    await zip.sendKeys('94110');

    const address = await driver.findElement(By.id('mat-input-5')); 
    await address.sendKeys('Mission Street');

    const city = await driver.findElement(By.id('mat-input-6')); 
    await city.sendKeys('San Francisco');

    const state = await driver.findElement(By.id('mat-input-7')); 
    await state.sendKeys('CA');

    const submit = await driver.findElement(By.id('submitButton'));
    await submit.click();

    // Find and click the first address radio button
    const firstAddress = await driver.findElement(By.id('mat-radio-42'));
    await firstAddress.click();

    // Find and click the "Continue" button
    const continueButton = await driver.findElement(By.xpath('//button[text()="Continue"]')); /
    await continueButton.click();

    // select one day delivery radio button
    const oneDay = await driver.findElement(By.id('mat-radio-43-input'));
    await oneDay.click();

    // Find the wallet balance element
    const walletBalanceElement = await driver.findElement(By.xpath('//span[@class="confirmation card-title"]')); 
    const walletBalanceText = await walletBalanceElement.getText();

    // Verify that the wallet balance is zero
    expect(walletBalanceText).to.equal('0.00');

    /// Click on "Add a credit or debit card"
    const addCardButton = await driver.findElement(By.xpath('//mat-panel-description[text()="Add a credit or debit card"]'));
    await addCardButton.click();

    // Enter card information
    const nameField = await driver.findElement(By.xpath('//select/preceding-sibling::input[@placeholder="Name on Card"]')); 
    await nameField.sendKeys('Sukant G'); 

    const cardNumberField = await driver.findElement(By.xpath('//input[@placeholder="Card number"]')); 
    await cardNumberField.sendKeys('1234567890123456');

    // Click on the expiry month dropdown
    const expiryMonthField = await driver.findElement(By.id('mat-input-10')); 
    await expiryMonthField.click();

    // Select the first option for expiry month
    const firstExpiryMonthOption = await driver.findElement(By.xpath('//select[@id="mat-input-10"]/option[1]'));
    await firstExpiryMonthOption.click();

     // Click on the expiry year dropdown
     const expiryYearField = await driver.findElement(By.id('mat-input-11')); 
     await expiryYearField.click();

    // Select the first option for expiry year
    const firstExpiryYearOption = await driver.findElement(By.xpath('//select[@id="mat-input-11"]/option[1]'));
    await firstExpiryYearOption.click();

    // Submit the form
    const submitCard = await driver.findElement(By.id('submit-button')); 
    await submitCard.click();

    // select card just added
    const firstCard = await driver.findElement(By.id('mat-radio-4')); 
    await firstCard.click();

    // Find and click the "Continue" button
    const continuePayment = await driver.findElement(By.xpath('//button[text()="Continue"]')); 
    await continuePayment.click();

    // Find and click the "Place your order and pay" button
    const placeOrderButton = await driver.findElement(By.xpath('//button[@class="btn btn-pay"]'));
    await placeOrderButton.click();

     // Find the confirmation message element
     const confirmationMessage = await driver.findElement(By.xpath('//h1[@class="confirmation"]'));

     // Get the text of the confirmation message
     const messageText = await confirmationMessage.getText();
 
     // Verify that the message text contains "Thank you for your purchase!"
     expect(messageText).to.include('Thank you for your purchase!');

  });
});