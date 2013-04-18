from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
# Create your models here.

class post(models.Model):
    postedBy = models.ForeignKey(User)
    postedDate = models.DateTimeField()
    title = models.CharField(max_length=250)
    content = models.TextField()
    url = models.CharField(max_length=250)
