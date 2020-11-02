# -*- coding: utf-8 -*-
import re
import sys
import datetime
from ..models.utils import check_password_hash, AesCrypt
from ..config.exts import db

"""
以下表关系：
一个用户对应多篇文章（一对多）
一篇文章对应多个标签，一个标签对应多个文章（多对多）
"""
"""
一对一关系中，需要设置relationship中的uselist=Flase，其他数据库操作一样。
一对多关系中，外键设置在多的一方中，关系（relationship）可设置在任意一方。
多对多关系中，需建立关系表，设置 secondary=关系表
"""

# 用户表


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(50))
    create_time = db.Column(db.DateTime)
    password = db.Column(db.String(50))
    token = db.Column(db.String(50))

    def __init__(self, user_name, password, token):  # 类似与java中的构造器
        # self.id = id #不可更改
        self.create_time = datetime.datetime.now()
        self.user_name = user_name
        self.password = password
        self.token = token

    def checkUser(username): #检查用户是否存在
        return User.query.filter_by(user_name=username).first()

    def addUser(user):  # 检查用户是否存在
        try:
            db.session.add(user)
            db.session.commit()
            return True
        except:
            return '执行sql错误！'

    def set_password(password):  # 对明文密码进行加密，返回的是加密后的密码
        return AesCrypt.encryptUtil(text = password)

    def check_password(password):  # 检查密码，传入的是加密密码，会将明文密码进行加密后再进行比对
        # print(password, flush=True)
        password1 = AesCrypt.encryptUtil(text=password)
        return check_password_hash(password1, password)

    def change_password(self, password):  # 修改密码
        self.password = self.set_password(password)
        
article_tag_table = db.Table('article_tag',
                             db.Column('article_id', db.Integer, db.ForeignKey(
                                 'article.id'), primary_key=True),
                             db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True))
# 文章表
class Article(db.Model):
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    author = db.relationship("User", backref="articles")
    tags = db.relationship("Tag", secondary=article_tag_table, backref='tags')

# 标签表


class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
