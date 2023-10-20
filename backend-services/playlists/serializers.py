from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Playlist

class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = [
            'id',
            'title',
            'description',
            'songs'
            ]