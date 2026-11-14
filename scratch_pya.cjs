const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch({ headless: false, channel: 'chrome' }).catch(() => chromium.launch({ headless: false }));
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, locale: 'es-DO' });
  await page.goto('https://socios.pedidosya.com.do/es', { waitUntil: 'domcontentloaded', timeout: 60000 });
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(2000);
    const t = await page.title();
    if (!/moment|momento|Just|seguridad/i.test(t) && (await page.content()).length > 50000) break;
  }
  await page.waitForTimeout(4000);
  for (let y = 0; y < 15000; y += 700) { await page.mouse.wheel(0, 700); await page.waitForTimeout(300); }
  await page.screenshot({ path: out + '/pya_full.png', fullPage: true });
  const text = await page.evaluate(() => document.body.innerText);
  require('fs').writeFileSync(out + '/pya_text.txt', text);
  console.log('title:', await page.title(), 'len:', text.length);
  await browser.close();
})();
