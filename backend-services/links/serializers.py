from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link

class LinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Link
        fields = [
            'id',
            'title',
            'site_name'
            ]