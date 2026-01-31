import csv
from datetime import datetime
from collections import defaultdict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import io

class UploadCSVView(APIView):
    """
    Lightweight CSV upload without pandas
    """
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        if 'file' not in request.FILES:
            return Response(
                {'error': 'No file uploaded'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        csv_file = request.FILES['file']
        
        try:
            # Read CSV content
            content = csv_file.read().decode('utf-8')
            csv_reader = csv.DictReader(io.StringIO(content))
            
            # Validate required columns
            required_columns = ['date', 'product', 'quantity', 'revenue']
            if csv_reader.fieldnames:
                for col in required_columns:
                    if col not in csv_reader.fieldnames:
                        return Response(
                            {'error': f'Missing required column: {col}'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            
            # Process data
            rows = list(csv_reader)
            total_revenue = 0
            product_revenue = defaultdict(float)
            monthly_revenue = defaultdict(float)
            
            for row in rows:
                try:
                    quantity = int(row['quantity'])
                    revenue = float(row['revenue'])
                    date_str = row['date']
                    
                    total_revenue += revenue
                    product_revenue[row['product']] += revenue
                    
                    # Parse date for monthly aggregation
                    try:
                        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                        month_key = date_obj.strftime('%Y-%m')
                        monthly_revenue[month_key] += revenue
                    except ValueError:
                        # Try different date formats if needed
                        pass
                        
                except (ValueError, KeyError) as e:
                    return Response(
                        {'error': f'Invalid data in row: {row}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Calculate metrics
            avg_order_value = total_revenue / len(rows) if rows else 0
            top_product = max(product_revenue.items(), key=lambda x: x[1])[0] if product_revenue else "N/A"
            
            # Prepare chart data
            sorted_months = sorted(monthly_revenue.items())
            
            metrics = {
                'total_revenue': round(total_revenue, 2),
                'avg_order_value': round(avg_order_value, 2),
                'total_transactions': len(rows),
                'top_product': top_product
            }
            
            chart_data = {
                'months': [month for month, _ in sorted_months],
                'revenues': [revenue for _, revenue in sorted_months]
            }
            
            return Response({
                'message': 'File processed successfully',
                'metrics': metrics,
                'chart_data': chart_data
            })
            
        except csv.Error:
            return Response(
                {'error': 'Invalid CSV format'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Processing error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
