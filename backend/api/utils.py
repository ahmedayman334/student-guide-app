from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        original_data = response.data
        
        response.data = {
            "error": "Validation Failed", 
            "message": "Please check the submitted data.", 
            "details": original_data 
        }

    return response