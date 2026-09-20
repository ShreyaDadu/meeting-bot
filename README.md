# MeetMind AI

> An AI-powered meeting assistant that automatically joins online meetings, records audio, generates transcripts, extracts important meeting intelligence, and delivers a structured report.

## Overview

MeetMind AI is an intelligent meeting assistant designed to reduce the effort of manually taking meeting notes.

Instead of focusing on writing notes during a meeting, users can provide a Google Meet link and their email address. MeetMind automatically joins the meeting, records the meeting audio, processes the recording locally, generates a transcript using OpenAI Whisper, extracts important information such as action items, decisions and deadlines, and presents the results through a web dashboard.

The project is being enhanced for the **Qualcomm Snapdragon AI Lab Build & Present Challenge**, with a deployment architecture designed to support optimized AI inference on Snapdragon-powered PCs.

---

## Key Features

- Automatically joins Google Meet sessions
- Browser automation using Playwright
- Automatic audio recording using FFmpeg
- Local speech-to-text transcription using Whisper Base
- Structured meeting intelligence extraction
- Action item detection
- Decision detection
- Deadline detection
- Meeting summary generation
- Transcript and summary available from the dashboard
- Email delivery of meeting reports
- Multiple meeting workers can operate independently
- Responsive web dashboard
- Local processing architecture for core audio and AI processing
- Snapdragon deployment and Qualcomm AI Hub optimization readiness

---

## How MeetMind AI Works

