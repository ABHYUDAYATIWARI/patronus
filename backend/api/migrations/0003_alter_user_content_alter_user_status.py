# Generated by Django 5.1.6 on 2025-03-04 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_user_pdffilelink_user_pdffile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(blank=True, choices=[('pending', 'pending'), ('completed', 'completed')], default='pending', max_length=10, null=True),
        ),
    ]
