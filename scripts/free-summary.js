const fs = require('fs');

const transcript = fs.readFileSync(
  'transcripts/transcript.txt',
  'utf8'
);

const lines = transcript
  .split('.')
  .filter(line => line.trim().length > 20);

const summary = lines.slice(0, 5);

console.log('\n===== MEETING SUMMARY =====\n');

summary.forEach(line => {
  console.log('- ' + line.trim());
});