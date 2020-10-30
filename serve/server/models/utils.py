
import io
import base64
from flask import Flask, jsonify,  current_app, request
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import requests as req
from flask_wtf import FlaskForm as Form

def generate_token(api_users):
    expiration = 3600
    # expiration是过期时间
    s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({'id': api_users.id}).decode('ascii')
    return token, expiration


def return_success(res):
	return jsonify({'status': res.get('status') or 0, 'data':  res.get('data') or res.get('msg') or res})

codes = {
	'21': '用户已经注册！',
	'22': '账号密码错误！',
	'20': '错误'
}
def return_error(res):
	print(type(res), flush=True)
	return jsonify({'status': res.get('status') or 20, 'msg':  res.get('msg') or codes['20']})

def urltobase64(url):
	# 图片保存在内存
	response = req.get(url)
	# 得到图片的base64编码
	ls_f = response.content
	# 将base64编码进行解码
	imgdata = base64.b64encode(ls_f).decode()
	return imgdata

class UserForm(Form):
    regex = r"[0-9a-zA-Z]{6,8}"


     

