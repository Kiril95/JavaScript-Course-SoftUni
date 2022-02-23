const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');

const host = 'http://localhost:3000';
let browser, page;

describe('End-to-end tests', function () {
    this.timeout(4000);

    before(async () => {
        // We do this because during CRUD operations and API calls the tests have to be done Not in debug mode
        browser = await chromium.launch();
        //browser = await chromium.launch({ headless: false, slowMo: 700 });
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

    describe('Home', () => {
        it('Should check the nav-bar', async () => {
            await page.goto(`${host}/base`);
            let header = await page.textContent('h1 > a');
            let catalog = await page.textContent('#catalogLink');
            let log = await page.textContent('#loginLink');
            let reg = await page.textContent('#registerLink');

            assert.equal(header, 'My Cookbook');
            assert.equal(catalog, 'Catalog');
            assert.equal(log, 'Login');
            assert.equal(reg, 'Register');
        });

        it('Should check if the content is right', async () => {
            await page.goto(`${host}/base`);
            let message = await page.textContent('h2');

            assert.equal(message, 'Welcome to My Cookbook');
        });

        it('Should check if the given section has the right content', async () => {
            await page.goto(`${host}/base`);
            let recentlyAddedContent = await page.textContent('.section-title');

            assert.equal(recentlyAddedContent, 'Recently added recipes');
        });

        it('Should check if the given section is visible', async () => {
            await page.goto(`${host}/base`);
            let isVisible = await page.isVisible('.recent-recipes');

            assert.equal(isVisible, true);
        });

        it('Should check the count of the generated recipes', async () => {
            await page.goto(`${host}/base`);
            let location = await page.locator('.recent');
            const recipes = await location.evaluateAll((section) => section.map(s => s.textContent));

            assert.equal(recipes.length, 3);
        });

        it('Should check when we click on the recipe if the info shows up', async () => {
            await page.goto(`${host}/base`);
            await page.click('text=Roast Trout');
            let isVisible = await page.isVisible('#details');

            assert.equal(isVisible, true);
        });

        it('Should check if we have the correct data inside the clicked recipe', async () => {
            await page.goto(`${host}/base`);
            await page.click('text=Easy Lasagna');
            let content = await page.content();

            assert.include(content, 'Easy Lasagna');
            assert.include(content, 'Ingredients:');
            assert.include(content, '1 tbsp Ingredient 1');
            assert.include(content, '2 cups Ingredient 2');
            assert.include(content, 'Preparation:');
            assert.include(content, 'Prepare ingredients');
            assert.include(content, 'Cook until done');
        });

        it('Should check if we can access the recipe pages', async () => {
            await page.goto(`${host}/base`);
            await page.click('#catalogLink');
            let text = await page.textContent('.section-title');

            assert.equal(text, 'Page 1 of 1');
        });
    });

    describe('Authentication', () => {
        it('Should register the person correctly', async function () {
            const email = 'kircho@abv.bg';
            const password = '123';

            await page.goto(`${host}/base`);
            await page.click('#registerLink');

            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.fill('input[name="rePass"]', password);

            const [response] = await Promise.all([
                page.waitForResponse('**/register'),
                page.click('input[type="submit"]'),
            ]);
            const data = JSON.parse(response.request().postData());

            assert.deepEqual(data.email, email);
            assert.deepEqual(data.password, password);
        });

        it('Should login the user correctly', async () => {
            const email = 'kircho@abv.bg';
            const password = '123';

            await page.goto(`${host}/base`);
            await page.click('#loginLink');

            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);

            const [response] = await Promise.all([
                page.waitForResponse('**/login'),
                page.click('input[type="submit"]'),
            ]);
            const data = JSON.parse(response.request().postData());

            assert.deepEqual(data.email, email);
            assert.deepEqual(data.password, password);
        });
    });

    describe('CRUD operations', () => {
        it('Should successfully create a new recipe', async () => {
            // First we have to login the user
            const email = 'kircho@abv.bg';
            const password = '123';

            await page.goto(`${host}/base`);
            await page.click('#loginLink');

            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);

            await Promise.all([
                page.waitForResponse('**/login'),
                page.click('input[type="submit"]'),
            ]);

            // Then create a recipe
            await page.click('#createLink');

            const recipe = {
                name: 'Shkembe chorba',
                img: 'http://kulinari.bg/wp-content/uploads/2015/11/%D0%9E%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB%D0%BD%D0%B0-%D1%88%D0%BA%D0%B5%D0%BC%D0%B1%D0%B5-%D1%87%D0%BE%D1%80%D0%B1%D0%B0.jpg',
                ingredients: ['pork', 'milk', 'garlic', 'etc...'],
                steps: ['step1', 'step2'],
                _id: '0002',
                _ownerId: '0001'
            };

            await page.click('text=Create Recipe');
            await page.waitForSelector('form');

            await page.fill('[name="name"]', recipe.name);
            await page.fill('[name="img"]', recipe.img);
            await page.fill('[name="ingredients"]', recipe.ingredients.join('\n'));
            await page.fill('[name="steps"]', recipe.steps.join('\n'));

            const [response] = await Promise.all([
                page.waitForResponse('**/data/recipes'),
                page.click('[type="submit"]')
            ]);

            const data = JSON.parse(response.request().postData());
            assert.equal(data.name, recipe.name);
            assert.equal(data.img, recipe.img);
            assert.deepEqual(data.ingredients, recipe.ingredients);
            assert.deepEqual(data.steps, recipe.steps);
        });

        it('Should check if the edit and delete buttons are visible', async () => {
            // First we have to login the user
            const email = 'kircho@abv.bg';
            const password = '123';

            await page.goto(`${host}/base`);
            await page.click('#loginLink');

            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);

            await Promise.all([
                page.waitForResponse('**/login'),
                page.click('input[type="submit"]'),
            ]);

            await page.waitForSelector('article');

            await page.click('text=Shkembe chorba');
            await page.waitForSelector('article div.controls');

            const editBtn = await page.isVisible('.controls button:nth-child(1)');
            const deleteBtn = await page.isVisible('.controls button:nth-child(2)');

            assert.equal(editBtn, true);
            assert.equal(deleteBtn, true);
        });

        it('Should check if the clicked edit button has the right values', async () => {
            const email = 'kircho@abv.bg';
            const password = '123';

            await page.goto(`${host}/base`);
            await page.click('#loginLink');

            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);

            await Promise.all([
                page.waitForResponse('**/login'),
                page.click('input[type="submit"]'),
            ]);

            await page.click('text=Shkembe chorba');
            await page.click('.controls button:nth-child(1)');

            await page.waitForSelector('form');
            const nameEdit = await page.inputValue('input[name="name"]');
            const ingrediEdit = await page.inputValue('textarea[name="ingredients"]');
            const prepsEdit = await page.inputValue('textarea[name="steps"]');

            assert.equal(nameEdit, 'Shkembe chorba');
            assert.equal(ingrediEdit, 'pork\nmilk\ngarlic\netc...');
            assert.equal(prepsEdit, 'step1\nstep2');
        });

    });

    // To be continued...
});
