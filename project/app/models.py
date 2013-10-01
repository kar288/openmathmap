from django.db import models

class MSC(models.Model):
	main = models.BooleanField(default= True)
	name = models.CharField(max_length = 20)
	number = models.CharField(max_length = 100)
	second = models.ManyToManyField('self', related_name='msc_second', symmetrical=False)
