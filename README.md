# AI Meeting Bot

An AI-powered Google Meet bot built using Playwright, Node.js, React, FFmpeg, and OpenAI Whisper.

The bot can:

* Join Google Meet meetings automatically
* Disable microphone and camera before joining
* Record meeting audio
* Generate meeting transcripts locally using Whisper
* Generate AI-powered summaries
* Send meeting reports directly to user email
* Control meetings from a React frontend dashboard

---

# Features

* Google Meet automation using Playwright
* Chrome persistent login support
* Automatic Google Meet joining
* Auto-disable microphone and camera before joining
* Audio recording using FFmpeg
* Whisper-based local transcription
* AI-generated meeting summaries
* Automatic email delivery of transcript + summary
* React frontend controls
* Express backend API
* Separate meeting session folders
* Backend-controlled meeting stop flow

Automatically generated files:

* `meeting.wav`
* `transcript.txt`
* `summary.txt`

---

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

## Email Service

* Nodemailer

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

# Environment Variables

Create a `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

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

2. Enter:

   * Google Meet link
   * User email

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

The final transcript and summary are automatically emailed to the user.

---

# Current Workflow

1. User enters Google Meet link + email
2. Bot joins meeting automatically
3. Microphone and camera are disabled
4. Meeting audio recording starts
5. Recording stops from frontend
6. Whisper generates transcript
7. AI summary gets generated
8. Transcript + summary email sent to user

---

# Future Improvements

* Real-time streaming transcription
* Speaker diarization
* Cloud deployment
* Multi-meeting scalability
* Worker-based architecture
* AI-generated action items
* Meeting analytics dashboard
* Live meeting status tracking
* Multi-user meeting orchestration
* Distributed worker infrastructure
* Production deployment support

---

# Author

Shreya Dadu
