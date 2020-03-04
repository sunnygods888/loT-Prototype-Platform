from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    
    REQUIRED_FIELDS = []

    uuid        = models.UUIDField(default=uuid.uuid4, unique=True)
    token       = models.CharField(max_length=32)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

class DeviceList(models.Model):
    user     = models.ForeignKey(User, on_delete=models.CASCADE,)
    deviceType  = models.CharField(max_length=128)
    role        = models.CharField(max_length=128)
    fwVer       = models.CharField(max_length=128)
    appServerUrl = models.CharField(max_length=128)
    deviceRegin = models.CharField(max_length=128)
    deviceId    = models.CharField(max_length=40)
    deviceName  = models.CharField(max_length=128)
    deviceHwVer = models.CharField(max_length=50)
    alias       = models.CharField(max_length=128)
    deviceMac   = models.CharField(max_length=128)
    oemId       = models.CharField(max_length=128)
    deviceModel = models.CharField(max_length=128)
    hwId        = models.CharField(max_length=128)
    fwId        = models.CharField(max_length=128)
    isSameRegion = models.SmallIntegerField(default=1)
    status      = models.SmallIntegerField(default=0)
    current     = models.FloatField(max_length=15)
    voltage     = models.FloatField(max_length=15)
    power       = models.FloatField(max_length=15)
    total       = models.FloatField(max_length=15)