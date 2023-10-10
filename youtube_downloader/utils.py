from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .settings import SHOW_ADMIN_VIEW

class BasicAdmin(SimpleHistoryAdmin):
    list_display = (
        'id',
        'title',
        'created_by',
        'updated_by',
        'date_created',
        'last_modified',
    )
    '''
    Moved to SimpleHistory Code
    '''
    history_list_display = ["title", "id"]
    search_fields = ['title', "id"]