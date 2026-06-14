import { expect, test } from '@playwright/test';

test('homepage has canonical booking and SEO basics', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pilgrim Soup/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://pilgrimsoupband.co.za/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Pilgrim Soup/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /pilgrimsoupband\.co\.za/);
  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(structuredData).toContain('bookings@pilgrimsoupband.co.za');
  await expect(page.getByRole('link', { name: 'bookings@pilgrimsoupband.co.za' })).toHaveAttribute('href', 'mailto:bookings@pilgrimsoupband.co.za');
});

test('primary booking journey is visible', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'BOOK THE BAND' }).first().click();
  await expect(page.locator('#bookings')).toBeInViewport();
  await expect(page.getByText('Keagan Bennewith')).toBeVisible();
});

test('promoter EPK route has booking assets and source-backed proof', async ({ page }) => {
  await page.goto('/epk.html');

  await expect(page).toHaveTitle(/Pilgrim Soup EPK/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://pilgrimsoupband.co.za/epk.html');
  await expect(page.getByRole('heading', { name: 'Pilgrim Soup', exact: true }).first()).toBeVisible();
  await expect(page.getByText('Durban rap-rock / alternative hip-hop')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tech rider' }).first()).toHaveAttribute('href', /PILGRIM%20SOUP%20tech%20rider\.pdf/);
  await expect(page.getByRole('link', { name: 'Press photos' })).toHaveAttribute('href', /drive\.google\.com/);
  await expect(page.getByText('Splashy Fen 2026', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'bookings@pilgrimsoupband.co.za' })).toHaveAttribute('href', 'mailto:bookings@pilgrimsoupband.co.za');
});

test('mobile navigation opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only behavior');

  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle Navigation' }).click();
  await expect(page.getByRole('navigation')).toHaveClass(/active/);
  await page.getByRole('link', { name: 'Bookings', exact: true }).click();
  await expect(page.getByRole('navigation')).not.toHaveClass(/active/);
  await expect(page.locator('#bookings')).toBeInViewport();
});
