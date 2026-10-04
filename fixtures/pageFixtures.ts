import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import {CheckoutPage} from '../pages/CheckoutPage';

type pageFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
}

export const test = base.extend<pageFixtures>({
    loginPage: async ({page}, use) => {

        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    checkoutPage: async ({page}, use) => {

        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
});


export {expect} from '@playwright/test';
