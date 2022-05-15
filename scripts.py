# from pymysql import NULL
import speech_recognition as sr
import goslate
import sys
from googletrans import Translator
from gtts import gTTS
from io import BytesIO

def translated_text(file_name):
    # print(file_name)
    r = sr.Recognizer()
    ger = sr.AudioFile(file_name)
    with ger as source:
        audio = r.record(source)
    # german_text = r.recognize_google(audio, language="de-DE")
    german_text = r.recognize_google(audio, language="hi-IN")
    print(german_text)
    translator=Translator()
    english_text=translator.translate(german_text, src='hi', dest='en')
    # print(type())
    tts = gTTS(english_text.text)
    print(tts)
    tts.save('output.wav')
    boi = BytesIO()
    tts.write_to_fp(boi)
    print(boi)
    # english_text = "You should rather ask how many have understood the secret"
    return german_text,english_text.text,boi


# print("hello")
# print(sys.argv[1])
# print(translated_text(sys.argv[1]))