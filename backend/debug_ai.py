import google.generativeai as genai
import os
import sys
from dotenv import load_dotenv

load_dotenv()

print(f"Python Executable: {sys.executable}")
print(f"Library Version: {genai.__version__}")

api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("API Key not found in .env")
else:
    print(f"API Key found: {api_key[:5]}...")
    genai.configure(api_key=api_key)
    
    print("\nListing available models:")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"Error listing models: {e}")
