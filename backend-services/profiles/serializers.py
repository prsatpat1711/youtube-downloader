from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'id',
            'first_name',
            'last_name',
            'role',
            ]
        
class ProfileCreateSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(read_only=True)
    lastName = serializers.CharField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'firstName',
            'lastName',
            ]