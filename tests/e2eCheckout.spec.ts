import { test, expect } from '../fixtures/pageFixtures';
import { TEST_DATA } from '../utils/testData';

test.describe('Swag Labs E2E Checkout Flow', () => {


  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate(TEST_DATA.url);
  });

  test('User should complete purchase workflow successfully', async ({loginPage,inventoryPage,checkoutPage,page}) => {
    // 1. Authenticate using values from TEST_DATA object
    //await loginPage.login(TEST_DATA.users.standard, TEST_DATA.users.password);
    await page.goto('/inventory.html');    
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // 2. Select Items
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await inventoryPage.verifyCartCount('2');

    // 3. Checkout Process
    await inventoryPage.goToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillInformation(
      TEST_DATA.checkoutInfo.firstName,
      TEST_DATA.checkoutInfo.lastName,
      TEST_DATA.checkoutInfo.postalCode
    );

    // 4. Finish and Assert
    await checkoutPage.completePurchase();
    await checkoutPage.verifyOrderSuccess();
  });
});

 // Switch roles dynamically inside a specific test block
test.describe('Problem User Workflows', () => {
  // Override storageState for this specific test suite
  test.use({ storageState: '.auth/problemUser.json' });

  test('Problem user sees modified inventory', async ({ inventoryPage, page }) => {
    await page.goto('/inventory.html');
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});