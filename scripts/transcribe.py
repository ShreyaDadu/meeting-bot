from faster_whisper import WhisperModel
import sys

# UTF-8 force
sys.stdout.reconfigure(encoding='utf-8')

model = WhisperModel("base", device="cpu", compute_type="int8")

segments, info = model.transcribe("recordings/meeting.wav")

print("\nTranscription:\n")

for segment in segments:
    print(segment.text)