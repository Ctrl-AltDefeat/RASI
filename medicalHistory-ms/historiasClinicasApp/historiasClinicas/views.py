from hashlib import sha256

from django.shortcuts import render

# Create your views here.
# views.py

import json
import pymongo
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError

from .models import MedicalHistory

from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my first <u>Django App</u> project!</h1>")


client = pymongo.MongoClient('mongodb://ISIS2304C20202320:PAVWddaLPqbB@157.253.236.88:8087/ISIS2304C20202320')
#Define DB Name
dbname = client['ISIS2304C20202320']

#Define Collection
collection = dbname['medicalhistory']

medicalhistory1 = {
    'id': 1,
    'text': 'This is a medical history',
    'hash': sha256('This is a medical history'.encode('utf-8')).hexdigest()
}

collection.insert_one(medicalhistory1)

medicalhistory_details = collection.find_one({})
print('Medical History details:')
print(medicalhistory_details)

@csrf_exempt
def get_medical_history(request, id):
    try:
        medical_history = collection.find_one({'id': id})
        if medical_history:
            response_data = {
                'id': medical_history.get('id'),
                'text': medical_history.get('text'),
                'hash': medical_history.get('hash')
            }
            return JsonResponse(response_data, safe=False)
        else:
            return JsonResponse({'error': 'Medical history not found'}, status=404)

    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)


@csrf_exempt
def create_medical_history(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request body
            data = json.loads(request.body)

            # Assuming 'id', 'text', and 'hash' are required fields
            medical_history_data = {
                'id': data.get('id'),
                'text': data.get('text'),
                'hash': data.get('hash')
            }

            # Insert the new medical history record into MongoDB
            result = collection.insert_one(medical_history_data)

            # Respond with the ID of the newly created record
            response_data = {'id': str(result.inserted_id)}
            return JsonResponse(response_data, status=201)  # 201 Created

        except Exception as e:
            return JsonResponse({'error': f'Error: {str(e)}'}, status=500)  # 500 Internal Server Error

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)  # 405 Method Not Allowed