const fs = require('fs');
const path = require('path');

const meetingFolder = process.argv[2];

if (!meetingFolder) {
  console.log('Meeting folder missing');
  process.exit(1);
}

const transcriptPath = path.join(
  meetingFolder,
  'transcript.txt'
);

if (!fs.existsSync(transcriptPath)) {
  console.log('Transcript file not found');
  process.exit(1);
}

const transcript = fs.readFileSync(
  transcriptPath,
  'utf8'
);

if (!transcript || transcript.trim() === '') {
  console.log('Transcript empty');
  process.exit(1);
}

const summary = `
MEETING SUMMARY

${transcript.slice(0, 1000)}

----------------------

Auto-generated summary complete.
`;

const summaryPath = path.join(
  meetingFolder,
  'summary.txt'
);

fs.writeFileSync(
  summaryPath,
  summary
);

console.log('Summary saved successfully');
console.log(summaryPath);