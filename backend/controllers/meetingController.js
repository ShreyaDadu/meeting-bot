const { spawn } = require('child_process');

let botProcess = null;

const startMeetingBot = async (req, res) => {

  try {

    const { meetLink } = req.body;

    if (!meetLink) {

      return res.status(400).json({
        success: false,
        message: 'Meeting link required'
      });

    }

    if (botProcess) {

      return res.status(400).json({
        success: false,
        message: 'Bot already running'
      });

    }

    botProcess = spawn(
      'node',
      ['bot.js', meetLink],
      {
        cwd: 'D:/BOT/meeting-bot',
        shell: true
      }
    );

    botProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    botProcess.stderr.on('data', data => {
      console.log(data.toString());
    });

    botProcess.on('close', () => {

      console.log('Bot process closed');

      botProcess = null;

    });

    return res.json({
      success: true,
      message: 'Bot started successfully'
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

    if (!botProcess) {

      return res.status(400).json({
        success: false,
        message: 'No active bot'
      });

    }

    console.log('Sending STOP signal...');

    botProcess.stdin.write('STOP\n');

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

module.exports = {
  startMeetingBot,
  stopMeetingBot
};