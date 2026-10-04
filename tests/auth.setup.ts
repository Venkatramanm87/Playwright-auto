

import { test, expect } from '../fixtures/pageFixtures';
import { LoginPage } from '../pages/LoginPage';
import { TEST_DATA } from '../utils/testdata';

const standardUserAuthFile = 'tests/auth.standardUser.json';
const problemUserAuthFile = 'tests/auth.problemUser.json';

test('Setup for authentication tests as Standard User', async ({ loginPage }) => {

    loginPage.navigate(TEST_DATA.url);
    await loginPage.login(TEST_DATA.users.standard, TEST_DATA.users.password);
    await expect(loginPage.page).toHaveURL(/inventory.html/);
    await loginPage.page.context().storageState({path: standardUserAuthFile });
});

test('Setup for authentication tests as Problem User', async ({ loginPage }) => {

    loginPage.navigate(TEST_DATA.url);
    await loginPage.login(TEST_DATA.users.problem, TEST_DATA.users.password);
    await expect(loginPage.page).toHaveURL(/inventory.html/);
    await loginPage.page.context().storageState({path: problemUserAuthFile });
});

