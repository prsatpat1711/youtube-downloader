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

from .models import Playlist
from profiles.models import Profile
from .serializers import PlaylistSerializer, PlaylistViewSerializer


class PlaylistFilter(FilterSet):
    title = CharFilter(lookup_expr='iexact')
    description = CharFilter(lookup_expr='iexact')
    archive = BooleanFilter(lookup_expr = 'exact')
    

    class Meta:
        model = Playlist
        fields = {
            'title': ['iexact'],
            'description':['iexact'],
            'archive':['exact']
        }

class PlaylistCreate(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = PlaylistFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
        'site_name',
    ]

    def perform_create(self, serializer):
        if self.request.user:
            serializer.save(
                created_by = self.request.user,
                updated_by = self.request.user
            )
        else:
            serializer.save()



class PlaylistList(generics.ListAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistViewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = PlaylistFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
        'site_name',
    ]



class PlaylistRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistViewSerializer
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
