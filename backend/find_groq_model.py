import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GROQ_API_KEY')
client = Groq(api_key=api_key)

print("Testing available Groq models...")

# Try different Llama models
test_models = [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'llama-3.1-8b-instant',
    'llama3-70b-8192',
    'mixtral-8x7b-32768',
    'gemma-7b-it'
]

for model_name in test_models:
    try:
        print(f"\nTrying: {model_name}")
        completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": "Say hello in one word."}
            ],
            model=model_name,
        )
        print(f"✅ SUCCESS with {model_name}: {completion.choices[0].message.content}")
        print(f"   Tokens: {completion.usage.total_tokens}")
        break
    except Exception as e:
        print(f"❌ Failed: {str(e)[:80]}")
