from hashlib import sha256

from django.db import models

# Create your models here.
# models.py

from djongo import models

class MedicalHistory(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.TextField()
    hash = models.CharField(max_length=64)

    def save(self, *args, **kwargs):
        self.hash = sha256(self.text.encode('utf-8')).hexdigest()
        super(MedicalHistory, self).save(*args, **kwargs)
