import requests
import json

# Create test CSV content
csv_content = """date,product,quantity,revenue
2024-01-15,Laptop,2,3000.00
2024-01-20,Mouse,10,500.00
2024-02-05,Keyboard,5,750.00"""

# Save to temporary file
with open('temp_test.csv', 'w') as f:
    f.write(csv_content)

try:
    # Send POST request with file
    with open('temp_test.csv', 'rb') as f:
        files = {'file': f}
        response = requests.post('http://localhost:8000/api/upload/', files=files)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        data = response.json()
        print("\n✅ SUCCESS! API Response:")
        print(json.dumps(data, indent=2))
        
        # Verify data
        print(f"\n📊 Verification:")
        print(f"  - Total Revenue: ${data['metrics']['total_revenue']}")
        print(f"  - Transactions: {data['metrics']['total_transactions']}")
        print(f"  - Top Product: {data['metrics']['top_product']}")
        print(f"  - Chart Data Points: {len(data['chart_data']['months'])} months")
    else:
        print(f"\n❌ Error: {response.json()}")
        
except Exception as e:
    print(f"\n❌ Exception: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()

finally:
    # Clean up
    import os
    if os.path.exists('temp_test.csv'):
        os.remove('temp_test.csv')
