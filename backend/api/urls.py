from django.urls import path
from .views import get_user,upload_file,get_all_users

urlpatterns = [
    path('users/',get_all_users,name='get_all_user'),
    path('user/',get_user,name='get_user'),
    path('post-file/',upload_file,name='upload_file')
]
