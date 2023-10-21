from django.db import models
from django.contrib.auth.models import User
from songs.models import Song
from profiles.models import Profile

# Create your models here.
class Playlist(models.Model):
    #Relations
    created_by = models.ForeignKey(
        User, 
        null=True,
        related_name='playlist_creator',
        blank=True, 
        on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        User, 
        null=True, 
        related_name='playlist_updater',
        blank=True, 
        on_delete=models.CASCADE
    )
    songs = models.ManyToManyField(Song)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)

    #Columns
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=512)
    archive = models.BooleanField(default=False, blank=True,null=True)

    def save(self, *args, **kwargs):
        super(Playlist, self).save(*args, **kwargs)    

    def __str__(self):
            return self.title
        
    class Meta:
        ordering = ['id']