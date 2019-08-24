from django.conf.urls import url

from adm import views

urlpatterns = [
    url(r'^login/$',views.login,name='login'),
    url(r'^$',views.index,name='index'),
    # url(r'^code/$',views.yzm,name='code'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^sec/(?P<sid>\d+)/(?P<page>\d+)/$',views.sec,name='sec'),
    url(r'^addg/(?P<gid>\d+)/$',views.addg,name='addg'),
    # url(r'^delg/$',views.delg,name='delg'),
    url(r'^raddg/(?P<rid>\d+)/(?P<bid>\d+)$',views.raddg,name='raddg'),
]