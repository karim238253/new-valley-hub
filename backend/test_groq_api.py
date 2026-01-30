import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 50)
print("GROQ API CONNECTION TEST")
print("=" * 50)

# Check API Key
api_key = os.getenv('GROQ_API_KEY')
if not api_key:
    print("❌ ERROR: GROQ_API_KEY not found in .env file")
    exit(1)

print(f"✓ API Key found: {api_key[:10]}...{api_key[-5:]}")

# Test Groq API
try:
    print("\nInitializing Groq client...")
    client = Groq(api_key=api_key)
    print("✓ Client initialized successfully")
    
    # Send a simple test prompt
    test_prompt = "Say 'Ahlan! I am Am Sa3ed from New Valley!' in one short sentence."
    print(f"\nSending test prompt to llama3-8b-8192...")
    print(f"Prompt: '{test_prompt}'")
    
    completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a friendly local guide."},
            {"role": "user", "content": test_prompt}
        ],
        model="llama3-8b-8192",
    )
    
    response_text = completion.choices[0].message.content
    
    print("\n✓ Response received:")
    print("-" * 50)
    print(response_text)
    print("-" * 50)
    print(f"\nModel used: {completion.model}")
    print(f"Tokens used: {completion.usage.total_tokens if hasattr(completion, 'usage') else 'N/A'}")
    print("\n✅ GROQ API IS WORKING PERFECTLY!")
    
except Exception as e:
    print(f"\n❌ ERROR during API call: {e}")
    print(f"Error type: {type(e).__name__}")
    exit(1)
