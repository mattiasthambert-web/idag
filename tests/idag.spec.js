// Tester för Idag – tre saker.
// Varje test öppnar index.html i en riktig webbläsare och klickar runt som en människa.
// Listan följer checklistan "Testa" i AGENTS.md.

const { test, expect } = require('@playwright/test');
const path = require('path');

const SIDAN = 'file://' + path.resolve(__dirname, '..', 'index.html');

test.beforeEach(async ({ page }) => {
  await page.goto(SIDAN);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('1. Sidan visar datum och tre tomma rader', async ({ page }) => {
  await expect(page.locator('h1')).toHaveText('Idag');
  await expect(page.locator('#datum')).not.toHaveText('');
  const falt = page.locator('.falt');
  await expect(falt).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    await expect(falt.nth(i)).toHaveValue('');
  }
});

test('2. Texten finns kvar efter omladdning', async ({ page }) => {
  await page.fill('#sak-1', 'Ringa läkaren');
  await page.fill('#sak-2', 'Spela gitarr');
  await page.fill('#sak-3', 'Gå en promenad');
  await page.reload();
  await expect(page.locator('#sak-1')).toHaveValue('Ringa läkaren');
  await expect(page.locator('#sak-2')).toHaveValue('Spela gitarr');
  await expect(page.locator('#sak-3')).toHaveValue('Gå en promenad');
});

test('3. Klar-knappen bockar av och kan ångras', async ({ page }) => {
  const rad = page.locator('.rad').first();
  const knapp = rad.locator('.knapp-klar');

  await knapp.click();
  await expect(rad).toHaveClass(/klar/);
  await expect(knapp).toHaveAttribute('aria-pressed', 'true');
  await expect(knapp.locator('.knapp-text')).toHaveText('Klart');

  await knapp.click();
  await expect(rad).not.toHaveClass(/klar/);
  await expect(knapp).toHaveAttribute('aria-pressed', 'false');
  await expect(knapp.locator('.knapp-text')).toHaveText('Klar');
});

test('3b. Avbockningen finns kvar efter omladdning', async ({ page }) => {
  await page.fill('#sak-2', 'Vila');
  await page.locator('.knapp-klar').nth(1).click();
  await page.reload();
  await expect(page.locator('.rad').nth(1)).toHaveClass(/klar/);
});

test('4. När alla tre är klara visas beröm', async ({ page }) => {
  await page.fill('#sak-1', 'Ett');
  await page.fill('#sak-2', 'Två');
  await page.fill('#sak-3', 'Tre');
  const knappar = page.locator('.knapp-klar');
  await knappar.nth(0).click();
  await knappar.nth(1).click();
  await expect(page.locator('#status')).toHaveText('');
  await knappar.nth(2).click();
  await expect(page.locator('#status')).toHaveText('Alla tre är klara. Bra jobbat!');
});

test('5. Ny dag följt av Avbryt rensar ingenting', async ({ page }) => {
  await page.fill('#sak-1', 'Behåll mig');
  await page.click('#nydag');
  await expect(page.locator('#bekrafta')).toBeVisible();
  await page.click('#avbryt');
  await expect(page.locator('#bekrafta')).toBeHidden();
  await expect(page.locator('#nydag')).toBeVisible();
  await expect(page.locator('#sak-1')).toHaveValue('Behåll mig');
});

test('6. Ny dag följt av Ja, rensa tömmer allt', async ({ page }) => {
  await page.fill('#sak-1', 'Ett');
  await page.fill('#sak-2', 'Två');
  await page.locator('.knapp-klar').first().click();
  await page.click('#nydag');
  await page.click('#ja-rensa');

  await expect(page.locator('#status')).toHaveText('Rensat. Ny dag!');
  await expect(page.locator('#bekrafta')).toBeHidden();
  for (let i = 0; i < 3; i++) {
    await expect(page.locator('.falt').nth(i)).toHaveValue('');
    await expect(page.locator('.rad').nth(i)).not.toHaveClass(/klar/);
  }
  await page.reload();
  await expect(page.locator('#sak-1')).toHaveValue('');
});

test('7. Inga fel i webbläsarens Console', async ({ page }) => {
  const fel = [];
  page.on('pageerror', (e) => fel.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') fel.push(m.text()); });

  await page.goto(SIDAN);
  await page.fill('#sak-1', 'Test');
  await page.locator('.knapp-klar').first().click();
  await page.click('#nydag');
  await page.click('#ja-rensa');

  expect(fel).toEqual([]);
});

test('8. Enter hoppar till nästa fält', async ({ page }) => {
  await page.locator('#sak-1').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#sak-2')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#sak-3')).toBeFocused();
});
