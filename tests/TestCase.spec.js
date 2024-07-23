const { test, expect } = require('@playwright/test');
      const urlToTest = require('./urlToTest.js');
      test.beforeEach(async ({ page }) => {
        const fetchedUrl = urlToTest;
        await page.goto(fetchedUrl);
      });
      
      
test.describe('Website Style Verification', () => {
  test('Verify style tag, h3 tag, and form structure', async ({ page }) => {
    // Navigate to the website
    // await page.goto('http://127.0.0.1:5500/index.html');

    // Check if style tag exists
    const styleTag = await page.$('style');
    expect(styleTag).not.toBeNull();

    // Get the content of the style tag
    const styleContent = await page.textContent('style');
    expect(styleContent).toContain('#score');
    expect(styleContent).toContain('.profile');

    const submitButton = await page.$('form button[type="submit"], form input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });
});