from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ConvertedSong
from songs.serializers import SongSerializer

class ConvertedSongSerializer(serializers.ModelSerializer):

    class Meta:
        model = ConvertedSong
        fields = [
            'id',
            'title',
            'song',
            'duration'
            ]

class ConvertedSongViewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ConvertedSong
        fields = [
            'id',
            'title',
            'song',
            'duration'
        ]