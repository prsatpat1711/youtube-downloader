from django.urls import path
from .views import (
    SongCreate, SongList, SongRetrieveView
)

urlpatterns = [
    path('create/', SongCreate.as_view()),
    path('', SongList.as_view()),
    path('<int:pk>/', SongRetrieveView.as_view())
]