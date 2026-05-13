require('dotenv').config();

const fs = require('fs');
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function summarizeMeeting() {

  const transcript = fs.readFileSync(
    'transcripts/transcript.txt',
    'utf8'
  );

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',

    messages: [
      {
        role: 'system',
        content: `
You are an AI meeting assistant.

Generate:
1. Meeting Summary
2. Action Items
3. Important Decisions
4. Next Steps
`
      },
      {
        role: 'user',
        content: transcript
      }
    ]
  });

  const summary = response.choices[0].message.content;

  console.log('\n===== AI SUMMARY =====\n');

  console.log(summary);

  fs.writeFileSync(
    'transcripts/summary.txt',
    summary
  );

  console.log('\nSummary saved!');
}

summarizeMeeting();