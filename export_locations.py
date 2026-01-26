import os
import django
import sys
import csv
from pathlib import Path

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from hospitality.models import Hotel
from services.models import Service

def export_locations():
    # Collect all data
    items = []
    
    # helper
    def add_item(name, type_, lat, lon):
        items.append([name, type_, lat, lon])

    for a in Attraction.objects.all().order_by('name'):
        add_item(a.name, "Attraction", a.latitude, a.longitude)
        
    for h in Hotel.objects.all().order_by('name'):
        add_item(h.name, "Hotel", h.latitude, h.longitude)
        
    for s in Service.objects.all().order_by('name'):
        # Add category to type for better context (e.g. Service: Restaurant)
        t = f"Service: {s.category.name}"
        add_item(s.name, t, s.latitude, s.longitude)

    # Output as CSV format to console
    print("Name,Type,Current_Latitude,Current_Longitude")
    for item in items:
        # Use str() to ensure decimals print nicely
        print(f'"{item[0]}","{item[1]}",{item[2]},{item[3]}')

if __name__ == '__main__':
    export_locations()
