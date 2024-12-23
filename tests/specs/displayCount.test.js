const { expect } = require('chai');
const { createDriver } = require('../config/setup');
const { By, until } = require('selenium-webdriver');

describe('Juice Shop Tests', function() {
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

    // Dismiss popup if it appears
    try {
      const dismissButton = await driver.findElement(By.css('button[aria-label="Close Welcome Banner"]'));
      await dismissButton.click();
    } catch (error) {
      console.log('No popup displayed.');
    }

    // Dismiss cookie message if it appears
    try {
      const dismissCookieButton = await driver.findElement({ css: 'a[aria-label="dismiss cookie message"]' });
      await dismissCookieButton.click();
    } catch (error) {
      console.log('No cookie message displayed.');
    }
  });

  it('should change items per page to maximum and display all items', async function() {
    // Scroll to the bottom of the page
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');

    // Open the "Items per page" dropdown
    const dropdown = await driver.findElement(By.css('mat-select[aria-label="Items per page:"]'));
    await dropdown.click();

    // Select the maximum value from the dropdown
    const maxOption = await driver.findElement(By.css('mat-option:last-of-type')); // Select the last option
    const maxItemsText = await maxOption.getText(); // Capture the text of the maximum option
    await maxOption.click();

    // Wait for the page to reload with all items displayed
    await driver.wait(until.elementLocated(By.css('.mat-paginator-range-label')), 5000);

    // Get the total number of items displayed
    const rangeLabel = await driver.findElement(By.css('.mat-paginator-range-label')).getText();
    const [start, end, total] = rangeLabel.match(/\d+/g).map(Number);

    // Assert that all items are displayed
    expect(end).to.equal(total);
    console.log(`Successfully displayed all ${total} items on the home page.`);
  });
});
