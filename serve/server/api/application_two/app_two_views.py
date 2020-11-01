from logging import fatal
from flask import Blueprint, request, Flask, jsonify
from flask_restx import Api, Resource
from sqlalchemy.ext.declarative import base

from ...models.utils import UserForm, return_error, return_success, AesCrypt

app_two_api = Blueprint('app_two_api', __name__)
# 创建api接口 相当于一个独立的小型应用
api_two = Api(app_two_api)


# 建立路由  有了路由可以建立相应的网络请求链接  并且可以对同一个链接发送不同的请求  节省视图的创建
@api_two.route('/encryptUtil')
class Wss(Resource):
    # 接收get请求
    @staticmethod
    def get():
        password = request.args.get('pass')
        encrypt = AesCrypt().aesdecrypt(text=password)

        return encrypt


@api_two.route('/decode')
class Wss(Resource):
    # 接收get请求
    @staticmethod
    def get():
        password = request.args.get('pass')
        try:
            encrypt = AesCrypt().aesdecrypt(text=password)
            return encrypt
       	except:
            return False
    
@api_two.route('/adda')
class aad(Resource):
    # 接收get请求
    @staticmethod
    def get():
        print('wwd')
        json_dict = {'id': 10, 'title': 'flask的应用', 'content': 'flask的json'}
        return jsonify(json_dict)

if __name__ == '__main__':
    import requests
    import json
    res_one = requests.get('http://127.0.0.1:5000/')
    res_two = requests.post('http://127.0.0.1:5000/', json=json.dumps({"a": "1"}))
    res_three = requests.put('http://127.0.0.1:5000/')
    print(res_one)
    print(res_two)
    print(res_three)

