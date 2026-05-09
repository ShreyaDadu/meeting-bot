const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launchPersistentContext(
    './playwright-profile',
    {

      headless: false,

      channel: 'chrome',

      args: [
        '--disable-blink-features=AutomationControlled'
      ]

    }
  );

  const page = await browser.newPage();

  // Open Google Meet
  await page.goto('https://meet.google.com/ght-zicb-pzp');

  // Wait for page load
  await page.waitForTimeout(6000);

  // Turn off mic
  await page.keyboard.press('Control+D');

  // Turn off camera
  await page.keyboard.press('Control+E');

  // Wait a little
  await page.waitForTimeout(2000);

  // Find join buttons
  const buttons = page.locator('button');

  const count = await buttons.count();

  for (let i = 0; i < count; i++) {

    const text = await buttons.nth(i).innerText();

    if (
      text.includes('Join now') ||
      text.includes('Ask to join')
    ) {

      await buttons.nth(i).click();

      console.log('Joined meeting!');

      break;
    }
  }

})();