```text
Google Meet Link
       ↓
MeetMind Meeting Bot
       ↓
Google Meet Automation
       ↓
Audio Recording
       ↓
Local Whisper Transcription
       ↓
Meeting Intelligence Engine
       ↓
Summary + Action Items
+ Decisions + Deadlines
       ↓
Dashboard + Email Report
AI Pipeline
1. Speech Recognition

MeetMind uses OpenAI Whisper Base for local speech-to-text transcription.

The audio recording is processed locally and converted into a text transcript.

2. Meeting Intelligence

The generated transcript is processed by the Meeting Intelligence Engine.

It identifies useful meeting information including:

Important discussion points
Action items
Decisions
Deadlines

The output is converted into a structured meeting report instead of leaving the user with a long raw transcript.

3. User Output

The final information is displayed through the MeetMind dashboard and can also be delivered through email.

Qualcomm Snapdragon Readiness

MeetMind AI is designed with Snapdragon-powered Windows PCs as the intended optimized deployment target.

During development, the application was tested on an x64 Intel Windows laptop, so the local development environment uses a CPU-based Whisper fallback. The Qualcomm deployment path is kept separate from the rest of the meeting pipeline so the transcription backend can be optimized for Snapdragon hardware without redesigning the complete application.

Qualcomm AI Hub Model Integration

The project uses Qualcomm AI Hub to prepare an optimized Whisper-Base speech recognition deployment for Snapdragon platforms.

The Whisper-Base model was fetched through the Qualcomm AI Hub Models workflow and optimized for the Snapdragon X2 Elite target device. Qualcomm AI Hub generated optimized ONNX/QNN artifacts for the encoder and decoder, which are maintained locally as deployment assets and excluded from the Git repository because of their size.

Deployment architecture:

Meeting Audio
     ↓
Whisper-Base
     ↓
Qualcomm AI Hub
     ↓
Optimized QNN / ONNX Artifacts
     ↓
Snapdragon X2 Elite
     ↓
Qualcomm-Accelerated Transcription
     ↓
MeetMind AI Pipeline

The application detects the host architecture and checks for the required Qualcomm model artifacts. On non-Snapdragon x64 development systems, MeetMind AI automatically uses the reliable Whisper CPU fallback.

The Snapdragon execution path is intended for compatible Windows ARM64 / Snapdragon hardware. Actual Snapdragon runtime execution and hardware benchmarking are not claimed for the current Intel development machine and remain part of hardware validation.

This architecture allows the same meeting workflow, transcript generation, meeting intelligence extraction, dashboard and email functionality to remain unchanged while the speech-recognition backend can be accelerated on supported Snapdragon devices.Qualcomm AI Hub

The project is designed around a model-deployment path compatible with the Qualcomm AI Hub workflow:

Whisper Model
     ↓
Qualcomm AI Hub
     ↓
Compile / Optimize
     ↓
Snapdragon Device
     ↓
Optimized Local Inference

Qualcomm AI Hub provides optimized AI model deployment workflows for Snapdragon platforms, including Whisper-based speech recognition models.

The intended Snapdragon deployment can therefore replace the CPU transcription backend with a Qualcomm-optimized inference backend while preserving the existing meeting automation, transcript processing and dashboard architecture.

Note: Snapdragon NPU performance benchmarks are not claimed because development and testing for this version were performed on an x64 Intel system rather than a Snapdragon PC.

System Architecture
                    ┌──────────────────┐
                    │   React Frontend │
                    │     Dashboard    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │   REST APIs      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Meeting Manager  │
                    │ Worker System    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Playwright Bot   │
                    │   Google Meet   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      FFmpeg      │
                    │  Audio Recording │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Whisper Base     │
                    │ Local Speech AI  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Meeting          │
                    │ Intelligence     │
                    │ Engine           │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌──────────────┐          ┌──────────────┐
        │  Dashboard   │          │ Email Report │
        └──────────────┘          └──────────────┘
Meeting Workflow
User opens the MeetMind dashboard.
User enters a Google Meet link.
User enters the email address for the meeting report.
MeetMind creates a meeting worker.
The automated bot opens Google Meet using Playwright.
The bot joins the meeting with microphone and camera disabled.
FFmpeg records the meeting audio.
The recording is processed locally.
Whisper Base converts the audio into a transcript.
The Meeting Intelligence Engine extracts important information.
The dashboard displays the transcript and structured meeting report.
The report can also be delivered through email.
Meeting Intelligence Output

Each processed meeting can produce four important sections.

Meeting Summary

A concise overview of the important discussion captured from the transcript.

Action Items

Tasks identified from the conversation, including responsibility-related statements when present.

Decisions

Important decisions, agreements, selections and finalized outcomes identified from the transcript.

Deadlines

Dates or time constraints mentioned in the meeting.

This transforms raw meeting audio into actionable information.

Dashboard

The MeetMind dashboard provides:

Meeting creation
Meeting status
Meeting history
Transcript viewing
Structured meeting summaries
Action item display
Decision display
Deadline display
Bot status monitoring

The interface is designed to keep the important meeting information easy to scan.

Worker Architecture

MeetMind uses a worker-based architecture for meeting execution.

Each meeting can be assigned its own worker process.

Meeting Request
      ↓
Worker Manager
      ↓
Meeting Worker
      ↓
Playwright Browser
      ↓
Google Meet

This architecture makes the application easier to extend toward concurrent meeting processing.

The system can support multiple independent meeting workers rather than relying on a single global meeting process.

Technology Stack
Frontend
React.js
HTML
CSS
JavaScript
Backend
Node.js
Express.js
REST APIs
SQLite
Automation
Playwright
Google Meet browser automation
Audio Processing
FFmpeg
Windows audio capture
AI / Machine Learning
OpenAI Whisper Base
Local speech-to-text processing
Qualcomm AI Hub deployment path for Snapdragon optimization
Email
SMTP / Gmail configuration
Project Structure
meeting-bot/
│
├── backend/
│   ├── controllers/
│   │   └── meetingController.js
│   ├── routes/
│   │   └── meetingRoutes.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── App.js
│       └── App.css
│
├── meetings/
│   └── <meeting-id>/
│       ├── meeting.wav
│       ├── transcript.txt
│       └── summary.txt
│
├── scripts/
│   ├── transcribe.py
│   ├── free-summary.js
│   └── send-email.js
│
├── bot.js
├── package.json
├── .gitignore
└── README.md
Installation
1. Clone the repository
git clone https://github.com/ShreyaDadu/meeting-bot.git
cd meeting-bot
2. Install Node.js dependencies
npm install

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Return to the project root:

cd ..
Python AI Setup

MeetMind uses Python for local Whisper transcription.

Install the required packages:

pip install openai-whisper

PyTorch is also required for Whisper.

The transcription script uses the locally installed Whisper Base model.

Running the Application
Start the backend
cd backend
node server.js
Start the frontend

Open another terminal:

cd frontend
npm start

The frontend will be available through the local React development server.

The backend provides the REST API used by the dashboard.

Environment Configuration

Email delivery uses environment variables.

Create a .env file with the required email configuration.

Example:

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

Do not commit real credentials to GitHub.

Privacy

MeetMind is designed so that the core audio recording and speech-to-text processing can run locally on the user's PC.

Email delivery is separate from local processing and uses the configured SMTP/Gmail account to deliver the generated report.

No passwords, API keys or other credentials are included in the repository.

Current Limitations
Current development and testing were performed on an x64 Intel laptop.
Snapdragon NPU performance has not been benchmarked in the current development environment.
Qualcomm AI Hub optimization is currently a deployment-readiness path rather than a completed benchmarked Snapdragon deployment.
The current Whisper pipeline uses CPU inference on the development machine.
Meeting intelligence extraction is based on structured transcript processing rather than a large generative language model.
Speaker identification and speaker diarization are not currently implemented.
Meeting recording currently has a demonstration-oriented recording duration limit.
Future Improvements
Snapdragon NPU-optimized Whisper inference
Qualcomm AI Hub compiled model deployment
Real-time transcription
Speaker diarization
Speaker identification
Improved semantic meeting summarization
More advanced action-item extraction
Automatic task assignment
Calendar integration
Meeting search
Meeting analytics
Multi-language transcription
Improved concurrent meeting scaling
Fully offline Snapdragon deployment
Qualcomm Challenge Focus

The project focuses on four areas relevant to the Snapdragon AI Lab Build & Present Challenge:

Technical Implementation
Automated Google Meet interaction
Browser automation
Audio capture
Local AI transcription
Structured transcript processing
Worker-based architecture
REST APIs
React dashboard
Application Use Case & Innovation

Meetings generate large amounts of information, but important decisions, tasks and deadlines can easily be forgotten.

MeetMind converts meeting conversations into structured, actionable information automatically.

Deployment & Accessibility

The system is designed for local processing, reducing dependence on cloud-based speech-to-text services.

The architecture also allows the transcription backend to be replaced with a Snapdragon-optimized inference implementation for deployment on supported Qualcomm platforms.

Presentation & Documentation

The project includes a complete web dashboard, structured meeting reports, documented architecture and a clear AI processing pipeline.

Project Status
Implemented
Google Meet automation
Meeting worker system
Audio recording
Local Whisper transcription
Transcript generation
Meeting summary extraction
Action item extraction
Decision extraction
Deadline extraction
Dashboard
Meeting history
Email reports
Responsive UI
Snapdragon deployment architecture preparation
In Progress
Qualcomm AI Hub optimized model deployment
Snapdragon hardware testing and benchmarking
Repository

GitHub Repository:

https://github.com/ShreyaDadu/meeting-bot

Challenge development branch:

snapdragon-ai

Author

Shreya Dadu

B.Tech Computer Science & Engineering

MeetMind AI — AI Meeting Assistant