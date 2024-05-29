from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Tasks(models.Model):
    user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    activityname=models.CharField(max_length=150)
    image=models.ImageField(null=True, blank=True)
    tasklocation=models.CharField(max_length=100, null=True, blank=True)
    volunteersrequired=models.CharField(max_length=100, null=True, blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.activityname
