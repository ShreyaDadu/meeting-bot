const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({

    headless: false,

    userDataDir: './bot-profile',

    args: [
      '--disable-blink-features=AutomationControlled'
    ]

  });

  const page = await browser.newPage();

  // Hide automation
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  // Open Google Meet
  await page.goto('https://meet.google.com/mwq-cwsr-kjc');

  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Turn off microphone using shortcut
  await page.keyboard.down('Control');
  await page.keyboard.press('d');
  await page.keyboard.up('Control');

  // Turn off camera using shortcut
  await page.keyboard.down('Control');
  await page.keyboard.press('e');
  await page.keyboard.up('Control');

  // Wait a bit
 await new Promise(resolve => setTimeout(resolve, 2000));

  // Click "Ask to join" or "Join now"
  const buttons = await page.$$('button');

  for (const button of buttons) {
    const text = await page.evaluate(el => el.innerText, button);

    if (
      text.includes('Join now') ||
      text.includes('Ask to join')
    ) {
      await button.click();
      console.log('Joined meeting!');
      break;
    }
  }

})();