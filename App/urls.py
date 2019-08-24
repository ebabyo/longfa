from django.conf.urls import url, include
from django.contrib import admin

from App import views

urlpatterns = [
  url(r'^index/$',views.index,name='index'),
  url(r'^register/$',views.register,name='register'),
  url(r'^login/$',views.login,name='login'),
  url(r'^logout/$',views.logout,name='logout'),
  url(r'^shopcar/$',views.shopcar,name='shopcar'),
  url(r'^goods/(\d+)/$',views.goods,name='goods'),
  url(r'^dingdan/$',views.dingdan,name='dingdan'),
  url(r'^duanxin/$',views.duanxin,name='duanxin'),
  url(r'^check_password/$',views.check_password,name='check_password'),
  url(r'^incar/$',views.incar,name='incar'),
  url(r'^pay/$',views.pay,name='pay'),
  url(r'^person/$',views.person,name='person'),
  url(r'^directbuy/$',views.directbuy,name='directbuy'),
  url(r'^deleteshopcar/$',views.deleteshopcar,name='deleteshopcar'),
  # url(r'^mine/$',views.ali_buy,name='mine'),
  url(r'^retrive/$',views.retrive,name='retrive')

]
