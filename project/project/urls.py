from django.conf.urls import patterns, include, url
# from dajaxice.core import dajaxice_autodiscover, dajaxice_config
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# dajaxice_autodiscover()
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', 'app.views.index', name='index'),
	url(r'^get/(?P<type>[a-zA-Z0-9]+)/$', 'app.views.getMscs', name='getMscs'),
	# url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)

urlpatterns += staticfiles_urlpatterns()