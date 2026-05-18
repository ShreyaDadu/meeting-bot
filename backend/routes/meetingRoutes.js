
const express = require('express');

const router = express.Router();

const {
  startMeetingBot,
  stopMeetingBot
} = require('../controllers/meetingController');

router.post('/start-bot', startMeetingBot);

router.post('/stop-bot', stopMeetingBot);

module.exports = router;
