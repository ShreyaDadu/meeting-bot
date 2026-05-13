from faster_whisper import WhisperModel
import sys
import os

# UTF-8 force
sys.stdout.reconfigure(encoding='utf-8')

model = WhisperModel("base", device="cpu", compute_type="int8")

segments, info = model.transcribe("recordings/meeting.wav")

print("\nTranscription:\n")

# create transcripts folder if not exists
os.makedirs("transcripts", exist_ok=True)

output_path = os.path.join("transcripts", "transcript.txt")

with open(output_path, "w", encoding="utf-8") as f:

    for segment in segments:
        print(segment.text)

        f.write(segment.text + "\n")

print("\nTranscript saved successfully")