
const db = require('../database');
const { spawn } = require('child_process');

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


module.exports = {
  startMeetingBot,
  stopMeetingBot,
  getMeetings
};