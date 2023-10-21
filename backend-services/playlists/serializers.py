from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Playlist
from songs.serializers import SongSerializer

class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = [
            'id',
            'title',
            'description',
            'songs',
            'user'
            ]

class PlaylistViewSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True)
    
    class Meta:
        model = Playlist
        fields = [
            'id',
            'title',
            'description',
            'songs',
            'user'
        ]