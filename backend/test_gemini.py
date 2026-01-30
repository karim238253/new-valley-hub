import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

print("=" * 50)
print("GOOGLE GEMINI API TEST")
print("=" * 50)

api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("❌ API Key not found")
    exit(1)

print(f"✓ API Key found: {api_key[:10]}...{api_key[-5:]}")

genai.configure(api_key=api_key)

# Test gemini-1.5-flash
try:
    print("\nTesting 'gemini-1.5-flash' model...")
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say 'Ahlan from Murshid!' in one sentence.")
    print(f"✅ SUCCESS: {response.text}")
except Exception as e:
    print(f"❌ FAILED: {str(e)[:150]}")
    
    # Try alternative
    print("\nTrying 'gemini-flash-latest' as alternative...")
    try:
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content("Say hello in one word.")
        print(f"✅ Alternative works: {response.text}")
    except Exception as e2:
        print(f"❌ Alternative also failed: {str(e2)[:100]}")
