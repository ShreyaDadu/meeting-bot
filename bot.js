
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {

  let recording = null;
  let context = null;

  try {

    const meetingId = Date.now().toString();

    const meetingFolder = path.join(
      __dirname,
      'meetings',
      meetingId
    );

    fs.mkdirSync(meetingFolder, { recursive: true });

    const recordingPath = path.join(
      meetingFolder,
      'meeting.wav'
    );

    const meetingLink = process.argv[2];

    if (!meetingLink) {

      console.log('Meeting link missing');
      process.exit(1);

    }

    console.log('Opening Chrome...');

    context = await chromium.launchPersistentContext(
      'D:/BOT/meeting-bot/playwright-profile',
      {
        headless: false,
        channel: 'chrome',
        args: [
          '--use-fake-ui-for-media-stream',
          '--start-maximized'
        ]
      }
    );

    const page = await context.newPage();

    await page.goto(meetingLink, {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });


console.log('Google Meet Opened');

// =========================
// FOCUS PAGE
// =========================

await page.bringToFront();

await page.mouse.click(500, 500);

await page.waitForTimeout(2000);
// =========================
// TURN OFF MIC
// =========================

try {

  const micButton = page.locator(
    '[aria-label*="microphone"]'
  ).first();

  await micButton.waitFor({
    timeout: 10000
  });

  await micButton.click();

  console.log('Mic turned OFF');

} catch (error) {

  console.log('Could not turn off mic');

}

// =========================
// TURN OFF CAMERA
// =========================

try {

  const cameraButton = page.locator(
    '[aria-label*="camera"]'
  ).first();

  await cameraButton.waitFor({
    timeout: 10000
  });

  await cameraButton.click();

  console.log('Camera turned OFF');

} catch (error) {

  console.log('Could not turn off camera');

}

// =========================
// WAIT
// =========================

await page.waitForTimeout(3000);

// =========================
// CLICK JOIN BUTTON
// =========================

try {

  const buttons = await page.locator('button').all();

  for (const button of buttons) {

    const text = await button.innerText();

    if (
      text.includes('Ask to join') ||
      text.includes('Join now')
    ) {

      console.log('Joining meeting...');

      await button.click();

      break;

    }

  }

} catch (error) {

  console.log('Could not click join button');

}

console.log('Waiting 20 seconds before recording...');

await page.waitForTimeout(20000);

    console.log('Starting recording...');

    recording = spawn(
      'D:/BOT/ffmpeg-8.1.1-essentials_build/bin/ffmpeg.exe',
      [
        '-y',
        '-f',
        'dshow',
        '-rtbufsize',
        '100M',
        '-i',
        'audio=Stereo Mix (Realtek(R) Audio)',
        '-ac',
        '2',
        '-ar',
        '44100',
        recordingPath
      ],
      {
        stdio: ['pipe', 'pipe', 'pipe']
      }
    );

    recording.stderr.on('data', data => {
      console.log(data.toString());
    });

    console.log('Recording started');

    // =========================
    // STOP HANDLER FROM BACKEND
    // =========================

    process.stdin.resume();

    process.stdin.on('data', data => {

      const message = data.toString().trim();

      console.log('Received:', message);

      if (message === 'STOP') {

        console.log('Stopping recording...');

        if (recording) {

          recording.stdin.write('q\n');

        }

      }

    });

    // =========================
    // AFTER RECORDING CLOSES
    // =========================

    recording.on('close', () => {

      console.log('Recording completed');

      console.log('Starting transcription...');

      const python = spawn(
        'python',
        [
          'scripts/transcribe.py',
          recordingPath,
          meetingFolder
        ],
        {
          shell: true
        }
      );

      python.stdout.on('data', data => {
        console.log(data.toString());
      });

      python.stderr.on('data', data => {
        console.log(data.toString());
      });

      python.on('close', async (code) => {

        console.log('Python process finished');

        if (code !== 0) {

          console.log('Transcription failed');

          return;

        }

        const transcriptPath = path.join(
          meetingFolder,
          'transcript.txt'
        );

        if (!fs.existsSync(transcriptPath)) {

          console.log('Transcript file missing');

          return;

        }

        console.log('Transcription completed');

        console.log('Generating summary...');

        const summary = spawn(
          'node',
          [
            'scripts/free-summary.js',
            meetingFolder
          ],
          {
            shell: true
          }
        );

        summary.stdout.on('data', data => {
          console.log(data.toString());
        });

        summary.stderr.on('data', data => {
          console.log(data.toString());
        });

        summary.on('close', async () => {

console.log('Sending email...');

const email = spawn(
  'node',
  [
    'scripts/send-email.js',
    meetingFolder
  ],
  {
    shell: true
  }
);

email.stdout.on('data', data => {
  console.log(data.toString());
});

email.stderr.on('data', data => {
  console.log(data.toString());
});

email.on('close', async () => {

  console.log('Meeting processing completed');

  await context.close();

  process.exit(0);

});
        });

      });

    });

  } catch (error) {

    console.log(error);

  }

})();
