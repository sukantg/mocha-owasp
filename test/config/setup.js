const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
  const options = new chrome.Options();
  // Add any Chrome options you need
  // options.addArguments('--headless');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // Set implicit wait time
  await driver.manage().setTimeouts({ implicit: 5000 });
  return driver;
}

module.exports = { createDriver };
