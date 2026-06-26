const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
  startMeetingBot,
  stopMeetingBot,
  getMeetings,
  getTranscript,
  getSummary
} = require('../controllers/meetingController');


router.get(
  '/meetings/:id/download-transcript',
  (req, res) => {

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'meetings',
      req.params.id,
      'transcript.txt'
    );

    if (!fs.existsSync(filePath)) {

      return res
        .status(404)
        .send('Transcript not found');

    }

    res.download(filePath);

  }
);
router.get(
  '/meetings/:id/download-summary',
  (req, res) => {

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'meetings',
      req.params.id,
      'summary.txt'
    );

    if (!fs.existsSync(filePath)) {

      return res
        .status(404)
        .send('Summary not found');

    }

    res.download(filePath);

  }
);
router.get(
  '/meetings/:id/transcript',
  getTranscript
);
router.get(
  '/meetings/:id/summary',
  getSummary
);
router.post('/start-bot', startMeetingBot);

router.post('/stop-bot', stopMeetingBot);
router.get('/meetings', getMeetings);

module.exports = router;