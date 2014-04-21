from django.db import models
from django.contrib.gis.db import models

FIRST = 1;
SECOND = 2;
THIRD = 3;
LEVEL = (
	(FIRST, 'Main'),
	(SECOND, 'Second level'),
	(THIRD, 'Third Level'),
)


class MSC(models.Model):
	main = models.IntegerField(choices = LEVEL, default = FIRST)
	name = models.CharField(max_length = 200)
	number = models.CharField(max_length = 10)
	child = models.ManyToManyField('self', related_name='parent', symmetrical=True)

class MSCPolygon(models.Model):
	osm_id = models.BigIntegerField(primary_key=True)
	way = models.GeometryField(blank=True,srid=900913) # This field type is a guess.
	name = models.CharField(max_length = 100);
	objects = models.GeoManager()

	def __unicode__(self):
		return str(self.name)

	class Meta:
		managed = False 
		db_table = "planet_osm_polygon"

class Author(models.Model):
	name = models.CharField(max_length = 300)

class Publication(models.Model):
	pid = models.IntegerField()
	py = models.IntegerField(null = True)
	# author = models.ManyToManyField(Author, related_name="publications", symmetrical = True)
	author = models.CharField(max_length = 1000)
	title = models.CharField(max_length = 1000)
	classes = models.ManyToManyField(MSC, related_name="publications")