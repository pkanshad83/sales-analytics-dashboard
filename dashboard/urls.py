from django.urls import path
from .views import UploadCSVView, LoginAPIView

urlpatterns = [
    path('api/upload/', UploadCSVView.as_view(), name='upload-csv'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
]