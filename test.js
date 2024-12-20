const { Builder, By, Key, until } = require('selenium-webdriver');

describe('My Test Suite', () => {
  let driver;

  before(() => {
    driver = new Builder()
      .forBrowser('chrome') 
      .build(); 
  });

  after(() => {
    driver.quit();
  });

  it('should open the homepage', async () => {
    await driver.get('https://juice-shop.herokuapp.com/');
    const title = await driver.getTitle();
    expect(title).to.equal('OWASP Juice Shop'); 
  });
});