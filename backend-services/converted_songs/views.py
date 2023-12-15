from django.shortcuts import render
from rest_framework import generics
from django_filters import (
    FilterSet,
    CharFilter,
    BooleanFilter
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.forms import ValidationError
from datetime import time
from .models import ConvertedSong
from profiles.models import Profile
from .serializers import ConvertedSongSerializer, ConvertedSongViewSerializer


class ConvertedSongFilter(FilterSet):
    title = CharFilter(lookup_expr='iexact')
    description = CharFilter(lookup_expr='iexact')
    archive = BooleanFilter(lookup_expr = 'exact')
    

    class Meta:
        model = ConvertedSong
        fields = {
            'title': ['iexact'],
            'archive':['exact']
        }

class ConvertedSongCreate(generics.ListCreateAPIView):
    queryset = ConvertedSong.objects.all()
    serializer_class = ConvertedSongSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = ConvertedSongFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title'
    ]

    def perform_create(self, serializer):
        if self.request.user:
            serializer.save(
                created_by = self.request.user,
                updated_by = self.request.user
            )
        else:
            serializer.save()



class ConvertedSongList(generics.ListAPIView):
    queryset = ConvertedSong.objects.all()
    serializer_class = ConvertedSongViewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = ConvertedSongFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
    ]



class ConvertedSongRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConvertedSong.objects.all()
    serializer_class = ConvertedSongViewSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self,serializer):
        if self.request.user:
            serializer.save(
                updated_by = self.request.user
            )
        else:
            serializer.save()

    def perform_destroy(self, instance):
        instance.archive = True
        instance.updated_by = self.request.user
        instance.save()
        return instance