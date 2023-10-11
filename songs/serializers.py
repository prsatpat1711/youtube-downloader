from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    site_name = serializers.SerializerMethodField()

    def get_url(self, obj):
        return obj.link.title if obj.link else None

    def get_site_name(self,obj):
        return obj.link.site_name if obj.link else None

    class Meta:
        model = Song
        fields = [
            'id',
            'title',
            'file',
            'duration',
            'artist',
            'movie',
            'url',
            'site_name'
            ]
        
class SongCreateSerializer(serializers.ModelSerializer):
    url = serializers.CharField(max_length=512,read_only=True)
    site_name = serializers.CharField(max_length=50,read_only=True)

    class Meta:
        model = Song
        fields = [
            'id',
            'title',
            'artist',
            'movie',
            'url',
            'site_name'
            ]