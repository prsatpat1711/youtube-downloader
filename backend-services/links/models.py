from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Link(models.Model):
    #Relations
    created_by = models.ForeignKey(
        User, 
        null=True,
        related_name='link_creator',
        blank=True, 
        on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        User, 
        null=True, 
        related_name='link_updater',
        blank=True, 
        on_delete=models.CASCADE
    )

    #Columns
    title = models.CharField(max_length=250)
    site_name = models.CharField(max_length=100, null=True, blank=True)
    archive = models.BooleanField(default=False, null=True, blank=True)

    #Timestamps
    date_created = models.DateTimeField(auto_created=True, auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super(Link, self).save(*args, **kwargs)    

    def __str__(self):
        if self.title:
            return "{} | {}".format(self.id, self.title)
        else:
            return "{}".format(self.id)
  
    class Meta:
        ordering = ['title']