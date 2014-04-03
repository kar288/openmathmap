# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
#from elementtree.ElementTree import parse

import os

import json
from django.template import loader, RequestContext
from django.http import HttpResponse, Http404

from app.models import *

from django.contrib.gis.geos import *

import string
import re

from django.db import transaction


def index(request):
	return render(request, "index.html", {})
	
def getMscs(request, type):
	mscs = MSC.objects.filter(main = True);

	context = {'mscs': mscs};

	template = loader.get_template('components/menu.html')
	reqContext = RequestContext(request, context)
	response_data = template.render(reqContext);

	return HttpResponse(json.dumps({'html': response_data}), content_type="application/json");


def getMSC(request, x, y, z):
	data = {}
	number = ''
	polygons = MSCPolygon.objects.filter(way__contains = Point(float(x), float(y)));

	if not polygons:
		return HttpResponse(json.dumps({'water': True}), content_type="application/json");

	if float(z) <= 12:
		polygons = polygons.filter(name__contains = 'XX');
	else:
		polygons = polygons.filter(name__contains = 'xx');
	
	if len(polygons) == 1:
		number = polygons[0].name[3:]
	else:	
		for first in polygons:
			rest = polygons.exclude(name = first.name)
			contained = rest.filter(way__contains_properly = first.way)
			similarName = rest.filter(name__contains = first.name[:-2])
			if contained and not similarName:
				number = first.name[3:]
	data['name'] = MSC.objects.get(number = number).name

	data['number'] = 'MSC' + number
	data['planetmath'] = getPlanetmath(number)
	data['zentralblatt'] = getZentralblatt(number)

	data['html'] = 'success'
	return HttpResponse(json.dumps(data), content_type="application/json");

def getPlanetmath(number):
	return "http://planetmath.org/msc_browser/" + number;

def getZentralblatt(number):
	return "http://www.zentralblatt-math.org/msc/en/search/?pa=" + string.replace(number, "-XX","");

def get_search (request):
	articles = json.loads(request.GET['c'])
	classes = set()
	for article in articles:
		for c in re.split(" ", article['number']):
			classes.add(c)

	# print classes
	return HttpResponse(json.dumps({'centroids': 'good'}), content_type="application/json");

@transaction.atomic
def search(request, term, z, name = 1):
	name = int(float(name))
	mscs = MSC.objects.none()
	print 'start', name, term, 'a', term[-1], 'a'


	for word in re.split("[, ;]", term.strip()):
		mscs |= MSC.objects.filter(number__icontains = word).exclude(main = 3)
		if name == 1:
			mscs |= MSC.objects.filter(name__icontains = word).exclude(main = 3)

	print len(mscs), mscs
	centroids = {}

	a = 0
	for msc in mscs:
		data = {}

		if float(z) <= 12 and not msc.main == 1:
			continue;
		elif float(z) > 12 and not msc.main == 2:
			continue;

		try:
			polygon = MSCPolygon.objects.filter(name__contains = msc.number)
			polygon = polygon[0]
			
			centroid = polygon.way.centroid
			centroid.transform(4326)

			data['position'] = centroid.coords
			data['number'] = 'MSC' + msc.number
			data['name'] = msc.name
			data['planetmath'] = getPlanetmath(msc.number)
			data['zentralblatt'] = getZentralblatt(msc.number)
			centroids[msc.number] = data;
		except:
			print 'bad', msc.number


	return HttpResponse(json.dumps(centroids), content_type="application/json");