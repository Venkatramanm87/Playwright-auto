
import {Page,Locator,expect} from '@playwright/test'

export class CheckoutPage{

readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  
  
constructor(page:Page){

this.page = page;
this.checkoutButton=this.page.getByRole('button',{name:'Checkout'});
this.firstNameInput=this.page.getByPlaceholder('First Name');
this.lastNameInput=this.page.getByPlaceholder('Last Name');
this.postalCodeInput=this.page.getByPlaceholder('Zip/Postal Code');
this.continueButton=this.page.getByRole('button',{name:'Continue'});

this.finishButton=this.page.getByRole('button',{name:'Finish'});
this.completeHeader = this.page.locator('.complete-header');
}


async proceedToCheckout(){
await this.checkoutButton.click();
}

async fillInformation(firstname:string, lastname:string,postalCode:string){
await this.firstNameInput.fill(firstname);
await this.lastNameInput.fill(lastname);
await this.postalCodeInput.fill(postalCode);
await this.continueButton.click();

}
async completePurchase(){
await this.finishButton.click();
}
async verifyOrderSuccess(){
await expect(this.completeHeader).toHaveText('Thank you for your order!');
}

}