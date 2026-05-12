# Meeting Bot

An automated meeting bot built with Node.js and Python that can join meetings, record audio, and generate transcriptions.

## Features

* Automated meeting joining
* Audio recording support
* Meeting transcription using Python scripts
* Playwright browser automation
* Organized recordings and transcript storage
* Easy setup and execution

---

# Project Structure

```bash
meeting-bot/
│
├── bot.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── scripts/
│   └── transcribe.py
│
├── recordings/
├── transcripts/
├── playwright-profile/
├── bot-profile/
├── user_data/
└── node_modules/
```

---

# Prerequisites

Make sure the following are installed:

* Node.js
* Python 3
* npm
* pip

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/ShreyaDadu/meeting-bot.git
cd meeting-bot
```

## 2. Install Node.js dependencies

```bash
npm install
```

## 3. Create and activate Python virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 4. Install Python dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Bot

Start the bot using:

```bash
node bot.js
```

---

# Transcription

Run the transcription script:

```bash
python scripts/transcribe.py
```

---

# Output

* Recordings are stored in the `recordings/` folder
* Generated transcripts are stored in the `transcripts/` folder

---

# Notes

* Large folders such as `node_modules/`, `venv/`, recordings, and browser profiles are ignored using `.gitignore`
* Make sure required meeting credentials/configurations are properly set before running the bot

---

# Tech Stack

* Node.js
* Playwright
* Python
* Faster-Whisper

---

# Repository

GitHub Repository:

[https://github.com/ShreyaDadu/meeting-bot](https://github.com/ShreyaDadu/meeting-bot)
