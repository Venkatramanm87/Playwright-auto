import {Page,Locator,expect} from '@playwright/test'

export class InventoryPage{

    readonly page:Page;
    readonly shoppingCartBadge:Locator;
    readonly shoppingCartLink:Locator;
    readonly pageTitle: Locator;


    constructor(page: Page){
        this.page=page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('.title');
    
    }

    async addItemToCartByName(productName: string){
        const productCard = this.page
        .locator('.inventory_item')
        .filter({hasText : productName});
        await productCard.getByRole('button', {name:'Add to cart'}).click();

    }
    async verifyCartCount(count:string){
        await expect(this.shoppingCartBadge).toHaveText(count);
    }
    
    async goToCart() {
    await this.shoppingCartLink.click();
  }

    }
