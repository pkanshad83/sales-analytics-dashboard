from rest_framework import serializers
from .models import SalesRecord


class SalesRecordSerializer(serializers.ModelSerializer):
     class Meta:
        model = SalesRecord
        fields = '__all__'  # Include all model fields