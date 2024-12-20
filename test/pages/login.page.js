class LoginPage {
    constructor(driver) {
      this.driver = driver;
      this.url = 'https://juice-shop.herokuapp.com/#/login';
      this.emailInput = 'input[name="email"]';
      this.passwordInput = 'input[name="password"]';
      this.loginButton = 'button#loginButton';
    }
  
    async navigate() {
      await this.driver.get(this.url);
    }
  
    async login(email, password) {
      await this.driver.findElement({ css: this.emailInput }).sendKeys(email);
      await this.driver.findElement({ css: this.passwordInput }).sendKeys(password);
      await this.driver.findElement({ css: this.loginButton }).click();
    }
  }
  
  module.exports = LoginPage;