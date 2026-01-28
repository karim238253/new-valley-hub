from django.db import models
from core.models import BaseLocationModel

class Hotel(BaseLocationModel):
    STARS_CHOICES = [(i, f"{i} Star") for i in range(1, 6)]
    
    stars = models.IntegerField(choices=STARS_CHOICES, default=3)
    # Direct link to Booking.com as requested
    booking_url = models.URLField(help_text="Direct link to Booking.com or external reservation page")
    # Google Maps Link
    google_map_url = models.URLField(max_length=500, blank=True, null=True, help_text="Google Maps location link")
    contact_email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    
    # Simple price range indicator
    PRICE_CHOICES = [
        ('$', 'Budget'),
        ('$$', 'Moderate'),
        ('$$$', 'Luxury'),
    ]
    price_range = models.CharField(max_length=3, choices=PRICE_CHOICES, default='$$')

    def __str__(self):
        return self.name
