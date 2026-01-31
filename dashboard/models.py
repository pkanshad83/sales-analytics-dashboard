from django.db import models

# Create your models here.
class SalesRecord(models.Model):
    date = models.DateField()
    product = models.CharField(max_length=200)
    quatity = models.IntegerField()
    revenue = models.DecimalField(max_digits=10,decimal_places=2)
    region = models.CharField(max_length=100, blank = True) 
        
    def __str__(self):
        return f"{self.date} - {self.product}"