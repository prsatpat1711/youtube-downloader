"""
URL configuration for youtube_downloader project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from .settings import (
    FUNCTION_APP_PATH,
    DEBUG,
    MEDIA_URL,
    MEDIA_ROOT
)

urlpatterns = [
    path(FUNCTION_APP_PATH + '/admin/', admin.site.urls),
    path(FUNCTION_APP_PATH + '/api-auth/', include('rest_framework.urls')),
    path(FUNCTION_APP_PATH + '/profiles/', include('profiles.urls')),
    path(FUNCTION_APP_PATH + '/links/', include('links.urls')),
    path(FUNCTION_APP_PATH + '/songs/', include('songs.urls')),
    path(FUNCTION_APP_PATH + '/converted_songs/', include('converted_songs.urls'))
]
if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)