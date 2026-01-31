import sys
import os

# Try to import requests, install if missing
try:
    import requests
    print("✅ requests module available")
except ImportError:
    print("❌ requests not installed")
    print("Installing requests...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests
    print("✅ requests installed successfully")

# Now test the API
print("\n🧪 Testing API upload...")

# Create CSV content
csv_content = """date,product,quantity,revenue
2024-01-15,Laptop,2,3000.00
2024-01-20,Mouse,10,500.00"""

# Save to temp file
with open('test_simple.csv', 'w') as f:
    f.write(csv_content)

try:
    with open('test_simple.csv', 'rb') as f:
        files = {'file': f}
        print("Sending POST request to http://localhost:8000/api/upload/")
        response = requests.post('http://localhost:8000/api/upload/', files=files)
    
    print(f"\n📊 Response Status: {response.status_code}")
    
    if response.status_code == 200:
        import json
        data = response.json()
        print("✅ API SUCCESS!")
        print(f"Message: {data['message']}")
        print(f"Total Revenue: ${data['metrics']['total_revenue']}")
        print(f"Top Product: {data['metrics']['top_product']}")
    else:
        print(f"❌ API Error: {response.text}")
        
except Exception as e:
    print(f"\n❌ Exception: {type(e).__name__}: {e}")

# Clean up
if os.path.exists('test_simple.csv'):
    os.remove('test_simple.csv')

print("\n🎯 Next: Test in browser at http://localhost:3000")
