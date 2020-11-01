<template>
<div ref="particle" class="particle" style="width: 100%; height: 100%">
  <div v-if="pageStatus == 'login'" class="login">
    <div class="login_title">
      <span>管理员登录</span>
    </div>
    <div class="login_fields">
      <form ref="loginForm" @keyup.enter="onSubmit">
        <div class="login_fields__user">
          <div class="icon">
            <img alt="" src="@/assets/images/login/user_icon_copy.png">
          </div>
          <input name="username" placeholder="用户名" v-model="login.username" maxlength="16" class="username" type="text" autocomplete="off" value="admin">
          <div class="validation">
              <img alt="" src="@/assets/images/login//tick.png">
          </div>
        </div>
        <div class="login_fields__password">
            <div class="icon">
                <img alt="" src="@/assets/images/login//lock_icon_copy.png">
            </div>
            <input name="password" v-model="login.password" class="passwordNumder" type="password" placeholder="密码" maxlength="16" autocomplete="off">
            <div class="validation">
                <img alt="" src="@/assets/images/login//tick.png">
            </div>
        </div>
        <div class="login_fields__password">
            <div class="icon">
                <img alt="" src="@/assets/images/login//key.png">
            </div>
            <input name="code" v-model="login.code" placeholder="验证码" maxlength="4" class="ValidateNum" type="text" autocomplete="off">
            <div class="validation" style="opacity: 1; right: -5px;top: -3px;">
              <img v-if="imgCode" @click="getImgcode()" :src="imgCode" alt="验证码">
            </div>
        </div>
        <div class="login_fields__submit">
            <input type="button" @click="onSubmit" value="登录">
        </div>
      </form>
    </div>
    <div class="success">
    </div>
    <div class="disclaimer">
      <p>欢迎登陆接入平台</p>
      <el-button type="text" @click="pageStatus = 'register';getImgcode()">注册</el-button>
    </div>
  </div>
  <div v-if="pageStatus == 'register'" class="login">
    <div class="login_title">
      <span>用户注册</span>
    </div>
    <div class="login_fields">
      <form ref="registeForm" @keyup.enter="onRegister">
        <div class="login_fields__user">
          <div class="icon">
            <img alt="" src="@/assets/images/login/user_icon_copy.png">
          </div>
          <input type="text" style="display: none;" />
          <input placeholder="用户名" name="username" v-model="registe.username" maxlength="16" class="username" type="text" autocomplete="off" value="admin">
          <div class="validation">
              <img alt="" src="@/assets/images/login//tick.png">
          </div>
        </div>
        <div class="login_fields__password">
            <div class="icon">
                <img alt="" src="@/assets/images/login//lock_icon_copy.png">
            </div>
            <input v-model="registe.password" name="password" class="passwordNumder" type="password" placeholder="密码" maxlength="16" autocomplete="off">
            <div class="validation">
                <img alt="" src="@/assets/images/login//tick.png">
            </div>
        </div>
        <div class="login_fields__password">
            <div class="icon">
                <img alt="" src="@/assets/images/login//lock_icon_copy.png">
            </div>
            <input v-model="registe.cofimpassword"  class="passwordNumder" type="password" placeholder="确认密码" maxlength="16" autocomplete="off">
            <div class="validation">
                <img alt="" src="@/assets/images/login//tick.png">
            </div>
        </div>
        <div class="login_fields__password">
            <div class="icon">
                <img alt="" src="@/assets/images/login//key.png">
            </div>
            <input v-model="registe.code" name="code" placeholder="验证码" maxlength="4" class="ValidateNum" type="text" autocomplete="off">
            <div class="validation" style="opacity: 1; right: -5px;top: -3px;">
              <img v-if="imgCode" @click="getImgcode()" :src="imgCode" alt="验证码">
            </div>
        </div>
        <div class="login_fields__submit">
            <input type="button" @click="onRegister" value="注册">
        </div>
      </form>
    </div>
    <div class="success">
    </div>
    <div class="disclaimer">
      <p>欢迎注册接入平台</p>
      <el-button type="text" @click="pageStatus = 'login'; getImgcode()">登录</el-button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Particle from './js/index'
import Util from '../../lib/utils/utils';

interface loginInter {
  username: string
  password: string
  cofimpassword?: string
  code: string
}

@Component
export default class Live2d extends Vue {
  public $request!: any
  private login:loginInter = {
    username: '' ,
    password: '' ,
    code: '',
  }
  private registe:loginInter = {
    username: '' ,
    password: '' ,
    code: '',
  }
  private pageStatus:string= 'login'
 
  private ParticleData :any
  private imgCode: any= null
  private async created() {
    this.getImgcode()
  }
  private mounted() {
    const ref:any = this.$refs.particle
    this.ParticleData = new Particle(ref, {
      dotColor: '#E8DFE8',
      lineColor: '#1b3273',
      density: 8000,
      particleRadius: 5
    });
    
  }
  private async getImgcode() {
    let img = await this.$request.login.imgCode()
    this.imgCode =  window.URL.createObjectURL(img)
  }
  private onSubmit() {
    if(this.login.username == '' || this.login.password == '' || this.login.code == ''){
      this.$message({message: '请输入用户名密码或验证码！', type: 'error'})
      return false
    }
    let from = new FormData()
    from.append('username', this.login.username)
    from.append('password', Util.encryptUtil(this.login.password))
    from.append('code', this.login.code)
    
    this.$request.login.login(from).then((res: any) => {
      if(res.status == 0){
        this.$message({message: res.data || res.msg || res, type: 'success'})
      }else {
        this.getImgcode()
        this.$message({message: res.msg || res, type: 'error'})
      }
    })
    
  }
  private onRegister() {
    if(this.registe.username == '' || this.registe.password == '' || this.registe.cofimpassword == ''|| this.registe.code == ''){
      this.$message({message: '请输入用户名密码或验证码！', type: 'error'})
      return false
    }
    if(this.registe.password ===  this.registe.cofimpassword){
      
      let from = new FormData()
      from.append('username', this.registe.username)
      from.append('password', Util.encryptUtil(this.registe.password))
      from.append('code', this.registe.code)
      
      this.$request.login.register(from).then((res: any) => {
        if(res.status == 0){
          this.$message({message: res.data || res, type: 'success'})
        }else {
          this.getImgcode()
          this.$message({message: res.msg || res, type: 'error'})
        }
      })
    }else {
      this.$message({message: '密码不一致！', type: 'error'})
    }
  }
  private destroyed() {
    this.ParticleData.destroy()
    
  }
  
}
</script>
<style scoped>
input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition-delay: 99999s;
      -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
