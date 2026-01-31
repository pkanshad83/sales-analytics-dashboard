import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

class UploadCSVView(APIView):
    """
    Simple API endpoint for uploading and processing CSV files
    No authentication required for portfolio project
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
            monthly_data = df.set_index('date').resample('ME')['revenue'].sum()
            
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
# Add at the end of dashboard/views.py
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Username and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'username': user.username
        })