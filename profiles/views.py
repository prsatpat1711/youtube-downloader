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


from .models import Profile
from .serializers import ProfileSerializer
from django.contrib.auth.models import User

class ProfileFilter(FilterSet):
    first_name = CharFilter(lookup_expr='iexact')
    last_name = CharFilter(lookup_expr='iexact')
    role = CharFilter(lookup_expr='exact')
    archive = CharFilter(lookup_expr='exact')

    class Meta:
        model = Profile
        fields = {
            'first_name': ['iexact'],
            'last_name':['iexact'],
            'role': ['exact'],
            'archive':['exact']
        }

class ProfileCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = ProfileFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'first_name',
        'last_name',
        'role',
        'archive'
    ]

    def perform_create(self, serializer):
        # Extract user data from the serializer
        username = self.request.data['username']
        password = self.request.data['password']
        email = self.request.data['email']
        confirm_password = self.request.data['confirm_password']

        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")
        # Create the User model
        if password == confirm_password:
            user = User.objects.create(username=username, email=email, password= password)
            #user.set_password(password)
            user.save()
            serializer.save(
                user=user,
                created_by=user,
                updated_by=user
                )
        else:
            raise ValidationError("Passwords dont match")
        # Create the Profile model associated with the User



class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = ProfileFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'first_name',
        'last_name',
        'role',
        'archive'
    ]