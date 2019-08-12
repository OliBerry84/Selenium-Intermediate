const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const SelectPage = require("../pages/select");

suite(function(env) {
    describe('Dropdown', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new SelectPage(driver);
            await page.open();
        });

        it('Updates status text', async function() {
            await page.clickOption('option3');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("option3"));
        });

        it('Updates radial button', async function() {
            await page.clickRadioButton('radio2');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("radio2"));
        });

        after(async function() {
            driver.quit();
        });
    });
});