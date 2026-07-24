# AI Meeting Bot

An AI-powered Google Meet assistant built using Playwright, Node.js, React, FFmpeg, SQLite, Nodemailer, and OpenAI Whisper.

The bot can automatically join Google Meet meetings, record audio, generate AI-powered transcripts and summaries, email meeting reports, and includes a worker-based architecture that supports concurrent meeting automation and serves as the foundation for future horizontal scaling.
---

# Features

## Meeting Automation

* Join Google Meet meetings automatically
* Persistent Chrome profile support
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
* Worker manager for concurrent meeting bots
* Meeting queue management
* Worker allocation and release
* Individual bot lifecycle management
* Isolated worker browser profiles

## Frontend

* React dashboard
* Start multiple meeting bots
* Stop individual meeting bots
* Meeting history dashboard
* Transcript viewer
* Summary viewer
* Download transcript
* Download summary
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
* Meeting queue
* Worker allocation
* Worker release after meeting completion
* Support for multiple concurrent meeting bots

Upcoming scalability features:

* Meeting Orchestrator
* Dynamic browser worker pool
* Multiple isolated browser workers
* Distributed execution across machines
* Horizontal scaling

# Current Workflow

1. User enters Google Meet link
2. User enters email address
3. Worker Manager assigns an available worker and browser profile
4. Bot joins meeting automatically
5. Microphone and camera are disabled
6. Meeting audio recording starts
7. User stops an individual meeting bot from the dashboard
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
* Local transcription (OpenAI Whisper)
* Summary generation
* Email delivery
* SQLite database
* Meeting status tracking
* Meeting history dashboard
* Transcript viewer
* Summary viewer
* Transcript & summary download
* Transcript & summary storage
* Worker manager
* Meeting queue
* Concurrent bot architecture
* REST API


Planned:

* Real-time transcription
* Speaker diarization
* Action item extraction
* Meeting analytics
* Dynamic browser worker pool
* Distributed worker nodes
* Docker deployment
* Kubernetes orchestration
* Cloud deployment

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