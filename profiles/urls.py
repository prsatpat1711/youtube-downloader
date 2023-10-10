from django.urls import path
from .views import (
    ProfileCreate, ProfileList
)

urlpatterns = [
    path('create/', ProfileCreate.as_view()),
    path('', ProfileList.as_view())
]