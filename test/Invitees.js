const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const RsvpPage = require('../pages/rsvp');

suite(function(env) {
    describe('RSVP site', function() {
        this.timeout(4000);

        let driver;
        let page;

        before(async function () {
            driver = await env.builder().build()
            page = new RsvpPage(driver);
            await page.open();
        })

        it('has invitee list', async function() {
            let elements = await driver.findElements(page.locators.invitedList);
            assert(elements.length > 0);
        });

        it('has registration form', async function() {
            let elements = await driver.findElements(page.locators.registrationForm);
            assert(elements.length > 0);
        });

        it('loads existing invitations', async function() {
            //implicit await driver.manage().setTimeouts({implicit: 3000});
            let list = await driver.findElement(page.locators.invitedList);
            await driver.wait(
                until.elementLocated(page.locators.invitees)
            );
            //let invitees = await driver.findElements(page.locators.invitees);
            //let text = await invitees[1].getText();
            let text = await list.getText();
            assert(text.includes("Craig Dennis"));
        });

        after(async function() {
            driver.quit();
        })
    });
});