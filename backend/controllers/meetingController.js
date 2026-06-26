const db = require('../database');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const activeBots = {};

const startMeetingBot = async (req, res) => {

  try {

    const { meetingLink, email } = req.body;

    if (!meetingLink) {

      return res.status(400).json({
        success: false,
        message: 'Meeting link required'
      });

    }

    const botId = Date.now().toString();

db.run(

  `
    INSERT INTO meetings (
      id,
      email,
      meetingLink,
      status,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?)
  `,

  [
    botId,
    email,
    meetingLink,
    'running',
    new Date().toISOString()
  ]

);

    const botProcess = spawn(
      'node',
      [
        'bot.js',
        meetingLink,
        email
      ],
      {
        cwd: 'D:/BOT/meeting-bot',
        shell: true
      }
    );

    activeBots[botId] = botProcess;

    botProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    botProcess.stderr.on('data', data => {
      console.log(data.toString());
    });

    botProcess.on('close', () => {

      console.log(`Bot ${botId} closed`);
    
db.run(

  `
    UPDATE meetings
    SET status = ?
    WHERE id = ?
  `,

  [
    'completed',
    botId
  ]

);

      delete activeBots[botId];

    });

    return res.json({
      success: true,
      message: 'Bot started successfully',
      botId
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to start bot'
    });

  }

};

const stopMeetingBot = async (req, res) => {

  try {

    const { botId } = req.body;

    if (!botId || !activeBots[botId]) {

      return res.status(400).json({
        success: false,
        message: 'Bot not found'
      });

    }

    console.log(`Stopping bot ${botId}...`);

    activeBots[botId].stdin.write('STOP\n');

    return res.json({
      success: true,
      message: 'Bot stopping...'
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to stop bot'
    });

  }

};

const getMeetings = async (req, res) => {

  db.all(
    `
    SELECT *
    FROM meetings
    ORDER BY createdAt DESC
    `,
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: 'Failed to fetch meetings'
        });

      }

      return res.json(rows);

    }
  );

};

const getTranscript = async (req, res) => {

  try {

    const { id } = req.params;

    const meetingsDir = path.join(
      __dirname,
      '..',
      '..',
      'meetings'
    );
    const folders = fs.readdirSync(meetingsDir);
    
    const latestFolder =
  folders.sort().reverse()[0];

const transcriptPath = path.join(
  meetingsDir,
  latestFolder,
  'transcript.txt'
);

console.log('Meetings Dir:', meetingsDir);
console.log('Folders:', folders);
console.log('Latest Folder:', latestFolder);
console.log('Transcript Path:', transcriptPath);

    if (!fs.existsSync(transcriptPath)) {

      return res.status(404).json({
        success: false,
        message: 'Transcript not found'
      });

    }

    const transcript = fs.readFileSync(
      transcriptPath,
      'utf8'
    );

    return res.json({
      transcript
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load transcript'
    });

  }

};

const getSummary = async (req, res) => {

  try {

    const { id } = req.params;

    const summaryPath = path.join(
      __dirname,
      '..',
      '..',
      'meetings',
      id,
      'summary.txt'
    );

    if (!fs.existsSync(summaryPath)) {

      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });

    }

    const summary = fs.readFileSync(
      summaryPath,
      'utf8'
    );

    return res.json({
      summary
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load summary'
    });

  }

};

module.exports = {
  startMeetingBot,
  stopMeetingBot,
  getMeetings,
  getTranscript,
  getSummary
};