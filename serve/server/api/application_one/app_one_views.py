# 导入需要的包文件
from flask import Blueprint, request, jsonify, send_file, safe_join
from flask_restx import Api, Resource
import json
import base64
from ...config.exts import db
from ...models.utils import urltobase64
from ...dbs.models import User



"""
创建一个蓝图，相当于创建项目组成的一部分，主要是方便我们管理自己的项目；

比如你的项目由很多个子项目构成，那么把为每一个子项目创建一个蓝图来创建对应的接口，好过于
把所有的接口都放在同一个.py文件吧！

这里创建蓝图Blueprint类还有很多其他的参数可选，大家可以看Blueprint类的源码，里面介绍的很清晰，英文不好的童鞋
请自觉学习英文；
"""
app_one_api = Blueprint('app_one_api', __name__)
"""
初始化我们的蓝图，它的作用是把我们的蓝图当作装饰器，修饰我们的类以及方法，
使得我们可以创建一个类，然后在类下面写不同的请求方法，比如get方法用来接收get请求，
post方法用来接收post请求，对于不同的方法返回不同的内容，看起来好像增加了代码量，实际上
却更容易对项目进行管理；
"""
api_one = Api(app_one_api)


"""
建立路由  有了路由可以建立相应的网络请求链接  并且可以对同一个链接发送不同的请求  节省视图的创建；

这里就是上面我们所说的Api()这个类的作用，通过它创建路由装饰器，然后装饰我们的类，在类下面写不同的请求方法，在接收到不同的请求时，
这个装饰器会将不同的请求转接到对应的类下面的方法；

@staticmethod将类内的方法修饰为静态方法，可以外部直接调用，也可以由类生成的对象调用；

接口是项目的核心部分，通过这个技术栈，童鞋你就可以愉快地写接口代码了；

"""
@api_one.route('/')
class Wss(Resource):
	# 接收get请求
	@staticmethod
	def get():
		print('hello world')
		return 'hello world'

	# 接收post请求
	@staticmethod
	def post():
		json_data = request.json
		print(json_data)
		return 'hello world'

	# 接收put请求
	@staticmethod
	def put():
		print('hello world')
		return 'hello world'


@api_one.route('/sql')
class sql(Resource):
	@staticmethod
	def get():
		sql = "SELECT * FROM user"
		# 执行SQL语句
		try:
			User.execute_sql(sql)
			results = User.get_data()
			jsonArr = []
			for item in range(len(results)):
				 jsonArr.append({
					'user_name': results[item][1],
					'password': results[item][2],
					'token': results[item][3],
					'name': results[item][4],
				})

			return jsonify({ 'status': 0, 'data': jsonArr })
		except:
			print ("Error: unable to fetch data")
			# 获取所有记录列表
			return { 'status': 0, 'msg': "Error: unable to fetch data"}

@api_one.route('/imgBase64')
class imgBase64(Resource):
	@staticmethod
	def get():
		try:
			results = urltobase64('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603693883&di=b627316bfa8350ccda04160d025dcc92&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg')
			return results
		except ValueError:
			print(ValueError)
			return 'error!!!'

	@staticmethod
	def post():
		try:
			results = urltobase64(
				'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1603693883&di=b627316bfa8350ccda04160d025dcc92&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg')
			return results
		except ValueError:
			print(ValueError)
			return 'error!!!'


@api_one.route('/testImg')
class testImg(Resource):
	@staticmethod
	def get():
		return '54515488'

@api_one.route('/createAll')
class createAll(Resource):
	@staticmethod
	def get():
		db.create_all()
		return '创建成功！！'


@api_one.route('/drop_all')
class drop_all(Resource):
	@staticmethod
	def get():
		db.drop_all()
		return '删除成功！！'
