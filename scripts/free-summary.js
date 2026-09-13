const fs = require('fs');
const path = require('path');

const meetingFolder = process.argv[2];

if (!meetingFolder) {
  console.log('Meeting folder missing');
  process.exit(1);
}

const transcriptPath = path.join(meetingFolder, 'transcript.txt');

if (!fs.existsSync(transcriptPath)) {
  console.log('Transcript file not found');
  process.exit(1);
}

const transcript = fs.readFileSync(transcriptPath, 'utf8').trim();

if (!transcript) {
  console.log('Transcript empty');
  process.exit(1);
}


// ---------- TEXT CLEANING ----------

const cleanText = transcript
  .replace(/\s+/g, ' ')
  .trim();


// ---------- SENTENCE EXTRACTION ----------

const sentences = cleanText
  .split(/(?<=[.!?])\s+/)
  .map(s => s.trim())
  .filter(Boolean);


// ---------- ACTION ITEM DETECTION ----------

const actionPatterns = [
  /\bwill\s+(prepare|complete|finish|test|review|send|submit|create|update|design|develop|deploy|check|fix|present|handle|work on)\b/i,
  /\bneeds?\s+to\s+(prepare|complete|finish|test|review|send|submit|create|update|design|develop|deploy|check|fix|present|handle|work on)\b/i,
  /\bmust\s+(prepare|complete|finish|test|review|send|submit|create|update|design|develop|deploy|check|fix|present|handle|work on)\b/i,
  /\bassigned\s+to\b/i,
  /\bresponsible\s+for\b/i,
  /\btask\s+is\s+to\b/i,
  /\baction\s+item\b/i,
  /\bplease\s+(prepare|complete|finish|test|review|send|submit|create|update|design|develop|deploy|check|fix|present|handle)\b/i
];

const actionItems = sentences.filter(sentence =>
  actionPatterns.some(pattern => pattern.test(sentence))
);


// ---------- DECISION DETECTION ----------

const decisionPatterns = [
  /\bdecided\s+to\b/i,
  /\bdecided\s+on\b/i,
  /\bdecision\b/i,
  /\bagreed\s+to\b/i,
  /\bagreed\s+on\b/i,
  /\bwe\s+will\s+use\b/i,
  /\bwill\s+use\b/i,
  /\bselected\b/i,
  /\bchosen\b/i,
  /\bapproved\b/i,
  /\bfinalized\b/i,
  /\bwe\s+chose\b/i,
  /\bteam\s+decided\b/i,
  /\bwe\s+agreed\b/i
];

const decisions = sentences.filter(sentence =>
  decisionPatterns.some(pattern => pattern.test(sentence))
);


// ---------- DEADLINE DETECTION ----------

const deadlinePattern =
  /\b(by|before|until|on)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow|next week|next month|\d{1,2}(?:st|nd|rd|th)?\s+\w+)/gi;

const deadlines = [];

sentences.forEach(sentence => {
  const matches = sentence.match(deadlinePattern);

  if (matches) {
    matches.forEach(match => {
      deadlines.push({
        deadline: match.trim(),
        sentence: sentence
      });
    });
  }
});


// ---------- REMOVE DUPLICATES ----------

function unique(items) {
  return [...new Set(items)];
}

const uniqueActions = unique(actionItems);
const uniqueDecisions = unique(decisions);


// ---------- CLEAN DISPLAY TEXT ----------

function cleanActionText(text) {
  return text
    .replace(/^team meeting:\s*/i, '')
    .trim();
}

function cleanDeadlineText(text) {
  return text
    .replace(/^team meeting:\s*/i, '')
    .trim();
}

const displayActions = uniqueActions.map(cleanActionText);

const displayDeadlines = deadlines.map(item => ({
  deadline: item.deadline,
  sentence: cleanDeadlineText(item.sentence)
}));


// ---------- SUMMARY ----------

const informationSentences = sentences.filter(sentence => {
  const isAction = actionPatterns.some(pattern => pattern.test(sentence));
  const isDecision = decisionPatterns.some(pattern => pattern.test(sentence));

  return !isAction && !isDecision;
});

let summarySentences = informationSentences.slice(0, 4);

if (summarySentences.length === 0) {
  summarySentences = sentences.slice(0, 3);
}

const summary =
  summarySentences.length > 0
    ? summarySentences.join(' ')
    : 'No meeting summary could be extracted.';


// ---------- FORMAT OUTPUT ----------

let output = '';

output += 'MEETING SUMMARY\n\n';
output += summary + '\n\n';

output += 'ACTION ITEMS\n\n';

if (displayActions.length === 0) {
  output += '- None identified\n';
} else {
  displayActions.forEach(item => {
    output += `- ${item}\n`;
  });
}

output += '\nDECISIONS\n\n';

if (uniqueDecisions.length === 0) {
  output += '- None identified\n';
} else {
  uniqueDecisions.forEach(item => {
    output += `- ${item}\n`;
  });
}

output += '\nDEADLINES\n\n';

if (displayDeadlines.length === 0) {
  output += '- None identified\n';
} else {
  displayDeadlines.forEach(item => {
    output += `- ${item.deadline}\n`;
  });
}

output += '\n----------------------\n';
output += 'MeetMind Meeting Intelligence generated successfully.\n';


// ---------- SAVE ----------

const summaryPath = path.join(
  meetingFolder,
  'summary.txt'
);

fs.writeFileSync(
  summaryPath,
  output,
  'utf8'
);

console.log('Meeting intelligence generated successfully.');
console.log(summaryPath);