import { test, expect } from '@playwright/test';

test.describe('Home Page Flow', () => {
  test('should display home page with architecture title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/E-commerce Platform/);
    await expect(page.getByRole('heading', { name: /Modular E-commerce Platform/i })).toBeVisible();
  });
});
