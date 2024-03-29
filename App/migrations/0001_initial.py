# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-08-23 11:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=128)),
                ('heads', models.ImageField(null=True, upload_to='photo', verbose_name='头像')),
            ],
            options={
                'db_table': 'administrator',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bkname', models.CharField(max_length=30, null=True)),
                ('key', models.CharField(max_length=30, null=True)),
                ('classid', models.IntegerField()),
                ('picture', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=30, null=True)),
                ('addtime', models.DateField(null=True)),
            ],
            options={
                'db_table': 'mylist',
            },
        ),
        migrations.CreateModel(
            name='Favor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=50, null=True)),
                ('value', models.IntegerField(null=True)),
                ('addtime', models.DateField(null=True)),
                ('endtime', models.DateField(null=True)),
                ('isuse', models.IntegerField(default=1, null=True)),
            ],
            options={
                'db_table': 'favor',
            },
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bkid', models.IntegerField()),
                ('number', models.CharField(max_length=20, null=True)),
                ('gname', models.CharField(max_length=30, unique=True)),
                ('serious', models.CharField(max_length=20, null=True)),
                ('description', models.CharField(max_length=50, null=True)),
                ('addtime', models.DateField(null=True)),
                ('count', models.CharField(max_length=6)),
                ('keywords', models.CharField(max_length=3)),
                ('price', models.IntegerField(null=True)),
                ('ishot', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'goods',
            },
        ),
        migrations.CreateModel(
            name='Pictures',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bkid', models.IntegerField()),
                ('number', models.CharField(max_length=20, null=True)),
                ('path', models.CharField(max_length=100, null=True)),
                ('isfirst', models.IntegerField()),
                ('saled', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'pictures',
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sectname', models.CharField(max_length=50)),
                ('rid', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'section',
            },
        ),
        migrations.CreateModel(
            name='Shopcar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=20, null=True)),
                ('gnumber', models.CharField(max_length=20, null=True)),
                ('addtime', models.DateField(null=True)),
                ('statue', models.IntegerField(null=True)),
                ('picture', models.CharField(max_length=100, null=True)),
                ('title', models.CharField(default=0, max_length=30, null=True)),
                ('price', models.IntegerField(default=0)),
                ('counter', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'shopcar',
            },
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bkid', models.IntegerField()),
                ('size', models.CharField(max_length=30, null=True)),
            ],
            options={
                'db_table': 'size',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=20, null=True)),
                ('phone', models.CharField(max_length=15, null=True)),
                ('email', models.CharField(max_length=20, null=True)),
                ('grade', models.IntegerField(default=0)),
                ('relname', models.CharField(max_length=30, null=True)),
                ('picture', models.CharField(default='/static/index/images/default.jpg', max_length=100, null=True)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]
