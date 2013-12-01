# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
#from elementtree.ElementTree import parse

from django.utils import simplejson
# from dajaxice.decorators import dajaxice_register
# from dajax.core import Dajax
import os

from app.models import *

def index(request):
	# print os.listdir("app/static")
	# file = open("app/static/msc-medium.xml", "r")
	# tree = parse(file)
	# elem = tree.getroot()
	# for child in elem:
	# 	msc = MSC.objects.create(name= child.find('name').text, number = child.find('number').text)
	# 	msc.save()
	# 	for second in child:
	# 		if not second.find('name') == None:
	# 			next = MSC.objects.create(name = second.find('name').text, number = second.find('number').text, main = False)
	# 			next.save()
	# 			msc.second.add(next)
	# 			msc.save()
	mscs = MSC.objects.filter(main = True)
	return render(request, "index.html", {'mscs': mscs})
	
# @dajaxice_register
def getPosition(request, term):
	print term
	# result = "AAAA"
	# dajax = Dajax()
	# dajax.assign('.msc-search','value',str(result))
	# return dajax.json()
