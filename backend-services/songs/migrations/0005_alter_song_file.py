# Generated by Django 4.2.6 on 2023-10-11 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_alter_song_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='downloads/'),
        ),
    ]
