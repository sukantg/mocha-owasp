const { expect } = require('chai');
const { createDriver } = require('../config/setup'); // Assuming your driver setup is in this file
const { By, until } = require('selenium-webdriver');

describe('Juice Shop Product Details Tests', function() {
  let driver;

  before(async function() {
    driver = await createDriver();
  });

  after(async function() {
    await driver.quit();
  });

  beforeEach(async function() {
    // Navigate to the Juice Shop URL
    await driver.get('https://juice-shop.herokuapp.com/#/');

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

  it('should display product details and reviews for Apple Juice', async function() {

    // Find the first product using mat-grid-tile
    const firstProductTile = await driver.wait(
        until.elementLocated(By.css('mat-grid-tile:first-child')),
        5000 // Adjust timeout as needed
      );

    // Click on the first product tile
    await firstProductTile.click();

    // Wait for the product details dialog to appear
    const productDialog = await driver.wait(
      until.elementLocated(By.css('mat-dialog-container')),
      5000
    );

    // Assert that the dialog is displayed
    const isDialogDisplayed = await productDialog.isDisplayed();
    expect(isDialogDisplayed).to.be.true;

    // Assert that the product image exists
    const productImage = await driver.findElement(
      By.css('img.img-thumbnail[alt="Apple Juice (1000ml)"]')
    );
    const isImageDisplayed = await productImage.isDisplayed();
    expect(isImageDisplayed).to.be.true;

    // Click on the Reviews section
    const reviewsButton = await driver.findElement(
      By.css('button[aria-label="Expand for Reviews"]')
    );
    await reviewsButton.click();

    // Wait for reviews to be visible
    await driver.sleep(2000); // Wait for 2 seconds as requested

    // Close the product dialog
    const closeButton = await driver.findElement(
      By.css('button[aria-label="Close Dialog"]')
    );
    await closeButton.click();

    // Wait for dialog to close
    await driver.wait(
      until.elementIsNotVisible(productDialog),
      5000
    );
  });
});