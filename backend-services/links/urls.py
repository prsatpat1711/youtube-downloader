from django.urls import path
from .views import (
    LinkCreate, LinkList, LinkRetrieveView
)

urlpatterns = [
    path('create/', LinkCreate.as_view()),
    path('', LinkList.as_view()),
    path('<int:pk>/', LinkRetrieveView.as_view())
]