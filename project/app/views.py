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

def getSearchForm(request):
	template = loader.get_template('components/searchForm.html')
	reqContext = RequestContext(request, {})
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

	return HttpResponse(json.dumps({'centroids': 'good'}), content_type="application/json");

def searchAuthor(request, term):
	authors = Author.objects.all()

	for word in re.split("[, ;]", term.strip()):
		authors &= Author.objects.filter(name__icontains = word)

	result = {}

	for author in authors:
		result[author.name] = {}
		result[author.name]['yearsum'] = author.yearsum
		result[author.name]['count'] = author.count
		result[author.name]['largest'] = {}
		result[author.name]['largest']['cc'] = 0
		result[author.name]['largest']['count'] = 0

		for c in author.distribution.split('.')[:-1]:
			parts = c[1:].split(':')
			if len(c[1:]) == 0:
				continue;
			if int(parts[1]) > result[author.name]['largest']['count']:
				result[author.name]['largest']['count'] = int(parts[1])
				result[author.name]['largest']['cc'] = ord(c[0]) - 1

		number = str(result[author.name]['largest']['cc']) + '-XX'
		if len(number) == 4:
			number = "0" + number;

		polygons = MSCPolygon.objects.filter(name__contains = number)
		print number, polygons
		if len(polygons) > 0:
			polygon = polygons[0]

			centroid =  polygon.way.centroid
			centroid.transform(4326)
			result[author.name]['largest']['position'] = centroid.coords


		template = loader.get_template('components/authorPopup.html')
		name = author.name.split('.')

		name = name[1] + " " + name[0]
		reqContext = RequestContext(request, {'name': name, 'key': author.name})
		response_data = template.render(reqContext);
		result[author.name]['popup'] = response_data


	return HttpResponse(json.dumps(result), content_type="application/json");


def searchAuthorTimeline(request, term):	
	author = Author.objects.filter(name = term)

	if len(author) != 1:
		return HttpResponse(json.dumps({'error': True}), content_type="application/json");

	author = author[0]
	result = {}
	result = {}
	result['yearsum'] = author.yearsum
	result['count'] = author.count
	result['largest'] = {}
	result['largest']['cc'] = 0
	result['largest']['count'] = 0
	result['distribution'] = {}

	ways = set()
	for c in author.distribution.split('.')[:-1]:
		parts = c[1:].split(':')
		if len(c[1:]) == 0:
			continue;
	
		number = str(ord(c[0]) - 1) + '-XX'
		# number = str(ord(c[0])) + '-XX'
		if len(number) == 4:
			number = "0" + number;
		polygon = MSCPolygon.objects.filter(name__contains = number)
		if len(polygon) <= 0:
			continue

		if int(parts[1]) > result['largest']['count']:
			result['largest']['count'] = parts[1]
			result['largest']['cc'] = ord(c[0]) - 1

		result['distribution'][ord(c[0]) - 1] = [parts[0],parts[1]]

		polygon = polygon[0].way
		ways.add(polygon)
		polygon.transform(4326)

		result['distribution'][ord(c[0]) - 1].append(polygon.json)
		name = MSC.objects.filter(number__contains = number)
		if len(name) > 0:
			name = name[0].name
			result['distribution'][ord(c[0]) - 1].append(name)
		
		result['distribution'][ord(c[0]) - 1].append(polygon.json)

	number = str(result['largest']['cc']) + '-XX'
	if len(number) == 4:
		number = "0" + number;
	polygon = MSCPolygon.objects.filter(name__contains = number)[0]

	centroid =  polygon.way.centroid
	centroid.transform(4326)
	result['largest']['position'] = centroid.coords


	return HttpResponse(json.dumps(result), content_type="application/json");


def search(request, term, z, name = 1):
	name = int(float(name))
	mscs = MSC.objects.none()

	for word in re.split("[, ;]", term.strip()):
		mscs |= MSC.objects.filter(number__icontains = word).exclude(main = 3)
		if name == 1:
			mscs |= MSC.objects.filter(name__icontains = word).exclude(main = 3)

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

def getWay(request, term, z):
	mscs = MSC.objects.none()


	for word in re.split("[, ;]", term.strip()):
		mscs |= MSC.objects.filter(number__icontains = word).exclude(main = 3)
		mscs |= MSC.objects.filter(name__icontains = word).exclude(main = 3)

	ways = {}

	for msc in mscs:
		data = {}

		if float(z) <= 12 and not msc.main == 1:
			continue;
		elif float(z) > 12 and not msc.main == 2:
			continue;

		try:
			polygon = MSCPolygon.objects.filter(name__contains = msc.number)
			polygon = polygon[0]
			
			way = polygon.way
			way.transform(4326)

			data['way'] = way.json
			data['number'] = 'MSC' + msc.number
			data['name'] = msc.name
			data['planetmath'] = getPlanetmath(msc.number)
			data['zentralblatt'] = getZentralblatt(msc.number)
			ways[msc.number] = data;
		except:
			print 'bad', msc.number

	return HttpResponse(json.dumps(ways), content_type="application/json");