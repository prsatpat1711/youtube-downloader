from django.urls import path
from .views import (
    ConvertedSongCreate, ConvertedSongList, ConvertedSongRetrieveView
)

urlpatterns = [
    path('create/', ConvertedSongCreate.as_view()),
    path('', ConvertedSongList.as_view()),
    path('<int:pk>/', ConvertedSongRetrieveView.as_view())
]