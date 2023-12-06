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
        medical_history = collection.get(id=id)
        response_data = {
            'id': medical_history.id,
            'text': medical_history.text,
            'hash': medical_history.hash
        }
        return JsonResponse(response_data, safe=False)

    except MedicalHistory.DoesNotExist:
        return JsonResponse({'error': 'Medical history not found'}, status=404)


@csrf_exempt
def update_medical_history(request, id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body.decode('utf-8'))
            text = data.get('text', '')
            hash_value = sha256(text.encode('utf-8')).hexdigest()

            response_data = {
                'id': id,
                'text': text,
                'hash': hash_value
            }
            try:
                medical_history = MedicalHistory.objects.get(id=id)
                medical_history.text = text
                medical_history.hash = hash_value
                medical_history.save()

            except MedicalHistory.DoesNotExist:
                collection.insert_one(response_data)


            return JsonResponse(response_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
