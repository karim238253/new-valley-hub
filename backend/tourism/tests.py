from django.test import TestCase
from rest_framework.test import APITestCase
from .models import Attraction, SiteConfiguration
from unittest.mock import patch, MagicMock

class SiteConfigurationTests(TestCase):
    """Test the SiteConfiguration singleton model"""
    
    def test_site_configuration_singleton(self):
        """Test that SiteConfiguration uses singleton pattern correctly"""
        config1 = SiteConfiguration.objects.create(gemini_api_key="TEST_KEY_123")
        self.assertEqual(config1.gemini_api_key, "TEST_KEY_123")
        self.assertEqual(config1.pk, 1)  # Singleton always has pk=1
        
    def test_site_configuration_load(self):
        """Test the .load() classmethod creates and retrieves config"""
        config = SiteConfiguration.load()
        self.assertIsNotNone(config)
        self.assertEqual(config.pk, 1)
        
        # Update and reload
        config.gemini_api_key = "UPDATED_KEY"
        config.save()
        
        reloaded = SiteConfiguration.load()
        self.assertEqual(reloaded.gemini_api_key, "UPDATED_KEY")


class ChatbotAPITests(APITestCase):
    """Test the AI Chatbot API endpoint"""
    
    def setUp(self):
        self.chat_url = "/api/tourism/chat/"
        # Create test attraction for RAG context
        self.attraction = Attraction.objects.create(
            name="White Desert",
            description="A surreal landscape of chalk rock formations in Farafra.",
            attraction_type="natural",
            visit_duration_minutes=180,
            opening_time="00:00:00",
            closing_time="23:59:59",
            ticket_price=50.00,
            location="Farafra Oasis",
            latitude=27.0524,
            longitude=27.9679
        )

    @patch('tourism.views.genai.GenerativeModel')
    @patch('tourism.views.genai.configure')
    def test_chatbot_with_database_key(self, mock_configure, MockModel):
        """Test chatbot uses API key from database"""
        # Setup mock
        mock_instance = MockModel.return_value
        mock_response = MagicMock()
        mock_response.text = "Ahlan ya habibi! Welcome to the New Valley!"
        mock_instance.generate_content.return_value = mock_response
        
        # Create database config
        SiteConfiguration.objects.create(gemini_api_key="DB_TEST_KEY")
        
        # Make request
        response = self.client.post(self.chat_url, {"message": "Hello"}, format='json')
        
        # Assertions
        self.assertEqual(response.status_code, 200)
        self.assertIn("response", response.data)
        self.assertEqual(response.data["response"], "Ahlan ya habibi! Welcome to the New Valley!")
        
        # Verify genai.configure was called with DB key
        mock_configure.assert_called_once_with(api_key="DB_TEST_KEY")

    @patch('tourism.views.genai.GenerativeModel')
    @patch('tourism.views.genai.configure')
    @patch.dict('os.environ', {'GEMINI_API_KEY': 'ENV_TEST_KEY'})
    def test_chatbot_fallback_to_env(self, mock_configure, MockModel):
        """Test chatbot falls back to environment variable when DB is empty"""
        # Setup mock
        mock_instance = MockModel.return_value
        mock_response = MagicMock()
        mock_response.text = "Using environment key!"
        mock_instance.generate_content.return_value = mock_response
        
        # Ensure no DB config exists
        SiteConfiguration.objects.all().delete()
        
        # Make request
        response = self.client.post(self.chat_url, {"message": "Test"}, format='json')
        
        # Should succeed with env var
        self.assertEqual(response.status_code, 200)
        mock_configure.assert_called_once_with(api_key="ENV_TEST_KEY")

    def test_chatbot_no_api_key(self):
        """Test chatbot returns error when no API key is configured"""
        # Clear DB config
        SiteConfiguration.objects.all().delete()
        
        # Make request (no env var set in test)
        response = self.client.post(self.chat_url, {"message": "Test"}, format='json')
        
        # Should return 500 error
        self.assertEqual(response.status_code, 500)
        self.assertIn("error", response.data)

    @patch('tourism.views.genai.GenerativeModel')
    @patch('tourism.views.genai.configure')
    def test_chatbot_rag_context(self, mock_configure, MockModel):
        """Test that chatbot includes database context in prompt"""
        mock_instance = MockModel.return_value
        mock_response = MagicMock()
        mock_response.text = "The White Desert is amazing!"
        mock_instance.generate_content.return_value = mock_response
        
        SiteConfiguration.objects.create(gemini_api_key="TEST_KEY")
        
        # Ask about White Desert
        response = self.client.post(self.chat_url, {"message": "White Desert"}, format='json')
        
        self.assertEqual(response.status_code, 200)
        
        # Verify generate_content was called with a prompt containing our attraction
        call_args = mock_instance.generate_content.call_args[0][0]
        self.assertIn("White Desert", call_args)


class SearchAPITests(APITestCase):
    """Test the Global Search API endpoint"""
    
    def setUp(self):
        self.search_url = "/api/tourism/search/"
        
        # Create test attractions
        Attraction.objects.create(
            name="Kharga Temple",
            description="Ancient temple in Kharga Oasis",
            attraction_type="historical",
            visit_duration_minutes=90,
            opening_time="08:00:00",
            closing_time="17:00:00",
            ticket_price=20.00,
            location="Kharga",
            latitude=25.4405,
            longitude=30.5433
        )
        
        Attraction.objects.create(
            name="Dakhla Oasis",
            description="Historic oasis town with mud-brick architecture",
            attraction_type="cultural",
            visit_duration_minutes=240,
            opening_time="00:00:00",
            closing_time="23:59:59",
            ticket_price=0.00,
            location="Dakhla",
            latitude=25.5000,
            longitude=29.0000
        )

    def test_search_by_name(self):
        """Test searching by attraction name"""
        response = self.client.get(f"{self.search_url}?q=Kharga")
        
        self.assertEqual(response.status_code, 200)
        self.assertIn("results", response.data)
        
        results = response.data["results"]
        self.assertTrue(any(item["name"] == "Kharga Temple" for item in results))

    def test_search_by_description(self):
        """Test searching by description keywords"""
        response = self.client.get(f"{self.search_url}?q=mud-brick")
        
        self.assertEqual(response.status_code, 200)
        results = response.data["results"]
        self.assertTrue(any("Dakhla" in item["name"] for item in results))

    def test_search_empty_query(self):
        """Test that empty search returns all results"""
        response = self.client.get(f"{self.search_url}?q=")
        
        self.assertEqual(response.status_code, 200)
        # Should return both attractions
        self.assertGreaterEqual(len(response.data["results"]), 2)

    def test_search_no_results(self):
        """Test search with no matching results"""
        response = self.client.get(f"{self.search_url}?q=nonexistent12345")
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 0)
