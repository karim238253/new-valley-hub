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

def update_coordinates():
    csv_path = 'new_coordinates.csv'
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)  # Skip header
        
        count = 0
        
        print("Starting coordinate update...")
        for row in reader:
            if not row: continue
            
            name = row[0]
            type_str = row[1]
            lat = row[2]
            lon = row[3]
            
            # Find the object and update
            updated = False
            
            # 1. Try Attraction
            try:
                obj = Attraction.objects.get(name__iexact=name)
                obj.latitude = lat
                obj.longitude = lon
                obj.save()
                print(f"✓ Updated Attraction: {name}")
                updated = True
                count += 1
                continue
            except Attraction.DoesNotExist:
                pass
                
            # 2. Try Hotel
            try:
                obj = Hotel.objects.get(name__iexact=name)
                obj.latitude = lat
                obj.longitude = lon
                obj.save()
                print(f"✓ Updated Hotel: {name}")
                updated = True
                count += 1
                continue
            except Hotel.DoesNotExist:
                pass

            # 3. Try Service
            objs = Service.objects.filter(name__iexact=name)
            if objs.exists():
                for o in objs:
                    o.latitude = lat
                    o.longitude = lon
                    o.save()
                print(f"✓ Updated {objs.count()} Service(s): {name}")
                updated = True
                count += 1
                continue

            if not updated:
                print(f"✗ NOT FOUND: {name}")

    print(f"\nUpdate Complete! {count} items updated.")

if __name__ == '__main__':
    update_coordinates()
