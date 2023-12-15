from django.db import models
from django.contrib.auth.models import User
from songs.models import Song

# Create your models here.
class ConvertedSong(models.Model):
    #Relations
    created_by = models.ForeignKey(
        User, 
        null=True,
        related_name='converted_song_creator',
        blank=True, 
        on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        User, 
        null=True, 
        related_name='converted_song_updater',
        blank=True, 
        on_delete=models.CASCADE
    )
    song = models.ManyToManyField(Song, related_name='converted_songs', blank=True)

    #Columns
    title = models.CharField(max_length=250)
    duration = models.TimeField()
    archive = models.BooleanField(default=False, null=True, blank=True)

    #Timestamps
    date_created = models.DateTimeField(auto_created=True, auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super(ConvertedSong, self).save(*args, **kwargs)    

    def __str__(self):
        if self.title:
            return "{} | {}".format(self.id, self.title)
        else:
            return "{}".format(self.id)
  
    class Meta:
        ordering = ['title']