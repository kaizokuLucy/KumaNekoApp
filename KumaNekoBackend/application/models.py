from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime

class CustomUser(AbstractUser):
    email = models.EmailField(max_length = 255, unique = True)

    def __str__(self):
        return self.username


class Practice(models.Model):
    duration = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Test(models.Model):
    duration = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    correct_answers_number = models.IntegerField()

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class Question(models.Model):
    is_test = models.BooleanField()
    is_practice = models.BooleanField()
    letter = models.CharField(max_length=1)
    users_answer = models.CharField(blank=True, null=True, max_length=10)
    test = models.IntegerField(blank=True, null=True)
    practice = models.IntegerField(blank=True, null=True)
    incorrect_tries = models.IntegerField(blank=True, null=True)
