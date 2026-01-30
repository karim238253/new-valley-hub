import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 50)
print("GEMINI API CONNECTION TEST")
print("=" * 50)

# Check API Key
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("❌ ERROR: GEMINI_API_KEY not found in .env file")
    exit(1)

print(f"✓ API Key found: {api_key[:10]}...{api_key[-5:]}")

# Configure genai
try:
    genai.configure(api_key=api_key)
    print("✓ API configured successfully")
except Exception as e:
    print(f"❌ Configuration error: {e}")
    exit(1)

# Test with gemini-pro model
print("\nTesting 'gemini-pro' model...")
try:
    model = genai.GenerativeModel('gemini-pro')
    print("✓ Model initialized: gemini-pro")
    
    # Send a simple test prompt
    test_prompt = "Say 'Hello from Am Sa3ed!' in one sentence."
    print(f"\nSending test prompt: '{test_prompt}'")
    
    response = model.generate_content(test_prompt)
    print("\n✓ Response received:")
    print("-" * 50)
    print(response.text)
    print("-" * 50)
    print("\n✅ API IS WORKING!")
    
except Exception as e:
    print(f"\n❌ ERROR during generation: {e}")
    print(f"Error type: {type(e).__name__}")
    
    # Try to get more details
    if hasattr(e, 'message'):
        print(f"Message: {e.message}")
    
    exit(1)
