import {Page,Locator,expect} from '@playwright/test'

export class LoginPage{

readonly page: Page;
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginButton: Locator;
readonly errorMessage: Locator;

constructor(page:Page){
    this.page=page;
    this.usernameInput=page.getByPlaceholder('Username');
    this.passwordInput=page.getByLabel('Password');
    this.loginButton=page.getByRole('button',{name:'Login'});
    this.errorMessage=page.locator('[data-test=error]');
}

async navigate(url:string){
await this.page.goto(url);
}

async login(username:string,password:string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

}

async verifyErrorMessage(expectedText:string){
    await expect(this.errorMessage).toContainText(expectedText);
}
}
