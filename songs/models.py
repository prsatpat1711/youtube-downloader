from django.db import models
from django.contrib.auth.models import User
from links.models import Link


# Create your models here.
class Song(models.Model):
    #Relations
    created_by = models.ForeignKey(
        User, 
        null=True,
        related_name='song_creator',
        blank=True, 
        on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        User, 
        null=True, 
        related_name='song_updater',
        blank=True, 
        on_delete=models.CASCADE
    )
    link = models.ForeignKey(Link, related_name="song", on_delete=models.CASCADE, default=0)
    

    #Columns
    title = models.CharField(max_length=250)
    duration = models.TimeField()
    artist = models.CharField(max_length=100, null=True, blank=True)
    movie = models.CharField(max_length=100, null=True, blank=True)
    archive = models.BooleanField(default=False, null=True, blank=True)

    #Timestamps
    date_created = models.DateTimeField(auto_created=True, auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super(Song, self).save(*args, **kwargs)    

    def __str__(self):
        if self.title:
            return "{} | {}".format(self.id, self.title)
        else:
            return "{}".format(self.id)
  
    class Meta:
        ordering = ['title']