# AI Meeting Bot

Automated Google Meet bot with:

- Meeting automation
- Audio recording
- Whisper transcription
- AI summaries
- Playwright browser automation

---

# Features

## Completed (Phase 1)

### Automation
- Open Google Meet automatically
- Join meetings via link
- Persistent Chrome login

### Audio
- Record meeting audio using FFmpeg
- Stereo Mix system audio capture
- WAV recording support

### AI Pipeline
- Faster-Whisper transcription
- Automatic transcript saving
- Meeting summaries

### Infrastructure
- Node.js backend
- Python transcription pipeline
- GitHub integration

---

# Tech Stack

- Node.js
- Playwright
- FFmpeg
- Faster-Whisper
- Python
- Google Meet Automation

---

# Setup

## Clone repo

```bash
git clone https://github.com/ShreyaDadu/meeting-bot.git
cd meeting-bot
```

## Install Node dependencies

```bash
npm install
```

## Install Python dependencies

```bash
pip install faster-whisper
```

---

# Run Bot

```bash
node bot.js GOOGLE_MEET_LINK
```

Example:

```bash
node bot.js https://meet.google.com/abc-defg-hij
```

---

# Folder Structure

```text
meeting-bot/
│
├── recordings/
├── transcripts/
├── scripts/
├── bot.js
├── package.json
└── README.md
```

---

# Current Status

## Phase 1 ✅
- Recording
- Transcription
- Summaries

## Upcoming
- Live transcription
- Action items
- Speaker detection
- Dashboard UI
- API backend
- Docker deployment
- Multi-user support

---

# Author

Shreya