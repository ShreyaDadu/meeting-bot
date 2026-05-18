import whisper
import sys
import os

audio_path = sys.argv[1]
meeting_folder = sys.argv[2]

print("Loading Whisper model...")

model = whisper.load_model("base")

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