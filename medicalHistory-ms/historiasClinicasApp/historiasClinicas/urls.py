from django.urls import path

from . import views

urlpatterns = [path('historiasClinicas',views.index,name='index'),]