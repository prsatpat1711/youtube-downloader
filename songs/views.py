from pytube import YouTube
from pydub import AudioSegment
from datetime import time

from django.shortcuts import render
from rest_framework import generics
from django_filters import (
    FilterSet,
    CharFilter
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.forms import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser

from links.models import Link
from .models import Song
from .serializers import SongSerializer, SongCreateSerializer


class SongFilter(FilterSet):
    title = CharFilter(lookup_expr='iexact')
    duration = CharFilter(lookup_expr='iexact')
    artist = CharFilter(lookup_expr='iexact')
    movie = CharFilter(lookup_expr='iexact')
    

    class Meta:
        model = Song
        fields = {
            'title': ['iexact'],
            'duration':['iexact'],
            'artist':['iexact'],
            'movie':['iexact'],
        }

class SongCreate(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongCreateSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = SongFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
        'duration',
        'artist',
        'movie',
    ]

    def perform_create(self, serializer):
        youtube_url = self.request.data['url']
        link, created = Link.objects.get_or_create(title = youtube_url, site_name = self.request.data['site_name'])
        try:
            yt = YouTube(youtube_url)
            audio_stream = yt.streams.filter(only_audio=True).first()
            if audio_stream:
                file_name = yt.title + ".mp3"
                file_path = "downloads/" + file_name
                audio_stream.download(output_path="media/downloads/", filename=file_name)
                audio = AudioSegment.from_file("media/" + file_path)
                duration_in_seconds = len(audio) / 1000  # Convert milliseconds to seconds
                minutes = int(duration_in_seconds // 60)
                seconds = int(duration_in_seconds % 60)
                duration = f"{minutes:02d}:{seconds:02d}"
                # Save the downloaded file to the database
                song = Song.objects.create(
                    created_by=self.request.user,
                    updated_by=self.request.user,
                    file=file_path,
                    duration=duration,
                    link=link,
                    title=serializer.validated_data['title'],
                    artist=serializer.validated_data['artist'],
                    movie=serializer.validated_data['movie']
                )
            else:
                raise Exception('No audio stream found in the provided YouTube link.')
        except Exception as e:
            raise Exception('Error downloading audio from the provided link.', e)


class SongList(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = SongFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
        'duration',
        'artist',
        'movie',
    ]



class SongRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
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
