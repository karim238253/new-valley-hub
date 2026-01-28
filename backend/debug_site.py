import urllib.request
import urllib.error
import sys

def check_endpoint(name, url):
    try:
        print(f"Checking {name} ({url})...", end=" ")
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                print("✅ PASS")
                return True
            else:
                print(f"❌ FAIL (Status: {response.status})")
                return False
    except urllib.error.HTTPError as e:
        print(f"❌ FAIL (Status: {e.code})")
        return False
    except Exception as e:
        print(f"❌ FAIL (Error: {str(e)})")
        return False

def main():
    base_url = "http://localhost:8000"
    endpoints = [
        ("Governor Profile", f"{base_url}/api/tourism/governor/"),
        ("Team", f"{base_url}/api/tourism/team/"),
        ("Digital Artifacts", f"{base_url}/api/tourism/artifacts/"),
        ("Attractions", f"{base_url}/api/tourism/attractions/"),
    ]

    print("--- 🔍 SOUVENIR HUB SMOKE TEST ---")
    all_passed = True
    for name, url in endpoints:
        if not check_endpoint(name, url):
            all_passed = False
    
    print("-" * 30)
    if all_passed:
        print("🎉 ALL SYSTEMS GO!")
        sys.exit(0)
    else:
        print("💥 SMOKE TEST FAILED")
        sys.exit(1)

if __name__ == "__main__":
    main()
