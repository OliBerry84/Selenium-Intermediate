const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'http://scrollmagic.io/examples/advanced/infinite_scrolling.html';

class ScrollPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            boxes: By.css('.box1'),
            loader: By.id('loader'),
        }
    }

    open() {
        this.driver.get(url);
    }

    async loadContent() {
        var loader = await this.driver.findElement(this.locators.loader);
        await this.driver.executeScript("arguments[0].scrollIntoView();", loader);
        await this.driver.wait(until.elementLocated(By.css('#loader:not(.active)')));
    }
}

module.exports = ScrollPage;