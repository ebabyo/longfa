import re
from random import randint

import alipay
from alipay import AliPay
from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response

from App.sms import send_sms


from mytcl.settings import SMSCONFIG, ALI_APP_ID, APP_PRIVATE_KEY,ALIPAY_PBULIC_KEY
from App.models import *

# Create your views here.
def index(request):
    title = Category.objects.all()
    size = Size.objects.all()
    goods = Goods.objects.all()
    pashs = Pictures.objects.all()

    title2 = Category.objects.filter(classid=2).first()
    obj1 = Goods.objects.filter(bkid=2).all()
    pic1 = Pictures.objects.filter(bkid=2).all()
    username = request.session.get('username')
    gds = Shopcar.objects.filter(uid=username).all()
    length = len(gds)
    print(goods,'!@#$%^&*()')
    print(pashs,')(*&^%$#@!')
    return render(request,'index.html',context={
        'title':title,
        'size':size,
        'goods':goods,
        'pashs':pashs,
        'obj1':obj1,
        'pic1':pic1,
        'title2':title2,
        'length':length,
    })


def register(request):
    phone = request.session.get('telephone')
    duanxin = request.POST.get('duanxin')
    print(phone,duanxin,'%%%%%%%%')
    if request.method == 'POST':
        if duanxin == request.session.get('duanxin'):
            request.session['username'] = phone
            return render(request,'register.html',context={
                'show':'block',
                'dsp':'None',

            })
        else:
            return render(request,'register.html',context={
                'errormessage':'短信验证错误',
                'show':'none',
                'dsp':'none'
            })
    else:
        return render(request, 'register.html',context={
            'show':'none',
            'dsp':'None',
        })


def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(username, password)
    user = User.objects.filter(username=username).first()
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        if user:
            if username == user.username and password == user.password:
                request.session['username'] = username
                return redirect('/index')
            return render(request, 'login.html', context={
                'errormessage': '登录名或者密码错误'
            })
        else:
            return render(request, 'login.html',context={
                'errormessage':'用户不存在'
            })


def shopcar(request):
    # want = request.session.get('number')
    # print(want)
    # photo = Pictures.objects.filter(number=want).first()
    # goods = Goods.objects.filter(number=want).first()
    # return render(request,'shopcar.html',context={
    #     'goods':goods,
    #     'photo':photo,
    #
    # })

    goods = Shopcar.objects.all()
    length = len(goods)

    return render(request,'shopcar.html',context={
        'goods':goods,
        'length':length,
    })




def goods(request,cid):
    goods = Goods.objects.filter(number=cid).first()
    pictures = Pictures.objects.filter(number=cid).all()
    request.session['number'] = cid
    print(request.session.get('number'))
    favors = Favor.objects.all()
    print(favors)
    print('----------')
    print(request.POST.get('buyNum'))
    gds = Shopcar.objects.filter(uid=request.session.get('username')).all()
    length = len(gds)
    request.session['buyNum'] = request.POST.get('buyNum')
    return render(request,'goods.html',context={
        'goods':goods,
        'pictures':pictures,
        'favors':favors,
        'number':request.session.get('number'),
        'length':length,
    })


def dingdan(request):
    return render(request,'dingdan.html')


def duanxin(request):
    num = str(randint(1000, 9999))
    print(num)
    request.session['duanxin'] = num
    telephone = request.POST['phone']
    request.session['telephone'] =telephone
    print(telephone)
    print(request.session.get('duanxin'))
    res = re.match(r'^1[35678]\d{9}$',telephone)
    if res:
        send_sms(request.POST['phone'], {'code': num}, **SMSCONFIG)
        return HttpResponse('已经将短信验证码发送到您的手机')
    else:
        return HttpResponse('您输入的手机号无效')



def logout(request):
    request.session.clear()
    return redirect('/index')


def check_password(request):
    password = request.POST.get('password')
    repassword = request.POST.get('repassword')
    phone = request.session.get('telephone')
    user = User.objects.filter(username=phone).first()
    print(password,repassword,'**********')
    if not user:
        if password != repassword:
            return render(request,'register.html',context={
                'dsp':'none',
                'errormessage':'两次输入的密码不一致'
            })
        if len(password) < 6 or len(password) > 13:
            return render(request,'register.html',context={
                'dsp':'none',
                'errormessage':'密码长度不符合要求'
            })

        else:
            if password == repassword:
                telephone = request.session.get('telephone')
                user = User()
                user.phone = telephone
                user.username = telephone
                user.password = password
                user.grade = 50
                user.save()
                return render(request,'register.html',context={
                    'dsp':'block',

                })
    else:
        request.session.clear()
        return render(request,'register.html',context={
            'show':'block',
            'dsp':'none',
            'errormessage':'该手机号已经注册过帐号'
        })


