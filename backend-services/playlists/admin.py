from django.contrib import admin
from youtube_downloader.settings import SHOW_ADMIN_VIEW
from youtube_downloader.utils import BasicAdmin
from .models import Playlist
# Register your models here.

if SHOW_ADMIN_VIEW == True:
    admin.site.register(Playlist, BasicAdmin)