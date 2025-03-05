from django.db import models

class User(models.Model):
    STATUS_CHOICES = [
        ('pending', 'pending'),
        ('completed', 'completed'),
    ]

    name = models.CharField(max_length=50)
    pdfFile = models.FileField(upload_to='uploads/', null=True, blank=True) 
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending', null=True, blank=True)
    content = models.TextField(null=True, blank=True)  

    def __str__(self):
        return self.name
