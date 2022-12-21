/* globals beforeAll, expect, describe, it, page */

beforeAll(async () => {
  await page.goto('http://localhost:8081/site/');
});

describe('the index.html page', () => {
  it('should not have any obvious accessibility violations', async () => {
    await expect(page).toPassAxeTests();
  });
});