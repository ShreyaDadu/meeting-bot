import whisper
import sys
import os
import platform
from transcription_provider import get_transcription_model

audio_path = sys.argv[1]
meeting_folder = sys.argv[2]

print("MeetMind AI Transcription Engine")
print("---------------------------------")

# Detect system
system = platform.system()
machine = platform.machine()

print(f"Operating System: {system}")
print(f"Architecture: {machine}")

# Snapdragon / ARM detection
is_arm = machine.lower() in ["arm64", "aarch64"]

if is_arm:
    print("Snapdragon/ARM system detected.")
    print("Qualcomm-optimized inference will be used when available.")
else:
    print("Standard x64 system detected.")
    print("Using Whisper CPU fallback.")

print("Loading Whisper model...")

# Current reliable model
from transcription_provider import get_transcription_model

model = get_transcription_model()

print("Transcribing audio...")

result = model.transcribe(audio_path)

transcript = result["text"]

transcript_path = os.path.join(
    meeting_folder,
    "transcript.txt"
)

with open(transcript_path, "w", encoding="utf-8") as f:
    f.write(transcript)

print("Transcript saved successfully")
print(transcript_path)