from django.urls import path

from . import views

urlpatterns = [
    path('historiasClinicas/<int:id>/', views.get_medical_history, name='get_medical_history'),
    path('historiasClinicas/', views.create_medical_history, name='create_medical_history'),]