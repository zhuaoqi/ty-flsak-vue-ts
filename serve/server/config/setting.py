# -*- coding: utf-8 -*-

HOST = 'localhost'
PORT = '3306'
DATABASE = 'vue_test'
USERNAME = 'zhuaoqi'
PASSWORD = 'admin'

DB_URI = "mysql+pymysql://{username}:{password}@{host}:{port}/{db}?charset=utf8".format(
    username=USERNAME, password=PASSWORD, host=HOST, port=PORT, db=DATABASE)

SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
