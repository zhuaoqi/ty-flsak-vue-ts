
from Crypto.Cipher import AES
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


# 加密密码对比验证
def check_password_hash(password, password2):
	return password2 == password
	
class UserForm(Form):
    regex = r"[0-9a-zA-Z]{6,8}"


class AesCrypt():
	def __init__(self):
		kess = '12345678abcdefgh'
		iv = '1234567890123456'
		print(self, flush=True)
		model = {'ECB': AES.MODE_ECB, 'CBC': AES.MODE_CBC}['CBC']
		self.key = self.add_16(kess)
		self.iv = iv.encode()
		if model == 'ECB':
				self.aes = AES.new(self.key, self.model)  # 创建aes对象
		elif model == 'CBC':
				self.aes = AES.new(self.key, self.model, self.iv)  # 创建aes对象

	def add_16(self, par):
		# python3字符串是unicode编码，需要 encode才可以转换成字节型数据
			par = par.encode('utf-8')
			while len(par) % 16 != 0:
					par += b'\x00'
			return par

	# 加密密码
	def encryptUtil(self, text):
		obj = AES.new(self.key, AES.MODE_CBC, self.iv)
		data_jiami = obj.encrypt(self.add_16(text))
		print(data_jiami, flush=True)
		return 'data_jiami'
		
	def aesdecrypt(self, text):
			# CBC解密需要重新创建一个aes对象
			if self.model == AES.MODE_CBC:
					self.aes = AES.new(self.key, self.model, self.iv)
			text = base64.decodebytes(text.encode('utf-8'))
			self.decrypt_text = self.aes.decrypt(text)
			return self.decrypt_text.decode('utf-8').strip('\0')
