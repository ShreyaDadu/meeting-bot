# AI Meeting Bot

An AI-powered Google Meet assistant built using Playwright, Node.js, React, FFmpeg, SQLite, Nodemailer, and OpenAI Whisper.

The bot can automatically join Google Meet meetings, disable microphone and camera, record meeting audio, generate transcripts and summaries, store meeting history, and email reports directly to users.

---

# Features

## Meeting Automation

* Join Google Meet meetings automatically
* Chrome persistent login support
* Auto-disable microphone before joining
* Auto-disable camera before joining
* Auto-click Join Now

## Audio Processing

* Record meeting audio using FFmpeg
* Separate recording folder for every meeting
* WAV audio generation

## AI Processing

* Local transcription using OpenAI Whisper
* Automatic transcript generation
* Automatic summary generation

## Email Delivery

* Email transcript to user
* Email summary to user
* Automatic report delivery after meeting completion

## Backend

* Express REST API
* SQLite database integration
* Meeting status tracking
* Meeting history storage
* Multiple concurrent bot support

## Frontend

* React dashboard
* Start Meeting Bot
* Stop Meeting Bot
* User email input
* Google Meet link input

---

# Generated Files

For every meeting:

meeting.wav

transcript.txt

summary.txt

---

# Tech Stack

## Frontend

* React
* Axios

## Backend

* Node.js
* Express
* SQLite3

## Automation

* Playwright
* Google Chrome

## Audio

* FFmpeg

## AI

* OpenAI Whisper

## Email

* Nodemailer

---

# Current Workflow

1. User enters Google Meet link
2. User enters email address
3. Bot joins meeting automatically
4. Microphone and camera are disabled
5. Meeting audio recording starts
6. User stops meeting from dashboard
7. FFmpeg recording ends
8. Whisper generates transcript
9. Summary is generated
10. Transcript and summary are emailed to user
11. Meeting data is stored in SQLite database

---

# Current MVP Status

Implemented:

* Google Meet automation
* Audio recording
* Local transcription
* Summary generation
* Email delivery
* SQLite database
* Meeting status tracking
* Multiple bot instances
* REST API

In Progress:

* Meeting History Dashboard
* Transcript Viewer
* Summary Viewer

Planned:

* Real-time transcription
* Speaker diarization
* Action item extraction
* Meeting analytics
* Cloud deployment
* Worker-based architecture
* Multi-user orchestration
* Distributed bot workers

---

# Project Structure

meeting-bot/

├── backend/

├── frontend/

├── scripts/

├── meetings/

├── bot.js

├── meetings.db

├── package.json

└── README.md

---

# Author

Shreya Dadu