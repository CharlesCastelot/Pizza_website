# Generated by Django 5.0.7 on 2024-07-18 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_pizza_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='userID',
        ),
    ]
