from django.urls import path
from .views import (
    ProfileCreate, ProfileList, ProfileMeView
)

urlpatterns = [
    path('create/', ProfileCreate.as_view()),
    path('', ProfileList.as_view()),
    path('me/', ProfileMeView.as_view())
]