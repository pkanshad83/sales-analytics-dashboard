from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from dashboard.views import UploadCSVView

def home(request):
    return JsonResponse({
        'message': 'Sales Analytics Dashboard API',
        'endpoints': {
            'upload': '/api/upload/ (POST)',
            'admin': '/admin/'
        },
        'instructions': 'Send POST request with CSV file to /api/upload/'
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload/', UploadCSVView.as_view()),
    path('', home),
]
