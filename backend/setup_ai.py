import os
import sys
import subprocess

def setup_env():
    env_path = ".env"
    key_line = "GEMINI_API_KEY=AIzaSyCXt9dRluXpaZjvyCnM-jzF3nLXJZpm7x0"
    
    print(f"Checking {env_path}...")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding='utf-8') as f:
            content = f.read()
        
        if "GEMINI_API_KEY" not in content:
            print("Appending API Key to .env...")
            with open(env_path, "a", encoding='utf-8') as f_append:
                f_append.write(f"\n{key_line}\n")
        else:
            print("API Key already exists in .env.")
    else:
        print("Creating .env file...")
        with open(env_path, "w", encoding='utf-8') as f:
            f.write(f"{key_line}\n")

def install_dependencies():
    print("Installing dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-generativeai", "python-dotenv"])

def create_chat_view():
    # Creating it in the tourism app folder to allow relative imports works if imported from there
    # But user might want it standalone. We'll place it in tourism/chat_view.py
    file_path = os.path.join("tourism", "chat_view.py")
    print(f"Creating {file_path}...")
    
    code = """import os
import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile
from hospitality.models import Hotel
from marketplace.models import Product

class ChatAPIView(APIView):
    def post(self, request):
        user_message = request.data.get('message', '')
        if not user_message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Configuration
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            return Response({'error': 'Server configuration error: API key missing'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')
        except Exception as e:
             return Response({'error': f'GenAI Configuration Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # 2. Context Search (The "Brain")
        context_parts = []
        
        # Search Attractions
        attractions = Attraction.objects.filter(
            Q(name__icontains=user_message) | Q(description__icontains=user_message)
        )[:3]
        for item in attractions:
            context_parts.append(f"Attraction: {item.name}, {item.description[:200]}...")

        # Search Hotels
        hotels = Hotel.objects.filter(
            Q(name__icontains=user_message) | Q(description__icontains=user_message)
        )[:3]
        for item in hotels:
            context_parts.append(f"Hotel: {item.name}, {item.description[:200]}...")

        # Search Products
        products = Product.objects.filter(
            Q(name__icontains=user_message) | Q(description__icontains=user_message)
        )[:3]
        for item in products:
            context_parts.append(f"Product: {item.name}, Price: {item.price}, {item.description[:200]}...")

        context_str = "\\n".join(context_parts)

        # 3. The Prompt
        system_prompt = f\"\"\"
        System: You are 'Am Sa3ed (عم سعيد)', a friendly, wise, and humorous local guide for New Valley (Al Wadi Al Jadid), Egypt. 
        You speak in a mix of friendly English and Egyptian Arabic words (like 'Ya Habibi', 'Ahlan', 'Mashallah').
        
        Context from Database:
        {context_str}
        
        User Question: {user_message}
        
        Instruction: 
        Answer the user's question based on the provided Context. 
        If the answer is found in the context, give details.
        If the answer is NOT in the context, use your general knowledge about New Valley but mention that you are not 100% sure about specific current prices or availability if not in the database.
        Keep the tone warm, welcoming, and helpful like a real local uncle.
        \"\"\"

        try:
            response = model.generate_content(system_prompt)
            return Response({'response': response.text})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
"""
    # Ensure directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "w", encoding='utf-8') as f:
        f.write(code)

if __name__ == "__main__":
    try:
        setup_env()
        install_dependencies()
        create_chat_view()
        print("\\nSUCCESS! Setup complete.")
        print("1. Your .env file is ready.")
        print("2. 'google-generativeai' is installed.")
        print("3. 'tourism/chat_view.py' has been created.")
        print("\\nYou can now restart your server.")
    except Exception as e:
        print(f"\\nSetup failed: {e}")
