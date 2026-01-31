from django.urls import path
from .views import UploadCSVView
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'service': 'Sales Analytics Dashboard',
        'version': '1.0.0'
    })

urlpatterns = [
    path('api/upload/', UploadCSVView.as_view(), name='upload-csv'),
    path('api/health/', health_check, name='health-check'),
]
