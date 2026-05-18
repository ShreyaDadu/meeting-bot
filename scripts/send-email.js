
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const meetingFolder = process.argv[2];

if (!meetingFolder) {

  console.log('Meeting folder missing');
  process.exit(1);

}

const transcriptPath = path.join(
  meetingFolder,
  'transcript.txt'
);

const summaryPath = path.join(
  meetingFolder,
  'summary.txt'
);

const transcript = fs.existsSync(transcriptPath)
  ? fs.readFileSync(transcriptPath, 'utf8')
  : 'Transcript missing';

const summary = fs.existsSync(summaryPath)
  ? fs.readFileSync(summaryPath, 'utf8')
  : 'Summary missing';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail() {

  try {

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: 'AI Meeting Report',

      text:
`
MEETING SUMMARY

${summary}

========================

TRANSCRIPT

${transcript}
`

    });

    console.log('Email sent successfully');

  } catch (error) {

    console.log(error);

  }

}

sendEmail();