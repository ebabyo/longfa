from email.mime import image

from django.contrib.messages.storage import session
from django.core.paginator import Paginator
from django.http import HttpResponse, request
from django.shortcuts import render, redirect
# 分页
from adm.forms import GoodsForm ,UserForm
from adm.page import page_list

# Create your views here.
from django.urls import reverse

from App.models import *
# from adm.verification import VerifyCode

# 登录
from mytcl.settings import COUNTOFPAGE, PAGERANGE


def login(request):
    if request.method == 'POST':
        username = request.POST.get('admins')
        password = request.POST.get('password')
        print(username,password)

        # print(yzm)
        user = Administrator.objects.filter(username=username).all()
        print(user)
        # print(user,'------------------')
        # print(user.password,'+++++++++++')
        if user:
            if user[0].password == password:
                # if yzm == True:
                    request.session['username'] = username
                    return redirect(reverse('adm:index'))
                # else:
                #     return render(request, 'login_admin.html', context={
                #         'error2': "yzm输入错误"})
            else:
                return render(request, 'login_admin.html', context={
                    'error':"密码输入错误!!!"
                })
        else:
            return render(request, 'login_admin.html', context={
                'error1':'用户名不存在!!!'
            })
    return render(request, 'login_admin.html')
# 退出
def logout(request):
    request.session.clear()
    return render(request, 'login_admin.html')


def index(request):
    big = Section.objects.filter(rid=0)
    small = Section.objects.filter(rid__gt=0)
    return render(request, 'index_admin.html', locals())


# # 验证码
# def yzm(request):
#     vc = VerifyCode()
#     data = vc.output()
#     response = HttpResponse()
#     response.write(data)
#     response['Content-Type'] = 'image/png'
#     return response

# 父模板
def base(request):
    big = Section.objects.filter(rid=0)
    small = Section.objects.filter(rid__gt=0)
    return render(request,'common/base.html',locals())



def sec(request,sid,page='1'):
    big = Section.objects.filter(rid=0)
    small = Section.objects.filter(rid__gt=0)
    user = User.objects.all()
    shop = Goods.objects.all()
    rshop = Rgoods.objects.all()
    pictures = Pictures.objects.filter(isfirst=1).all()

    sid = int(sid)
    if sid == 6:
        data = user
        page = page_list(data,page)
        pager = page[0]
        return render(request, 'user_list.html',locals())
    elif sid == 7:
        return render(request, 'user_detail.html', locals())
    elif sid == 8:
        data = shop
        page = page_list(data, page)
        pager = page[0]
        return render(request, 'product_list.html',locals())
    elif sid == 9:
        goods = Goods.objects.get(id=page)
        print(goods)
        print('-----------------')
        if request.method == 'GET':
            print('fffffffffffff')
            form = GoodsForm()
            return render(request, 'product_detaila.html', locals())
        else:
            form1 = GoodsForm(request.POST)
            if form1.is_valid():
                print('==================')
                gname = form1.cleaned_data.get('gname')
                number = form1.cleaned_data.get('number')
                # addtime = form1.cleaned_data.get('addtime')
                count = form1.cleaned_data.get('count')
                serious = form1.cleaned_data.get('serious')
                # keywords = models.CharField(max_length=3) # 商品的关键词，比如1是新品上市，2是热销，3是促销
                description = form1.cleaned_data.get('content')
                # issale = form1.cleaned_data.get('issale')
                # ishot = form1.cleaned_data.get('ishot')
                # isnew = form1.cleaned_data.get('isnew')
                price = form1.cleaned_data.get('price')
                m = len(Goods.objects.all())
                print('jgjgfgggggggg')
                if page == 0:
                    print('oooooooooooooooooooo')

                else:
                    g1=Goods.objects.get(id=page)
                    g1.gname = gname
                    g1.number = number
                    g1.serious = serious
                    g1.count = count
                    g1.price = price
                    # g1.isnew = isnew
                    # g1.ishot = ishot
                    # g1.issale = issale
                    # g1.description = description

                    g1.save()
                if m//10 ==0:
                    m=m-1
                return redirect(reverse('adm:sec',args=(8,1)))
        return render(request, 'product_detaila.html', locals())
    elif sid == 10:
        data = rshop
        page = page_list(data, page)
        pager = page[0]

        return render(request,'recycle_bin.html',locals())
    elif sid == 13:
        data = shop
        page = page_list(data, page)
        pager = page[0]
        return render(request,'express_list.html',locals())
    else:
        data = shop
        page = page_list(data, page)
        pager = page[0]
        return render(request, 'pay_list.html', locals())




def addg(request,gid):
    gid = int(gid)
    a = len(Goods.objects.all())
    if gid == 0:
        Goods.objects.create(bkid=a+1,gname=a+1,price=1,ishot=1)

        return redirect(reverse('adm:sec', args=(8,a//10+1)))
    else:
        g1 = Goods.objects.get(id=gid)

        Rgoods.objects.create(id=g1.id,bkid=g1.bkid,gname=g1.gname,number=g1.number,serious=g1.serious,description=g1.description,addtime=g1.addtime,count=g1.count,price=g1.price)
        g1.delete()
        b = len(Goods.objects.all())
        if b//10==0:
            b=b-1
        return redirect(reverse('adm:sec',args=(8,a//10+1)))

def raddg(request,rid,bid):
    rid=int(rid)
    print(rid)
    if rid == 1:
        g2=Rgoods.objects.get(id=bid)
        Goods.objects.create(id=g2.id,bkid=g2.bkid,gname=g2.gname,number=g2.number,serious=g2.serious,description=g2.description,addtime=g2.addtime,count=g2.count,price=g2.price)
        g2.delete()
        b = len(Rgoods.objects.all())
        if b//10==0:
            b = b -1
        return redirect(reverse('adm:sec',args=(10,b//10+1)))
    else:
        print('-------------')
        g2 = Rgoods.objects.get(id=bid)
        g2.delete()
        b = len(Rgoods.objects.all())
        if b//10==0:
            b = b -1
        return redirect(reverse('adm:sec', args=(10, b//10 +1)))