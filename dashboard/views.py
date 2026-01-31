import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import os

@method_decorator(csrf_exempt, name='dispatch')
class UploadCSVView(APIView):
    """
    API endpoint for uploading and processing CSV files
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
            # Read CSV file with pandas
            df = pd.read_csv(csv_file)
            
            # Validate required columns
            required_columns = ['date', 'product', 'quantity', 'revenue']
            for col in required_columns:
                if col not in df.columns:
                    return Response(
                        {'error': f'Missing required column: {col}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Calculate metrics
            total_revenue = df['revenue'].sum()
            avg_order_value = total_revenue / len(df) if len(df) > 0 else 0
            top_product = df.groupby('product')['revenue'].sum().idxmax()
            
            # Prepare chart data (monthly revenue)
            df['date'] = pd.to_datetime(df['date'])
            try:
                # For pandas >= 2.0
                monthly_data = df.set_index('date').resample('ME')['revenue'].sum()
            except ValueError:
                # For pandas < 2.0
                monthly_data = df.set_index('date').resample('M')['revenue'].sum()
            
            # Prepare response
            metrics = {
                'total_revenue': round(float(total_revenue), 2),
                'avg_order_value': round(float(avg_order_value), 2),
                'total_transactions': len(df),
                'top_product': top_product
            }
            
            chart_data = {
                'months': monthly_data.index.strftime('%Y-%m').tolist(),
                'revenues': monthly_data.values.tolist()
            }
            
            return Response({
                'message': 'File processed successfully',
                'metrics': metrics,
                'chart_data': chart_data
            })
            
        except pd.errors.EmptyDataError:
            return Response(
                {'error': 'CSV file is empty'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except pd.errors.ParserError:
            return Response(
                {'error': 'Invalid CSV format'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Processing error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

def home_view(request):
    """Serve React frontend or API info"""
    return JsonResponse({
        'message': 'Sales Analytics Dashboard API',
        'endpoints': {
            'api_upload': '/api/upload/',
            'admin': '/admin/'
        },
        'frontend': 'React app should be served from /static/'
    })
