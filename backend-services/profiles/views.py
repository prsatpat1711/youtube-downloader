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
from django.shortcuts import get_object_or_404


from .models import Profile
from .serializers import ProfileSerializer,ProfileCreateSerializer
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
    serializer_class = ProfileCreateSerializer
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
        username = self.request.data['username']
        password = self.request.data['password']
        email = self.request.data['email']
        confirm_password = self.request.data['confirmPassword']

        if User.objects.filter(username=username).exists():
            raise ValidationError("Username already exists")
        
        if password == confirm_password:
            user = User.objects.create_user(username=username, email=email, password= password)
            user.save()
            serializer.role = "user"
            serializer.first_name = self.request.data['firstName']
            serializer.last_name = self.request.data['lastName']
            serializer.save(
                user=user,
                created_by=user,
                updated_by=user
                )
        else:
            raise ValidationError("Passwords dont match")
        



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




class ProfileRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
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

class ProfileMeView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Attempt to retrieve the profile for the authenticated user
        user = self.request.user
        print(user)
        profile = Profile.objects.get(user=user)
        print(profile)
        return profile
