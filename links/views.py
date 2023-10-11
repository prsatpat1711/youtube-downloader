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

from .models import Link
from .serializers import LinkSerializer


class LinkFilter(FilterSet):
    title = CharFilter(lookup_expr='iexact')
    site_name = CharFilter(lookup_expr='iexact')
    

    class Meta:
        model = Link
        fields = {
            'title': ['iexact'],
            'site_name':['iexact'],
        }

class LinkCreate(generics.ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = LinkFilter
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



class LinkList(generics.ListAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter, 
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    filterset_class = LinkFilter
    ordering_fields = '__all__'
    search_fields = [ 
        'title',
        'site_name',
    ]



class LinkRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
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
