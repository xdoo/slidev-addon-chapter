import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'

const baseUrl = process.env.SLIDEV_BASE_URL ?? 'http://127.0.0.1:3045'
const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage()

  page.setDefaultTimeout(10_000)

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-chapter-toc]').waitFor()
  assert.deepEqual(
    await page.locator('[data-chapter-id]').allTextContents(),
    ['1.Fundamentals', '2.Architecture', '3.Delivery'],
  )
  assert.equal(await page.locator('[aria-current="location"]').count(), 0)

  await page.goto(`${baseUrl}/3`, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-chapter-toc]').waitFor()
  assert.equal(await page.locator('[data-chapter-id="fundamentals"]').getAttribute('data-current'), 'true')

  await page.locator('[data-chapter-id="architecture"] button').click()
  await page.waitForURL(/\/4(?:\?.*)?$/)
  assert.equal(await page.locator('[data-chapter-id="architecture"]').getAttribute('data-current'), 'true')

  await page.goto(`${baseUrl}/presenter/4`, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-chapter-toc]').first().waitFor({ state: 'attached' })
  assert.equal(await page.locator('[data-chapter-id="architecture"][data-current="true"]').count() > 0, true)
}
finally {
  await browser.close()
}

console.log('Slidev chapter integration checks passed.')
