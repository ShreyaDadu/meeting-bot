# AI Meeting Bot

An AI-powered Google Meet bot built using Playwright, Node.js, React, FFmpeg, and OpenAI Whisper.

The bot can:

* Join Google Meet meetings
* Record meeting audio
* Generate meeting transcripts
* Create automatic summaries
* Control the bot from a React frontend

---

# Features

* Google Meet automation using Playwright
* Chrome persistent login support
* Audio recording using FFmpeg
* Whisper-based local transcription
* Automatic summary generation
* React frontend controls
* Express backend API
* Separate meeting session folders
* Auto-generated:

  * `meeting.wav`
  * `transcript.txt`
  * `summary.txt`
* Automatic Google Meet joining
* Auto-disable microphone and camera before joining
* Backend-controlled meeting stop flow
```

# Tech Stack

## Frontend

* React
* Axios

## Backend

* Node.js
* Express

## Automation

* Playwright
* Google Chrome

## Audio Processing

* FFmpeg

## AI / Transcription

* OpenAI Whisper (local)

---

# Project Structure

```bash
meeting-bot/
│
├── backend/
├── frontend/
├── scripts/
├── meetings/
├── bot.js
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ShreyaDadu/meeting-bot.git
cd meeting-bot
```

---

# Install Dependencies

## Root

```bash
npm install
```

## Frontend

```bash
cd frontend
npm install
```

## Backend

```bash
cd backend
npm install
```

---

# Install Python Dependencies

```bash
pip install openai-whisper
pip install torch
```

---

# Install FFmpeg

Download FFmpeg and ensure:

```bash
ffmpeg -version
```

works in terminal.

---

# Run Backend

```bash
cd backend
node server.js
```

---

# Run Frontend

```bash
cd frontend
npm start
```

---

# Usage

1. Open:

```bash
http://localhost:3000
```

2. Paste Google Meet link

3. Click:

```bash
Start Meeting Bot
```

4. After meeting ends:

```bash
Stop Meeting Bot
```

---

# Output

Each meeting creates a separate folder:

```bash
meetings/<meeting-id>/
```

Containing:

```bash
meeting.wav
transcript.txt
summary.txt
```

---

# Future Improvements

* Real-time streaming transcription
* Speaker diarization
* Cloud deployment
* Multi-meeting scalability
* Worker-based architecture
* AI-generated action items
* Meeting analytics dashboard
* Automatic email delivery of transcripts and summaries
* Live meeting status tracking
* Multi-user meeting orchestration
* Distributed worker infrastructure
* Production deployment support


---

# Author

Shreya Dadu
