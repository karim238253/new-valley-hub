import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

print("Testing available models...")

# Try the models we found in the earlier debug
test_models = [
    'gemini-2.0-flash-exp',
    'models/gemini-2.0-flash',
    'gemini-flash-latest',
    'models/gemini-flash-latest',
    'gemini-1.5-pro',
    'models/gemini-1.5-pro'
]

for model_name in test_models:
    try:
        print(f"\nTrying: {model_name}")
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Say hello in one word.")
        print(f"✅ SUCCESS with {model_name}: {response.text}")
        break
    except Exception as e:
        print(f"❌ Failed: {str(e)[:100]}")