def incar(request):
    print(request.POST.get('phone'))
    want = request.session.get('number')
    goods = Goods.objects.filter(number=want).first()
    picture = Pictures.objects.filter(number=want,isfirst=1).first()
    gouwuche = Shopcar.objects.all()
    print('*********')
    print(request.POST.get('a'))
    a = []
    for i in gouwuche:
        a.append(i.gnumber)
    if want not in a:
        car = Shopcar()
        car.gnumber = want
        car.addtime = datetime.datetime.now()
        car.statue = 1
        car.picture = picture.path
        car.title = goods.gname
        car.price = goods.price
        car.uid = request.session.get('username')
        car.save()
        return HttpResponse('成功添加到购物车')
    else:
        return HttpResponse('已经加入到购物车')


def pay(request):
    number = request.POST.getlist('a')
    print(number)
    length = len(number)
    goods = Goods.objects.filter(number__in = number).all()
    gds = Shopcar.objects.filter(uid=request.session.get('username')).all()
    bee = Shopcar.objects.filter(gnumber__in = number,uid=request.session.get('username')).all()
    length = len(gds)
    pictures = Pictures.objects.filter(number__in=number).all().filter(isfirst=1).all()
    print(goods)
    print(bee,'^^^^^^^')
    money = 0
    for i in bee:
        i.counter = request.POST.get(str(i.gnumber))
        money += int(i.counter) * int(i.price)
        i.save()
        # a.append(request.POST.get(str(i.gnumber)))
    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PBULIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=True  # 默认False
    )

    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no="2019061900100",
        total_amount=money - 700,
        subject="Movie",
        return_url="http://localhost:8000",
        # notify_url="http://localhost:8000/mine/index"  # 可选, 不填则使用默认notify url
    )
    print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"
    url = net + order_string
    data = {
        "msg": "ok",
        "status": 200,
        "data": {
            "pay_url": net + order_string
        }
    }
    return render(request,'付款.html',context={
        'totalmoney':money,
        'yunfei':0,
        'youhuiquan':200,
        'jifen':0,
        'goods':goods,
        'pictures':pictures,
        'length':length,
        'bee':bee,
        'url':url,

    })


def person(request):
    username = request.session.get('username')
    user = User.objects.filter(username=username).first()
    user_password = user.password
    goods = Shopcar.objects.filter(uid=username).all()
    if re.match(r'^((\d+)|([A-Za-z]+)|(\W+))$', user_password):
        return render(request, '个人中心.html', context={
            'user': user,
            'level': '弱',
            'length': len(goods),
        })
    elif re.match(r'([0-9]+(\W+|\_+|[A-Za-z]+))+|([A-Za-z]+(\W+|\_+|\d+))+|((\W+|\_+)+(\d+|\w+))+', user_password):
        return render(request, '个人中心.html', context={
            'user': user,
            'level': '中',
            'length': len(goods),
        })
    elif re.match(r'(\w+|\W+)+', user_password):
        return render(request, '个人中心.html', context={
            'user': user,
            'level': '强',
            'length': len(goods),
        })


def directbuy(request):
    print('----------')
    number = request.session.get('number')
    goods = Goods.objects.filter(number=number).first()
    pictures = Pictures.objects.filter(number=number,isfirst=1).first()
    number1 = request.POST.get('buyNum')
    print(number1)
    money = (int(number1) * int(goods.price) )
    # money = 4000
    print(money,type(money))
    lastmoney = int(money) - 500-200
    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PBULIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=True  # 默认False
    )

    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no="2019061900100",
        total_amount=money,
        subject="Movie",
        return_url="http://localhost:8000",
        # notify_url="http://localhost:8000/mine/index"  # 可选, 不填则使用默认notify url
    )
    print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"
    url = net + order_string
    data = {
        "msg": "ok",
        "status": 200,
        "data": {
            "pay_url": net + order_string
        }
    }
    return render(request,'directbuy.html',context={
        'goods':goods,
        'pictures':pictures,
        'geshu':number1,
        'money':lastmoney,
        'youhuiquan':200,
        'lastmoney':lastmoney,
        'yunfei':0,
        'url':url,

    })


def deleteshopcar(request):
    number = request.POST.get('value')
    nogoods = Shopcar.objects.filter(gnumber=number).first()
    nogoods.delete()
    goods = Shopcar.objects.all()
    print(number)
    length= len(goods)
    return render(request,'afterdelete.html',context={
        'goods':goods,
        'length':length,

    })



@api_view(["POST","GET"])
def ali_buy(request):
    # order_no = "2019082102983"

    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PBULIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=True  # 默认False
    )

    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no="2019061900100",
        total_amount=30,
        subject="Movie",
        return_url="http://localhost:8000",
        # notify_url="http://localhost:8000/mine/index"  # 可选, 不填则使用默认notify url
    )
    print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"
    url = net + order_string
    data = {
        "msg": "ok",
        "status": 200,
        "data": {
            "pay_url": net + order_string
        }
    }
    print(url)
    return Response(data)


def retrive(request):
    return render(request,'修改密码.html')