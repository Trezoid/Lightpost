from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^/?$', 'main.views.index'),
    url(r'^start/?$', 'main.views.start'),
    url(r'^fresh/?$', 'main.views.fresh'),
    url(r'^logout/?$', 'main.views.leave'),
    url(r'^save/?$', 'main.views.createPost'),
    url(r'^login/?$',  'django.contrib.auth.views.login',{'template_name': 'login.html'}),
    url(r'^u/(?P<user>(\w+|[-]^[/]))/(?P<t>(\S+))/edit/?$', 'main.views.editPost'),
    url(r'^u/(?P<user>(\w+|[-]^[/]))/(?P<t>(\S+))/?$', 'main.views.singlePost'),
    url(r'^u/(?P<user>(\w+|[-]))/?$', 'main.views.posts'),
    # url(r'^$', 'lightflight.views.home', name='home'),
    # url(r'^lightflight/', include('lightflight.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
