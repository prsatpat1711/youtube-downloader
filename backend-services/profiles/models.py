from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    #Relations
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        User, 
        null=True,
        related_name='profile_creator',
        blank=True, 
        on_delete=models.CASCADE
    )
    updated_by = models.ForeignKey(
        User, 
        null=True, 
        related_name='profile_updater',
        blank=True, 
        on_delete=models.CASCADE
    )

    #Columns
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    ROLES = (('admin', 'Admin'), ('user', 'User'), ('manager', 'Manager'))
    role = models.CharField(max_length=10, choices=ROLES)
    archive = models.BooleanField(default=False, blank=True,null=True)

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)    

    def __str__(self):
        if self.first_name:
            return "{} | {} | {}".format(self.id, self.first_name, self.last_name)
        else:
            return "{}".format(self.id)
  
    class Meta:
        ordering = ['id']