const { chromium } = require('playwright-chromium');
const { assert } = require('chai');
let browser, page;
let host = 'http://localhost:3000/01.Messenger';

function testResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
}

let messages = {
    1: {
        author: 'Peshko',
        content: 'Let\'s eat!'
    },
    2: {
        author: 'Goshko',
        content: 'What exactly?'
    }
};

describe('App: End-to-end testing', function () {
    this.timeout(4000);

    before(async () => {
        //browser = await chromium.launch();
        browser = await chromium.launch({ headless: false, slowMo: 700 });
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('Should refresh the section and check the messages', async () => {
        await page.goto(host);

        await page.route('**/jsonstore/messenger', route => {
            route.fulfill(testResponse(messages));
        });

        await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('#refresh'),
        ]);

        let location = await page.locator('#messages');
        const currentMessages = await location.evaluate((textArea) => textArea.value);
        let testMessages = Object.values(messages).map(x => `${x.author}: ${x.content}`).join('\n');

        assert.deepEqual(currentMessages, testMessages);
    });

    it('Should successfully send a message', async () => {
        await page.goto(host);

        await page.route('**/jsonstore/messenger', (route) => {
            route.fulfill(testResponse({ author: 'Kircho', content: 'Pizza of course ;)' }));
        });

        await page.fill('#author', 'Kircho');
        await page.fill('#content', 'Pizza of course ;)');

        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('#submit'),
        ]);

        const data = JSON.parse(response.request().postData());
        
        assert.equal(data.author, 'Kircho');
        assert.equal(data.content, 'Pizza of course ;)');
        assert.deepEqual(data, { 'author': 'Kircho', 'content': 'Pizza of course ;)' });
    });
});