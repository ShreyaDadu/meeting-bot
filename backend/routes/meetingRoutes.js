
const express = require('express');

const router = express.Router();

const {
  startMeetingBot,
  stopMeetingBot,
  getMeetings
} = require('../controllers/meetingController');

router.post('/start-bot', startMeetingBot);

router.post('/stop-bot', stopMeetingBot);
router.get('/meetings', getMeetings);

module.exports = router;
