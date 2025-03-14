

class LoginPage {

  constructor(page) {
      this.page = page;  
  }

  async perform_valid_login(base_url, username, password) {
      await this.page.goto(base_url);
      await this.page.getByPlaceholder("Phone / Email").click();
      await this.page.getByPlaceholder("Phone / Email").fill(username);
      await this.page.getByPlaceholder("Password").click();
      await this.page.getByPlaceholder("Password").fill(password);
      await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async perform_invalid_username(base_url, username, password) {
      await this.page.goto(base_url);
      await this.page.getByPlaceholder("Phone / Email").click();
      await this.page.getByPlaceholder("Phone / Email").fill(username);
      await this.page.getByPlaceholder("Password").click();
      await this.page.getByPlaceholder("Password").fill(password);
      await this.page.getByRole('button', { name: 'Log In' }).click();

  }
  async perform_invalid_password(base_url, username, password) {
    await this.page.goto(base_url);
    await this.page.getByPlaceholder("Phone / Email").click();
    await this.page.getByPlaceholder("Phone / Email").fill(username);
    await this.page.getByPlaceholder("Password").click();
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
    

}

}

// Use CommonJS export
module.exports = LoginPage;

