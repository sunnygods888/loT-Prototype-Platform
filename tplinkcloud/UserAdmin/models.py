from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    data_usage = models.FloatField(default=10.0)    # default: 10.0 MB
    pass
