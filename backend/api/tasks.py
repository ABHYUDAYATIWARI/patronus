import requests
import os
from .models import User
from celery import shared_task
from django.db import transaction

OCR_SPACE_API_KEY = "K85744703588957"
OCR_SPACE_API_URL = "https://api.ocr.space/parse/image"

@shared_task
def process_pdf_ocr(user_id):
    try:
        user = User.objects.get(id=user_id)
        pdf_path = user.pdfFile.path
        
        with open(pdf_path, "rb") as pdf_file:
            response = requests.post(
                OCR_SPACE_API_URL,
                files={"file": pdf_file},
                data={"apikey": OCR_SPACE_API_KEY, "isOverlayRequired": False, "filetype": "pdf"},
                timeout=120
            )

        if response.status_code == 200:
            result = response.json()
            extracted_text = "\n".join(item["ParsedText"] for item in result.get("ParsedResults", []) if "ParsedText" in item)

            User.objects.filter(id=user_id).update(
                content=extracted_text or "OCR completed, but no text extracted.",
                status="completed"
            )
            return f"OCR completed for user {user.name}"

        error_message = response.json().get("ErrorMessage", f"HTTP Error {response.status_code}")
        User.objects.filter(id=user_id).update(content=error_message, status="completed")
        return f"Error: {error_message}"

    except requests.exceptions.Timeout:
        return "Error: OCR API request timed out"
    except requests.exceptions.RequestException as e:
        return f"Error: Network issue - {str(e)}"
    except User.DoesNotExist:
        return f"Error: User with ID {user_id} not found"
    except Exception as e:
        User.objects.filter(id=user_id).update(content=str(e), status="completed")
        return f"Error: Unexpected issue - {str(e)}"
