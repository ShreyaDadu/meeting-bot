const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

(async () => {

  const recordingPath = path.join(__dirname, 'recordings', 'meeting.wav');

  // =========================
  // OPEN CHROME
  // =========================

  const context = await chromium.launchPersistentContext(
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

  // =========================
  // OPEN GOOGLE MEET
  // =========================

  await page.goto('https://meet.google.com', {
    waitUntil: 'domcontentloaded',
    timeout: 0
  });

  console.log('Google Meet Opened');

  console.log('Join meeting manually...');
  console.log('Recording starts in 15 seconds');

  await new Promise(resolve => setTimeout(resolve, 15000));

  // =========================
  // START RECORDING
  // =========================

  console.log('Starting recording...');

  const ffmpeg = spawn(
    'D:/BOT/ffmpeg-8.1.1-essentials_build/bin/ffmpeg.exe',
    [
        '-y',
        '-f',
        'dshow',
        '-rtbufsize',
        '100M',
        '-i',
        'audio="CABLE Output (VB-Audio Virtual Cable)"',
        '-ac',
        '2',
        '-ar',
        '44100',
        '-t',
        '30',
        recordingPath
      ],
    {
      shell: true
    }
  );

  ffmpeg.stderr.on('data', data => {
    console.log(data.toString());
  });

  await new Promise(resolve => setTimeout(resolve, 35000));

  console.log('Recording completed');

  // =========================
  // START TRANSCRIPTION
  // =========================

  console.log('Starting transcription...');

  const python = spawn(
    'python',
    ['scripts/transcribe.py'],
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

})();