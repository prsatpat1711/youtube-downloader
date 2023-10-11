from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from youtube_downloader.settings import SHOW_ADMIN_VIEW
from youtube_downloader.utils import BasicAdmin

from .models import Profile

# Register your models here.
if SHOW_ADMIN_VIEW == True:
    class ProfileAdmin(SimpleHistoryAdmin):
        list_display = (
            'id',
            'first_name',
            'last_name',
            'updated_by',
        )
        '''
        Moved to SimpleHistory Code
        '''
        history_list_display = ["first_name", "id"]
        search_fields = ['first_name', "id"]

    admin.site.register(Profile, ProfileAdmin)