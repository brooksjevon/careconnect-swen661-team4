import { chromium, webkit } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const baseURL = 'https://careconnect-week11.vercel.app';
const results = [];

mkdirSync('e2e', { recursive: true });

async function runTest(name, engine, role, destination) {
  let browser;

  try {
    browser = await engine.launch({
      headless: true,
      timeout: 15000
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(15000);

    await page.goto(`${baseURL}/signin`, {
      waitUntil: 'domcontentloaded'
    });

    await page.getByRole('button', {
      name: 'Sign in'
    }).click();

    await page.getByRole('button', {
      name: role === 'caregiver'
        ? /Choose caregiver/i
        : /Choose care recipient/i
    }).click();

    await page.waitForURL('**/dashboard');

    if (role === 'caregiver') {
      await page.getByRole('heading', {
        name: 'Welcome, Joyce'
      }).waitFor();
    } else {
      await page.getByRole('heading', {
        name: 'Welcome, Margaret'
      }).waitFor();
    }

    if (destination === 'appointments') {
      await page.getByRole('link', {
        name: 'Appointments',
        exact: true
      }).click();

      await page.waitForURL('**/appointments');

      for (const appointment of [
        'Annual health review',
        'Blood test',
        'GP phone call',
        'Dentist check-up'
      ]) {
        await page.getByRole('heading', {
          name: appointment,
          exact: true
        }).waitFor();
      }

      const directions = await page.getByRole('link', {
        name: /Get directions/i
      }).count();

      if (directions !== 3) {
        throw new Error(`Expected 3 directions links, found ${directions}`);
      }
    }

    if (destination === 'notes') {
      await page.getByRole('link', {
        name: 'Care notes',
        exact: true
      }).click();

      await page.waitForURL('**/notes');

      await page.getByRole('heading', {
        name: 'Caregiver notes'
      }).waitFor();
    }

    await page.screenshot({
      path: `e2e/${name}.png`,
      fullPage: true
    });

    console.log(`PASS: ${name}`);
    results.push({ test: name, status: 'PASS' });

  } catch (error) {
    console.error(`FAIL: ${name}: ${error.message}`);
    results.push({
      test: name,
      status: 'FAIL',
      error: error.message
    });
  } finally {
    await browser?.close();
  }
}

await runTest(
  'chromium-recipient-dashboard',
  chromium,
  'recipient',
  'dashboard'
);

await runTest(
  'webkit-recipient-dashboard',
  webkit,
  'recipient',
  'dashboard'
);

await runTest(
  'chromium-caregiver-dashboard',
  chromium,
  'caregiver',
  'dashboard'
);

await runTest(
  'chromium-appointments',
  chromium,
  'recipient',
  'appointments'
);

await runTest(
  'chromium-care-notes',
  chromium,
  'recipient',
  'notes'
);

writeFileSync(
  'e2e/test-results.json',
  JSON.stringify({
    application: baseURL,
    results,
    firefox: 'BLOCKED: Playwright Firefox launch timeout on macOS'
  }, null, 2)
);

const passed = results.filter(r => r.status === 'PASS').length;

console.log(`\nFINAL RESULTS: ${passed}/${results.length} tests passed`);
console.log('Firefox: BLOCKED (browser launch issue)');
console.log('Evidence: e2e/test-results.json');

if (passed !== results.length) {
  process.exitCode = 1;
}
