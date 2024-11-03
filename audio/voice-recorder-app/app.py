# app.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import tempfile
import speech_recognition as sr
from pydub import AudioSegment
import shutil

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_audio(audio: UploadFile = File(...)):
    temp_dir = tempfile.gettempdir()
    webm_path = os.path.join(temp_dir, 'temp_audio.webm')
    wav_path = os.path.join(temp_dir, 'temp_audio.wav')

    # Save the uploaded audio file
    with open(webm_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    # Convert webm to wav format
    audio_segment = AudioSegment.from_file(webm_path, format='webm')
    audio_segment.export(wav_path, format='wav')

    # Transcribe the audio file
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_path) as source:
        audio_data = recognizer.record(source)
        try:
            transcript = recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            transcript = "[Unintelligible]"
        except sr.RequestError:
            transcript = "[Could not request results from speech recognition service]"

    # Clean up temporary files
    os.remove(webm_path)
    os.remove(wav_path)

    return {"transcript": transcript}

# Run the app with uvicorn
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