/*--end-responsive-design--*/
.particle {
  background-image: url('~@/assets/images/login/demo-1-bg.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  /* background-color: #242645; */
}

.authent {
  box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
  display: none;
  background: #35394a;
  /* Old browsers */
  /* FF3.6+ */

  /* Chrome10+,Safari5.1+ */
  /* Opera 11.10+ */
  /* IE10+ */
  background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
  /* IE6-9 fallback on horizontal gradient */
  position: absolute;
  left: 0;
  right: 0px;
  margin: auto;
  width: 400px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  padding: 20px 70px;
  top: 100px;
  bottom: 0;
  height: 300px;
  opacity: 0;
}
.authent p {
   font-size: 30px;
  text-align: center;
  color: white;
}
.success {
  display: none;
  color: #d5d8e2;
}
.success p {
  font-size: 14px;
}
p {
  color: #D3D7F7;
  font-size: 14px;
  text-align: left;
}
.testtwo {
  left: -320px !important;
}
.test {
  box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
  pointer-events: none;
  top: -100px !important;
  -webkit-transform: rotateX(70deg) scale(0.8) !important;
          transform: rotateX(70deg) scale(0.8) !important;
  opacity: .6 !important;
  -webkit-filter: blur(1px);
          filter: blur(1px);
}
.login 
{
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  top: 20px;
  -webkit-transition-property: -webkit-transform,opacity,box-shadow,top,left;
          transition-property: transform,opacity,box-shadow,top,left;
  -webkit-transition-duration: .5s;
          transition-duration: .5s;
  -webkit-transform-origin: 161px 100%;
      -ms-transform-origin: 161px 100%;
          transform-origin: 161px 100%;
  -webkit-transform: rotateX(0deg);
          transform: rotateX(0deg);
  position: relative;
  width: 300px;
  /*border-top: 2px solid #D8312A;*/
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  padding: 100px 40px 40px 40px;
  background: #35394a;
  background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #35394a), color-stop(100%, rgb(0, 0, 0)));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
  background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
  /* IE6-9 fallback on horizontal gradient */
}
.login .validation {
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 14px;
  opacity: 0;
}
.validation img {
  width: 100px;
  cursor: pointer;
  border-radius: 3px;
}
.login .disclaimer {
  margin-top: 95px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login_title {
  color: #D3D7F7;
  height: 60px;
  text-align: left;
  font-size: 20px;
}
.login_fields {
  margin-top: 10px;
  height: 208px;
}
.login_fields .icon {
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 12px;
  opacity: .5;
}
.login_fields input[type='password'],.login_fields input[type='text'] {
  color: #61BFFF !important;
}
.login_fields input[type='text'], .login_fields input[type='password'] {
  color: #afb1be;
  font-size: 16px;
  width: 100%;
  margin-top: -2px;
  background: rgba(57, 61, 82, 0);
  left: 0;
  padding: 10px 25px;
  border-top: 2px solid rgba(57, 61, 82, 0);
  border-bottom: 2px solid rgba(57, 61, 82, 0);
  border-right: none;
  border-left: none;
  outline: none;
  font-family: 'Gudea', sans-serif;
  box-shadow: none;
}
.login_fields__user, .login_fields__password {
  margin-top: 15px;
  position: relative;
}
.login_fields__submit {
  position: relative;
  top: 35px;
  left: 0;
  width: 80%;
  right: 0;
  margin: auto;
}
.login_fields__submit .forgot {
  float: right;
  font-size: 10px;
  margin-top: 11px;
  text-decoration: underline;
}
.login_fields__submit .forgot a {
  color: #606479;
}
.login_fields__submit input {
  border-radius: 50px;
  background: transparent;
  padding: 10px 50px;
  border: 2px solid #4FA1D9;
  color: #4FA1D9;
  text-transform: uppercase;
  font-size: 16px;
  -webkit-transition-property: background,color;
          transition-property: background,color;
  -webkit-transition-duration: .2s;
          transition-duration: .2s;
}
.login_fields__submit input:focus {
  box-shadow: none;
  outline: none;
}
.login_fields__submit input:hover {
  color: white;
  background: #4FA1D9;
  cursor: pointer;
  -webkit-transition-property: background,color;
          transition-property: background,color;
  -webkit-transition-duration: .2s;
          transition-duration: .2s;
}
/* Color Schemes */
.love {
  position: absolute;
  right: 20px;
  bottom: 0px;
  font-size: 11px;
  font-weight: normal;
}
.love p {
  color: white;
  font-weight: normal;
  font-family: 'Open Sans', sans-serif;
}
.love a {
  color: white;
  font-weight: 700;
  text-decoration: none;
}
.love img {
  position: relative;
  top: 3px;
  margin: 0px 4px;
  width: 10px;
}

.brand {
  position: absolute;
  left: 20px;
  bottom: 14px;
}
.brand img {
  width: 30px;
}
</style>
