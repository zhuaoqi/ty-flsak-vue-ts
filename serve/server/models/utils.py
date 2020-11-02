# -*- coding: utf-8 -*-
from Crypto.Cipher import AES
import io
import base64
from flask import jsonify
import requests as req
from flask_wtf import FlaskForm as Form


def return_success(status = 0, msg='', data= None):
	return jsonify({'status': status, 'data':  data or msg })

codes = {
	'21': '用户已经注册！',
	'22': '账号密码错误！',
	'20': '错误'
}


def return_error(status=20, msg=''):
	return jsonify({'status': status, 'msg': msg or codes['20']})

def urltobase64(url):
	# 图片保存在内存
	response = req.get(url)
	# 得到图片的base64编码
	ls_f = response.content
	# 将base64编码进行解码
	imgdata = base64.b64encode(ls_f).decode()
	return imgdata


# 加密密码对比验证
def check_password_hash(password, password2):
	try:
		return AesCrypt().aesdecrypt(text=password) == password2
	except:
		return False

# 解秘密码
def decode_password(password):
	try:
		return AesCrypt().aesdecrypt(text=password)
	except:
		return False
	
class UserForm(Form):
    regex = r"[0-9a-zA-Z]{6,8}"


class AesCrypt():
	def __init__(self):
		self.model = AES.MODE_CBC
		self.key = self.add_16('12345678abcdefgh')
		self.iv = '1234567890123456'.encode()
		self.aes = AES.new(self.key, self.model, self.iv)  # 创建aes对象
			
	def add_16(self,par):
		# python3字符串是unicode编码，需要 encode才可以转换成字节型数据
		par = par.encode('utf-8')
		while len(par) % 16 != 0:
				par += b'\x00'
		return par

	def aesdecrypt(self, text):
		# CBC解密需要重新创建一个aes对象
		self.aes = AES.new(self.key, self.model, self.iv)
		text = base64.decodebytes(text.encode('utf-8'))
		self.decrypt_text = self.aes.decrypt(text)
		return self.decrypt_text.decode('utf-8').strip('\0')
