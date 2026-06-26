// check-profile.js

/* const { chromium } = require('playwright');

(async () => {
  const context = await chromium.launchPersistentContext(
    'C:/Users/Dell/AppData/Local/Google/Chrome/User Data/Profile 5',
    {
      headless: false,
      channel: 'chrome'
    }
  );

  const page = await context.newPage();
  await page.goto("https://accounts.google.com");
})();*/

const { chromium } = require('playwright');

(async () => {

  const context =
    await chromium.launchPersistentContext(
      'C:/Users/Dell/AppData/Local/Google/Chrome/User Data',
      {
        headless: false,
        channel: 'chrome',
        args: ['--profile-directory=Profile 5']
      }
    );

  const page = await context.newPage();

  await page.goto('https://mail.google.com');

})();

