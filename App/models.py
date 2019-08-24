from django.db import models

# Create your models here.
from django.db import models
import datetime

# Create your models here.

class User(models.Model): # 用户表
    username = models.CharField(max_length=30,unique=True) # 注册时的手机号或者登录时的姓名或者手机号
    password = models.CharField(max_length=20,null=True) # 密码
    phone = models.CharField(max_length=15,null=True) # 注册时的手机号
    email = models.CharField(max_length=20,null=True) # 邮箱
    grade = models.IntegerField(default=0) # 用户的积分
    relname = models.CharField(max_length=30,null=True) # 用户的真实姓名
    picture = models.CharField(max_length=100,null=True,default='/static/index/images/default.jpg') # 用户的头像

    class Meta:
        db_table = 'user'


class Category(models.Model): # 板块表
    bkname = models.CharField(max_length=30,null=True) # 板块的名字
    key = models.CharField(max_length=30,null=True) # 关键词1
    classid = models.IntegerField()
    picture = models.CharField(max_length=100,null=True) # 每个大板块多对应的大图片
    class Meta:
        db_table = 'category'


#菜单表
class Section(models.Model):
    id = models.AutoField(primary_key=True)
    sectname = models.CharField(max_length=50) #板块名
    rid = models.IntegerField(default=0)  #区分大小版块

    class Meta:
        db_table = 'section'


# 管理员表
class Administrator(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=128)
    heads = models.ImageField(upload_to='photo', verbose_name='头像',null=True)  # 头像

    class Meta:
        db_table = 'administrator'


class Goods(models.Model): # 商品表
    bkid = models.IntegerField() # 商品的板块id(这个id也可以确定商品的类型)
    number = models.CharField(max_length=20,null=True) # 商品的编号，每一件商品都应该有
    gname = models.CharField(max_length=30,unique=True) # 商品名
    serious = models.CharField(max_length=20,null=True) # 商品系列 T6系列
    description = models.CharField(max_length=50,null=True) # 该商品的具体描述
    addtime = models.DateField(null=True) # 商品上架的时间
    count = models.CharField(max_length=6) # 商品的库存，我们只分1是有货，0是无货
    keywords = models.CharField(max_length=3) # 商品的关键词，比如1是新品上市，2是热销，3是促销
    price = models.IntegerField(null=True)
    ishot = models.IntegerField(null=True)
    class Meta:
        db_table = 'goods'


class Size(models.Model):
    bkid = models.IntegerField() # 板块id，从而确定商品的种类电视，从而确定商品的型号
    size = models.CharField(max_length=30,null=True) # 变频1.5,变频1,定频1,55T6国家三包
    class Meta:
        db_table = 'size'


class Pictures(models.Model):
    bkid = models.IntegerField() # 板块id，从而确定商品的种类电视，从而确定商品的型号
    number = models.CharField(max_length=20,null=True)
    path = models.CharField(max_length=100,null=True)
    isfirst = models.IntegerField()
    saled = models.CharField(max_length=50)
    class Meta:
        db_table = 'pictures'


class Favor(models.Model): # 优惠券表
    description = models.CharField(max_length=50,null=True) # 满6500减300（描述满减类型）
    value = models.IntegerField(null=True) # 减多少钱的数值
    addtime = models.DateField(null=True)
    endtime = models.DateField(null=True)
    isuse = models.IntegerField(null=True,default=1)
    class Meta:
        db_table = 'favor'

class Detail(models.Model):# 商品详情表（貌似没有用到）
    number = models.CharField(max_length=30,null=True)
    addtime = models.DateField(null=True)

    class Meta:
        db_table = 'mylist'


class Shopcar(models.Model): # 购物车表
    uid = models.CharField(max_length=20,null=True) # 用户的id
    gnumber = models.CharField(max_length=20,null=True) # 商品的编号
    addtime = models.DateField(null=True) # 添加到购物车的时间
    statue = models.IntegerField(null=True) # 商品当前的状态
    picture = models.CharField(max_length=100,null=True) #商品的图片
    title = models.CharField(max_length=30,null=True,default=0) # 商品的名字或者标题
    price = models.IntegerField(default=0) # 商品的价格
    counter = models.IntegerField(null=True) # 该商品加入购物车的数量
    class Meta:
        db_table = 'shopcar'



class Rgoods(models.Model): # 商品表
    bkid = models.IntegerField() # 商品的板块id(这个id也可以确定商品的类型)
    number = models.CharField(max_length=20,null=True) # 商品的编号，每一件商品都应该有
    gname = models.CharField(max_length=30,unique=True) # 商品名
    serious = models.CharField(max_length=20,null=True) # 商品系列 T6系列
    description = models.CharField(max_length=50,null=True) # 该商品的具体描述
    addtime = models.DateField(null=True) # 商品上架的时间
    count = models.CharField(max_length=6) # 商品的库存，我们只分1是有货，0是无货
    keywords = models.CharField(max_length=3) # 商品的关键词，比如1是新品上市，2是热销，3是促销
    price = models.IntegerField(null=True)
    ishot = models.IntegerField(null=True)
    class Meta:
        db_table = 'rgoods'





















































