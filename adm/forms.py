
# 自定义表单
import re

from django import forms
from django.core.exceptions import ValidationError


def check_password(password):
    if re.match(r'\d+$',password):
        raise ValidationError('密码不能是纯数字')

class UserForm(forms.Form):
    username = forms.CharField(max_length=10,
                               # label_suffix=':',
                               min_length=3,
                               widget=forms.TextInput(attrs={
                                   'placehold':'请输入用户名',
                                   'class':'text'
                               }),
                               error_messages={
                                   'required':'用户名必须输入',
                                   'max_length':'用户名最大10字符',
                                   'min_length':'用户名最少3字符'
                               })
#
    password = forms.CharField(max_length='20',
                                    min_length=3,
                                    widget=forms.PasswordInput(attrs={
                                        'placehold':'请输入密码',
                                        'class':'password'
                                    }),
                                    error_messages={
                                        'required': '密码必须输入',
                                        'max_length': '密码最大20字符',
                                        'min_length': '密码最少3个字符'
                                    },
                                    validators=[check_password]
                                    )
    phone = forms.CharField( min_length=11, max_length=11,
                            error_messages={
                                'required': '手机号必须输入',
                                'max_length': '手机号长度必须是11位',
                                'min_length': '手机号长度必须是11位'
                            })

    email = forms.CharField( min_length=11, max_length=11,
                            error_messages={
                                'required': '手机号必须输入',
                                'max_length': '手机号长度必须是11位',
                                'min_length': '手机号长度必须是11位'
                            })
    # 自定义验证字段
    # 方法名规则： clean_字段名
    def clean_phone(self):
        # 必须使用cleaned_data获取数据
        value = self.cleaned_data.get('phone')
        if re.match(r'1[3,5,6,7,8,9]\d{9}$', value):
            return value
        raise ValidationError("手机号码格式错误")


class GoodsForm(forms.Form):
    gname = forms.CharField(max_length=30,
                               min_length=3,
                               error_messages={
                                   'required':'商品名必须输入',
                                   'max_length':'商品名最大30字符',
                                   'min_length':'商品名最少3字符'
                               })
    number = forms.CharField(max_length=20,
                             min_length=3,
                             error_messages={
                                 'required':'商品编号必须输入',
                                 'max_length':'商品编号最大20字符',
                                 'min_length':'商品编号最少3字符'
                                             })

    serious = forms.CharField(max_length=20,
                             min_length=2,
                             error_messages={
                                 'required': '商品系列必须输入',
                                 'max_length': '商品系列最大20字符',
                                 'min_length': '商品系列最少2字符'
                             })
    price = forms.IntegerField(error_messages={
                                 'required': '单价必须输入',
                             })
    count = forms.IntegerField(error_messages={
                                   'required': '库存必须输入',
                                   })
    # content = forms.CharField(max_length=300,
    #                            min_length=3,
    #                            error_messages={
    #                                'required':'商品名必须输入',
    #                                'max_length':'商品名最大30字符',
    #                                'min_length':'商品名最少3字符'
    #                            })
    # issale = forms.BooleanField()
    # ishot = forms.BooleanField()
    # ifnew = forms.BooleanField()

