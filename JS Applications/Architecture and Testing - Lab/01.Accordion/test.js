const { chromium } = require('playwright-chromium');
const { assert } = require('chai');
let browser, page;

describe('App: End-to-end testing', function () {
    this.timeout(4000);
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('Should check if we load the right sections', async () => {
        await page.goto('http://localhost:3000');
        //let content = await page.content();
        let location = await page.locator('.accordion .head > span'); // Locate the info you want to test
        const titles = await location.evaluateAll((section) => section.map(s => s.textContent));

        assert.include(titles, 'Scalable Vector Graphics');
        assert.include(titles, 'Open standard');
        assert.include(titles, 'Unix');
        assert.include(titles, 'ALGOL');
    });

    it('Should check if we reveal the hidden info', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        const visible = await page.isVisible('.extra'); // Hidden info

        assert.equal(visible, true);
    });

    it('Should check when we click "More", if it is changed to "Less"', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        let buttonText = await page.textContent('.accordion .head .button');

        assert.equal(buttonText, 'Less');
    });

    it('Should have the right text content', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        let content = await page.textContent('.accordion .extra > p');
        let expectedText = `Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.`;

        assert.equal(content, expectedText);
    });

    it('Should click twice on the button and see if it is back again to "More"', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        await page.click('text=Less');
        let buttonText = await page.textContent('.accordion .head .button');

        assert.equal(buttonText, 'More');
    });

    it('Should click twice on the button and see if the content is hidden again', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        await page.click('text=Less');
        let visible = await page.isVisible('.extra');

        assert.equal(visible, false);
    });
});