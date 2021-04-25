from django.urls import path
from . import views

app_name = "analysis"

urlpatterns = [
    path('', views.show_analysis, name='analysis'),
]