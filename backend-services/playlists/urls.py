from django.urls import path
from .views import (
    PlaylistCreate, PlaylistList, PlaylistRetrieveView
)

urlpatterns = [
    path('create/', PlaylistCreate.as_view()),
    path('', PlaylistList.as_view()),
    path('<int:pk>/', PlaylistRetrieveView.as_view())
]