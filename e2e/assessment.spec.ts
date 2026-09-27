import { test, expect } from '@playwright/test'

test.describe('Level 1 Assessment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/assessment')
  })

  test('loads assessment page with first item', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('DSM-5-TR Level 1 Cross-Cutting Symptom Measure')
    await expect(page.locator('text=Little interest or pleasure in doing things')).toBeVisible()
    await expect(page.locator('text=Item 1 of 23')).toBeVisible()
  })

  test('can select a response and advance', async ({ page }) => {
    await page.locator('button:has-text("2")').first().click()
    await expect(page.locator('text=Feeling down, depressed, or hopeless')).toBeVisible()
    await expect(page.locator('text=Item 2 of 23')).toBeVisible()
  })

  test('progress bar updates', async ({ page }) => {
    const progressBar = page.locator('[role="progressbar"]')
    await expect(progressBar).toHaveAttribute('aria-valuenow', '4') // ~4% for item 1
    
    await page.locator('button:has-text("1")').first().click()
    await expect(progressBar).toHaveAttribute('aria-valuenow', '8') // ~8% for item 2
  })

  test('can navigate back', async ({ page }) => {
    await page.locator('button:has-text("2")').first().click()
    await page.locator('button:has-text("Previous")').click()
    await expect(page.locator('text=Little interest or pleasure in doing things')).toBeVisible()
    await expect(page.locator('text=Item 1 of 23')).toBeVisible()
  })

  test('completes all items and shows results', async ({ page }) => {
    for (let i = 0; i < 23; i++) {
      await page.locator('button[role="radio"]').nth(1).click() // Select "Slight" (value 1)
      if (i < 22) {
        await expect(page.locator('text=Item').first()).toContainText(`Item ${i + 2} of 23`)
      }
    }

    await expect(page.locator('text=Assessment Complete')).toBeVisible()
    await expect(page.locator('text=Level 1 Results')).toBeVisible()
  })
})

test.describe('Home Page', () => {
  test('loads and navigates to assessment', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Crosscutter')
    await page.locator('a:has-text("Start Assessment")').click()
    await expect(page).toHaveURL('/assessment')
  })
})