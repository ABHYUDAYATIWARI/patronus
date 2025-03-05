from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
from .models import User
from .tasks import process_pdf_ocr
# Create your views here.

MAX_PDF_SIZE_KB = 1024

@api_view(['GET'])
def get_all_users(request):
    users=User.objects.values('id', 'name', 'pdfFile', 'status')
    return Response(users)
    

@api_view(['GET'])
def get_user(request):
    name = request.query_params.get('name', None) 
    if name:
        users = User.objects.filter(name__icontains=name)  
    else:
        users = User.objects.all()

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    data = UserSerializer(data=request.data)
    
    if data.is_valid():
        pdf_file = request.FILES.get('pdfFile')
        
        if pdf_file:
            file_size_kb = pdf_file.size / 1024
            
            if file_size_kb > MAX_PDF_SIZE_KB:
                user = data.save()
                
                user.content = f"Unable to process PDF: File size ({file_size_kb:.2f} KB) exceeds the maximum allowed size of {MAX_PDF_SIZE_KB} KB. Please upload a smaller file."
                user.status = "completed"
                user.save(update_fields=["content", "status"])
                
                return Response({
                    **data.data,
                    "warning": f"File size exceeds limit of {MAX_PDF_SIZE_KB} KB. File was not processed."
                }, status=status.HTTP_201_CREATED)
        
        user = data.save()
        process_pdf_ocr.delay(user.id) 

        return Response(data.data, status=status.HTTP_201_CREATED)
    
    return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)
