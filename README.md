# AI Meeting Bot

An AI-powered Google Meet assistant built using Playwright, Node.js, React, FFmpeg, SQLite, Nodemailer, and OpenAI Whisper.

The bot can automatically join Google Meet meetings, record audio, generate AI-powered transcripts and summaries, email meeting reports, and is being extended with a worker-based architecture for scalable concurrent meeting automation.
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
* Worker Manager for scalable meeting execution
* Worker allocation and release

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
# Scalability Architecture

The project is evolving from a single meeting bot into a scalable worker-based architecture.

Current implementation includes:

* Worker Manager
* Worker allocation
* Worker release after meeting completion

Upcoming scalability features:

* Meeting Queue
* Meeting Orchestrator
* Multiple isolated browser workers
* Distributed execution across machines
* Horizontal scaling for concurrent meetings

# Current Workflow

1. User enters Google Meet link
2. User enters email address
3. Worker Manager assigns an available worker
4. Bot joins meeting automatically
5. Microphone and camera are disabled
6. Meeting audio recording starts
7. User stops meeting from dashboard
8. FFmpeg recording ends
9. Whisper generates transcript
10. Summary is generated
11. Transcript and summary are emailed to user
12. Meeting data is stored in SQLite database
13. Worker is released for future meetings

---

# Current MVP Status

Implemented:

* Google Meet automation
* Audio recording
* Local transcription
* AI summary generation
* Email delivery
* SQLite database
* Meeting status tracking
* Transcript & Summary download
* REST API
* Worker Manager
* Worker allocation & release

In Progress:

* Meeting History Dashboard
* Transcript Viewer
* Summary Viewer

Planned:

* Meeting Queue
* Meeting Orchestrator
* Real-time transcription
* Speaker diarization
* Action item extraction
* Meeting analytics
* Distributed bot workers
* Cloud deployment
* Horizontal scaling

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