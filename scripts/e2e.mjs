import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'

const baseUrl = process.env.SLIDEV_BASE_URL ?? 'http://127.0.0.1:3045'
const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage()

  page.setDefaultTimeout(10_000)

  async function openOverview() {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
    await page.locator('[data-testid="playground-introduction"] [data-chapter-toc]').waitFor()
  }

  async function followToc(selector, heading) {
    const link = page.locator(selector)
    await link.focus()
    await link.press('Enter')
    await page.getByRole('heading', { name: heading, exact: true }).waitFor({ state: 'visible' })
  }

  await openOverview()
  assert.deepEqual(
    await page.locator('[data-testid="playground-introduction"] [data-chapter-id] > .chapter-toc__link').allTextContents(),
    ['1.Foundations', '2.Architecture', '3.Next Steps'],
  )
  assert.equal(await page.locator('[aria-current="location"]').count(), 0)

  await followToc('[data-testid="playground-introduction"] [data-chapter-id="foundations"] > .chapter-toc__link', 'Declare a chapter')
  assert.equal(await page.locator('.current-chapter-title').filter({ visible: true }).first().textContent(), 'Foundations')

  await openOverview()
  await followToc('[data-testid="playground-introduction"] [data-subchapter-id="declarations"] > .chapter-toc__sublink', 'Add an optional subchapter')
  assert.equal(await page.locator('[data-chapter-id="foundations"][data-current="true"]').count() > 0, true)
  assert.equal(await page.locator('[data-subchapter-id="declarations"][data-current="true"]').count() > 0, true)

  await openOverview()
  await followToc('[data-testid="playground-introduction"] [data-subchapter-id="components"] > .chapter-toc__sublink', 'Add chapter progress')
  assert.match(await page.locator('[data-testid="chapter-position-result"]').innerText(), /Chapter\s+1\s+of\s+3/)

  await openOverview()
  await followToc('[data-testid="playground-introduction"] [data-chapter-id="architecture"] > .chapter-toc__link', 'Keep structure in imported slides')
  assert.equal(await page.locator('.result-panel .current-chapter-title').textContent(), 'Architecture')
  const architecturePath = new URL(page.url()).pathname

  await openOverview()
  await followToc('[data-testid="playground-introduction"] [data-subchapter-id="composable"] > .chapter-toc__sublink', 'Build your own chapter UI')
  assert.match(await page.locator('.data-card').innerText(), /3 chapters found/)
  assert.match(await page.locator('.data-card').innerText(), /Current:\s*Architecture/)
  assert.match(await page.locator('.data-card').innerText(), /Subchapter:\s*Composable/)

  await page.goto(`${baseUrl}/presenter${architecturePath}`, { waitUntil: 'domcontentloaded' })
  await page.locator('[data-chapter-toc]').first().waitFor({ state: 'attached' })
  assert.equal(await page.locator('[data-chapter-id="architecture"][data-current="true"]').count() > 0, true)
}
finally {
  await browser.close()
}

console.log('Slidev playground chapter guide integration checks passed.')
