from django.conf.urls import patterns, include, url
# from dajaxice.core import dajaxice_autodiscover, dajaxice_config
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
import settings

# dajaxice_autodiscover()
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'app.views.index', name='index'),
	url(r'^get/(?P<type>[a-zA-Z0-9]+)/$', 'app.views.getMscs', name='getMscs'),
	url(r'^getSearchForm/$', 'app.views.getSearchForm', name='getSearchForm'),
	url(r'^getMSC/(?P<x>[0-9_@\+\-\.]+)/(?P<y>[0-9_@\+\-\.]+)/(?P<z>[0-9_@\+\-\.]+)$', 'app.views.getMSC', name='getMSC'),
	url(r'^search/(?P<term>[\w|\W]+)/(?P<z>[0-9_@\+\-\.]+)/(?P<name>[\d]+)?$', 'app.views.search', name='search'),
	url(r'^search$', 'app.views.get_search', name='get_search'),
	url(r'^generalSearch$', 'app.views.generalSearch', name='generalSearch'),
	url(r'^getWay/(?P<term>[\w|\W]+)/(?P<z>[0-9_@\+\-\.]+)/$', 'app.views.getWay', name='getWay'),
	url(r'^searchAuthor/(?P<term>[\w|\W]+)/$', 'app.views.searchAuthor', name='searchAuthor'),
	url(r'^searchAuthorTimeline/(?P<term>[\w|\W]+)/$', 'app.views.searchAuthorTimeline', name='searchAuthorTimeline'),
	url(r'^getRusinClasses$', 'app.views.getRusinClasses', name='getRusinClasses'),
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)

urlpatterns += staticfiles_urlpatterns()