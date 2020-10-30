# -*- coding: utf-8 -*-
from flask import Flask
from ..config import setting
from ..config.exts import db
from ..dbs import models

# 导入蓝图
from ..api.application_one.app_one_views import app_one_api
from ..api.application_two.app_two_views import app_two_api
from ..api.application_login.app_login_views import app_login_api

api_server = Flask(__name__)
# 加载配置文件
api_server.config.from_object(setting)
# db绑定app
db.init_app(api_server)

api_server.register_blueprint(app_one_api, url_prefix= '/api/v1.0')
api_server.register_blueprint(app_two_api, url_prefix='/api/v1.0')
api_server.register_blueprint(app_login_api, url_prefix='/api/v1.0')

api_server.config['JSON_AS_ASCII'] = False
api_server.secret_key = '!@#$%^&*()11'


@api_server.before_first_request
def init_db():
    db.create_all()

    
# if __name__ == '__main__':
#     api_server.run(host='0.0.0.0', port=5000, debug=True)
