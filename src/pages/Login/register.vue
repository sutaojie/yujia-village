<template>
  <div class="reg">
    <div class="login-box">
      <div class="login-mask" @click="() => this.$emit('close', '')"></div>
      <div class="login">
        <div class="form">
          <div class="form-head">
            <h4>用户注册</h4>
            <div class="head-border"></div>
          </div>
          <div class="form-box">
            <div class="item">
              <div class="item-box left">
                <div class="item-box-input">
                  <input 
                    type="text"
                    placeholder="电话/PHONE" 
                    @input="blurRuleForm('tel', 'ruleForm', 'ruleFormErrorRule')"
                    v-model.trim="ruleForm.tel" />
                </div>
                <div class="item-box-tips">{{blurInputError('tel', 'ruleForm', 'ruleFormErrorRule')}}</div>
              </div>
            </div>
            <div class="item" style="align-items: flex-end;">
              <div class="item-box left">
                <div class="item-box-input">
                  <input
                    type="text"
                    placeholder="请输入短信验证码"
                    v-model.trim="ruleForm.verification_code"
                    @input="blurRuleForm('verification_code', 'ruleForm', 'ruleFormErrorRule')"
                  />
                  <div class="get_code" @click="getCodeMessage">发送验证码</div>
                </div>
                <div class="item-box-tips">{{blurInputError('verification_code', 'ruleForm', 'ruleFormErrorRule')}}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-box left">
                <div class="item-box-input" style="padding-bottom:0;">
                  <input
                    type="password"
                    style="height:1.5rem;width:100%;"
                    placeholder="设置密码/PASSWORD"
                    v-model.trim="ruleForm.password"
                    @input="blurRuleForm('password', 'ruleForm', 'ruleFormErrorRule')"
                  />
                </div>
                <div class="item-box-tips">{{blurInputError('password', 'ruleForm', 'ruleFormErrorRule')}}</div>
              </div>
              <!-- <div class="item-box right">
                <div
                  class="item-box-btn"
                  @click="register"
                  :style="`${isPostting?'pointer-events:none;':''}`"
                >注册</div>
              </div> -->
            </div>
            <div class="item">
              <div class="item-box left">
                <!-- <div class="item-box-title">请设置密码/PASSWORD</div> -->
                <div class="item-box-input" style="padding-bottom:0;">
                  <input
                    type="password"
                    style="height:1.5rem;width:100%;"
                    placeholder="确认密码/PASSWORD"
                    v-model.trim="ruleForm.password2"
                    @input="blurRuleForm('password2', 'ruleForm', 'ruleFormErrorRule')"
                  />
                </div>
                <div class="item-box-tips">{{blurInputError('password2', 'ruleForm', 'ruleFormErrorRule')}}</div>
              </div>
              <!-- <div class="item-box right">
                <div
                  class="item-box-btn"
                  @click="register"
                  :style="`${isPostting?'pointer-events:none;':''}`"
                >注册</div>
              </div> -->
            </div>
            <div class="item">
              <div class="item-box left">
                <div class="item-box-input">
                  <input
                    type="text"
                    placeholder="邀请码/INVITATION"
                    v-model.trim="ruleForm.invitation_id"
                    @input="blurRuleForm('invitation_id', 'ruleForm', 'ruleFormErrorRule')"
                    />
                </div>
                <div class="item-box-tips">{{blurInputError('invitation_id', 'ruleForm', 'ruleFormErrorRule')}}</div>
              </div>
            </div>
          </div>
          <div class="form-footer">
            <div class="auto_login">
              <div class="shuoming">
                <p>
                  注册即代表您已接受
                  <span href="../../../static/doc/瑜伽村隐私政策.DOCX" @click="open.ys = true" class="file">《瑜伽村隐私政策》</span>和
                  <span href="../../../static/doc/瑜伽村使用协议.DOCX" @click="open.sy = true" class="file">《瑜伽村使用协议》</span>
                </p>
              </div>
            </div>
            <div class="register" @click="goLogin">已有账号?登录</div>
          </div>
          <div class="form-button" :style="`${isPostting?'pointer-events:none;':''}`" @click="register">
            <el-button class="butt" type="text">注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog style="margin-top:1rem;" width="50rem" title="查看瑜伽村使用协议" :visible.sync="open.sy">
      <div style="height:60vh;">
        <iframe
          src="../../../static/doc/瑜伽村使用协议.pdf"
          width="100%"
          height="100%"
          frameborder="1"
        ></iframe>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="open.sy = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog style="margin-top:1rem;" width="50rem" title="查看瑜伽村隐私政策" :visible.sync="open.ys">
      <div style="height:60vh;">
        <iframe
          src="../../../static/doc/瑜伽村隐私政策.pdf"
          width="100%"
          height="100%"
          frameborder="1"
        ></iframe>
      </div>
      <span slot="footer">
        <el-button type="primary"  @click="open.ys = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog style="margin-top:1rem;" width="35rem" title="图形验证码" :visible.sync="getCodepass">
      <div class="item-box left">
        <div class="code-title">请在下方填写图形验证码</div>
        <div class="code-img">
          <img :src="verification.code_img" alt />
          <div class="change-code" @click="getVerificationCode">看不清？换一张</div>
        </div>
        <div class="box-input">
          <input
            type="text"
            v-model="ruleForm.captcha"
          />
        </div>
        <div class="box-tips">{{isError('captcha')}}</div>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="getCodeMessage2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import logo from "@/assets/market/logo_max.png";
import Validator from '@/utils/Validator.js'
export default {
  data() {
    return {
      // checked: false,
      querenxiazai:true,
      getCodepass:false,
      open: {
        sy: false,
        ys: false,
      },
      icon: {
        logo
      },
      loginWay: "account",
      ruleForm: {
        name: "", // 昵称
        tel: "", // 电话
        password: "",
        password2: "",
        verification_key: "", // 短信验证码的key
        verification_code: "", // 短信验证码
        key: "", // 图形验证码的key
        captcha: "", // 图形验证码
        invitation_id: "" // 邀请人id
      },
      ruleFormErrorRule: {
        // name: { show: false, msg: "请输入用户名" },
        tel: { show: false, msg: "" },
        captcha: { show: false, msg: "" },
        verification_code: { show: false, msg: "" },
        password: { show: false, msg: "" },
        password2: { show: false, msg: "" },
        invitation_id: { show: false, msg: "" }
      },
      ruleFormCheckErrorRule: {
        // name: { show: false, msg: "用户昵称已占用" },
        tel: { show: false, msg: "手机号码已注册" },
        captcha: { show: false, msg: "验证码有误，请重新输入" },
        verification_code: { show: false, msg: "验证码有误，请重新输入" },
        password: { show: false, msg: "两次密码不一致" },
        password2: { show: false, msg: "两次密码不一致" }
      },
      verification: {
        code_img: "",
        code_key: ""
      },
      isPostting: false,
      msg:""
    };
  },
  computed: {
    isError() {
      return function(item) {
        if (this.ruleFormErrorRule[item].show) {
          return this.ruleFormErrorRule[item].msg;
        }
        if (this.ruleFormCheckErrorRule[item].show) {
          return this.ruleFormCheckErrorRule[item].msg;
        }
        return "";
      };
    },
    blurInputError() {
      return (key, ruleName, errorName) => {
        return this[errorName][key].show?this.validatorBlurRuleForm(key, ruleName):''
      }
    }
  },
  mounted() {
    this.getVerificationCode();
  },
  methods: {
    // rememberlook(){
    //   if(this.checked == false){
    //     this.querenxiazai = true;
    //   }else{
    //     this.querenxiazai = false;
    //   }
    // },
    blurRuleForm(item, ruleName, errorName) {
      let error = this.validatorBlurRuleForm(item, ruleName)
      if (error.length === 0){
        this[errorName][item].show = false;
      } else {
        this[errorName][item].show = true;
        this[errorName][item].msg = error;
      }
    },
    validatorBlurRuleForm(key, ruleName) {
      let rules = {
          tel: [{
              strategy: 'isNonEmpty',
              errorMsg: '手机号码不能为空！'
            }, {
              strategy: 'isMoblie',
              errorMsg: '手机号码格式不正确！'
            }],
          verification_code: [{
                strategy: 'isNonEmpty',
                errorMsg: '短信验证码不能为空！'
            }, {
                strategy: 'minLength:6',
                errorMsg: '短信验证码长度不能小于 6 位！'
            }, {
                strategy: 'maxLength:6',
                errorMsg: '短信验证码长度不能大于 6 位！'
            }],
            captcha: [{
                strategy: 'isNonEmpty',
                errorMsg: '图形验证码不能为空！'
              }, {
                  strategy: 'minLength:4',
                  errorMsg: '图形验证码不能小于 4 位！'
              }, {
                  strategy: 'maxLength:4',
                  errorMsg: '图形验证码不能大于 4 位！'
              }],
            password: [{
                  strategy: 'isNonEmpty',
                  errorMsg: '密码不能为空！'
              },{
                  strategy: 'isPasswordHaveNumberAndAlphabet',
                  errorMsg: '密码只能是数字和字母的组合，不能包含特殊字符'
              },{
                  strategy: 'minLength:6',
                  errorMsg: '密码长度不能小于 6 位！'
              }, {
                  strategy: 'maxLength:18',
                  errorMsg: '密码长度不能大于 18 位！'
              },],
            password2: [{
                  strategy: 'isNonEmpty',
                  errorMsg: '密码不能为空！'
              },{
                  strategy: 'isPasswordHaveNumberAndAlphabet',
                  errorMsg: '密码只能是数字和字母的组合，不能包含特殊字符'
              },{
                  strategy: 'minLength:6',
                  errorMsg: '密码长度不能小于 6 位！'
              }, {
                  strategy: 'maxLength:18',
                  errorMsg: '密码长度不能大于 18 位！'
              },{
                  strategy: `equailPassword:${this[ruleName]['password']}`,
                  errorMsg: '两次密码不一致，请再次确认是否正确输入。'
              }],
            invitation_id: [{
                  strategy: 'isNonEmpty',
                  errorMsg: '邀请码不能为空！'
              }, {
                  strategy: 'minLength:4',
                  errorMsg: '邀请码长度不能小于 4 位！'
              }, {
                  strategy: 'maxLength:4',
                  errorMsg: '邀请码长度不能大于 4 位！'
              }]
        }
      const validatorFunc = () => {
        let validator = new Validator();
        validator.add(this[ruleName][key], rules[key])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        return errorMsg;
      }
      return '';
    },
    /* 图形验证码 */
    getVerificationCode() {
      this.$request("/verificationCode").then(data => {
        const { img, key } = data;
        this.verification.code_img = img;
        this.ruleForm.key = key;
      });
    },
    /* 图形验证码校验 */
    postVerificationCode() {
      const { captcha, key } = this.ruleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {});
    },
    getCodeMessage(){
      if (this.validatorBlurRuleForm('tel', 'ruleForm').length === 0) {
        this.getCodepass = true;
      } else {
        this.blurRuleForm('tel', 'ruleForm', 'ruleFormErrorRule')
        this.getCodepass = false;
      }
    },
    validatorRegisterTel() {
      const validatorFunc = () => {
        const { tel} = this.ruleForm
        let validator = new Validator();

        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        console.log(errorMsg);
        this.$message({ type: 'warning', message: errorMsg })
        return false;
      }
      return true;
    },
    getCodeMessage2(){
      const { captcha, key } = this.ruleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
              this.getCodepass = false;
              this.getCode();
            }else{
              this.getCodepass = true;
              this.postVerificationCode();
              this.getVerificationCode();
              this.ruleForm.captcha = "";
              this.ruleFormCheckErrorRule.captcha.show = true;
              this.ruleFormCheckErrorRule.captcha.msg;
            }
          })
          .catch(() => {
        });
    },
    /* 短信验证码 */
    getCode() {
      this.checkEmtypeInputBox("tel");
      const { tel, captcha, key} = this.ruleForm;
      tel &&
      captcha &&
      key &&
        this.$request.post("/getCode", { tel, captcha, key}).then(data => {
          this.$message({ message: "发送成功", type: "success" });
          this.ruleForm.verification_key = data.key;
        });
    },
    /** 注册 */
    register() {
      // let isPass = this.formVaildent("ruleForm");
      // if (!isPass) return;
      if(!this.validatorRegister()) return;
      const { password, password2} = this.ruleForm
      if(password !== password2) {
        this.$message({ type: 'warning', message: '密码不一致' })
        return;
      }
      this.isPostting = true;
      const params = Object.assign({}, this.ruleForm);
      this.$request
        .post("/register", params)
        .then(data => {
          this.$message({ message: "注册成功", type: "success" });
          this.isPostting = false;
          this.$emit("close", "");
        })
        .catch(() => {
          this.isPostting = false;
        });
    },
    validatorRegister() {
      const validatorFunc = () => {
        const { tel, password, password2, verification_code, captcha, invitation_id} = this.ruleForm
        let validator = new Validator();

        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])

        validator.add(verification_code, [{
            strategy: 'isNonEmpty',
            errorMsg: '短信验证码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '短信验证码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:6',
            errorMsg: '短信验证码长度不能大于 6 位！'
        }])

        validator.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:18',
            errorMsg: '密码长度不能大于 18 位！'
        }])

        validator.add(password2, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:18',
            errorMsg: '密码长度不能大于 18 位！'
        }])

        validator.add(captcha, [{
            strategy: 'isNonEmpty',
            errorMsg: '图形验证码不能为空！'
        }, {
            strategy: 'minLength:4',
            errorMsg: '图形验证码不能小于 4 位！'
        }, {
            strategy: 'maxLength:4',
            errorMsg: '图形验证码不能大于 4 位！'
        }])

        validator.add(invitation_id, [{
            strategy: 'isNonEmpty',
            errorMsg: '邀请码不能为空！'
        }, {
            strategy: 'minLength:4',
            errorMsg: '邀请码不能小于 4 位！'
        }, {
            strategy: 'maxLength:4',
            errorMsg: '邀请码不能大于 4 位！'
        }])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        console.log(errorMsg);
        this.$message({ type: 'warning', message: errorMsg })
        return false;
      }
      return true;
    },
    formVaildent(name) {
      // 提交按钮校验输入框
      let _error = this[`${name}ErrorRule`];
      let _form = this[`${name}`];
      let is_pass = true;
      for (let key of Object.keys(_form)) {
        if (_form[key] === "" && _error[key]) {
          _error[key].show = true;
          is_pass = false;
        }
      }
      return is_pass;
    },
    checkEmtypeInputBox(item) {
      // 输入框失去焦点适合有值，空则显示错误提示
      let _input_value = this.ruleForm[item];
      if (_input_value) {
        this.ruleFormErrorRule[item].show = false;
        let obj = {
          captcha: this.postVerificationCode
        };
        obj[item] && obj[item]();
      } else {
        this.ruleFormErrorRule[item].show = true;
      }
    },
    goLogin() {
      // this.$router.push({
      //   name: 'Login'
      // })
      this.$emit("go-login", "login");
    }
  }
};
</script>
<style scoped>
  .reg >>> .el-dialog {
    margin-top: 0 !important;
  }
</style>
<style lang="scss" scoped>
* {
  box-sizing: border-box !important;
}
img {
  width: 100%;
  height: 100%;
}
input {
  outline: none !important;
}
input:focus {
  outline: none;
}
.code-title{
  height: 37px;
  margin-left: 30px;
}
.code-img{
    // width: 300px;
    height: 60px;
    display: flex;
    margin: 0 auto;
    margin-left: 30px;
    img{
      width: 100%;
      height: 100%;
    }
}
.box-input{
    width: 47%;
    height: 3rem;
    padding-top: 15px;
    margin-left: 30px;
    input{
      width: 100%;
      height: 100%;
    }
}
.box-tips{
  color: #ce551a;
  padding-top: 10px;
  margin-left: 30px;
  font-size: 0.6rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;;
  height: 1.2rem;
}
.change-code{
  width: 100%;
  padding-top: 20px;
  cursor: pointer;
}
.login-box {
  .login-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
  }
  .login {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, 0);
    background: #fff;
    z-index: 101;
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    // height: 22rem;
    &-icon {
      width: 14.1rem;
      background: #12acac;
      background: #f7faf2;
      display: flex;
      justify-content: center;
      align-items: center;
      &-pic {
      }
    }
    .form {
      width: 27rem;
      padding: 1rem 1.4rem 3rem;
      background-color: #F6FCF3;
      position: relative;
      &-head{
        padding-top: 10px;
        h4{
          color: #548940;
          font-size: 16px;
          text-align: center;
          font-family:Microsoft YaHei;
          font-weight:bold;
        }
        .head-border{
          height: 3px;
          background-color: #548940;
          margin-top: 15px;
          margin-bottom: 15px;
        }
      }
      &-box {
        .item {
          display: flex;
          padding: 0.1rem 0;
          &-box {
            position: relative;
            // border: 1px solid red;
            flex-grow: 1;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(44, 44, 44, 1);
            &.left {
              flex-basis: 50%;
            }
            &.right {
              flex-basis: 50%;
            }
            &-title {
              padding-left: 15px;
            }
            &-code-img {
              height: 2.35rem;
              background: #fff;
              width: 9.45rem;
              margin: 0 auto;
              position: relative;
              .change-code {
                position: absolute;
                padding-left: 10px;
                color: #6bc839;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                text-decoration: underline;
                width: 10em;
                cursor: default;
              }
            }
            &-input {
              width: 100%;
              padding-top: 20px;
              position: relative;
              input {
                width: 100%;
                height: 2rem;
                opacity: 1;
                border: none;
                background-color: #F6FCF3;
                border-bottom: 1px solid #cccccc;
                border-radius: 0.3rem;
                padding-left: 5px;
              }
              .get_code {
                cursor: pointer;
                user-select: none;
                width: 4rem;
                height: 1.6rem;
                // margin-right: 1.2rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #7FB36B;
                font-size: 10px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                position: absolute;
                right: 0;
                top: 55%;
                transform: translateY(-50%);
              }
            }
            &-tips {
              padding-left: 5px;
              font-size: 0.6rem;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(206, 85, 26, 1);
              height: 1.2rem;
            }
            &-btn {
              &:hover {
                border: none;
                background: #efefef;
              }
              position: absolute;
              right: 0;
              bottom: 0;
              transform: translateY(-50%);
              outline: none;
              border: none;
              width: 100%;
              width: 6.15rem;
              height: 2.15rem;
              font-family: MicrosoftYaHei;
              font-size: 0.4rem;
              font-weight: normal;
              font-stretch: normal;
              // line-height: 0.2rem;
              letter-spacing: 0rem;
              color: #2c2c2c;
              background: #fff;
              border-radius: 1.3rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      &-footer {
        // margin-top: 0.5rem;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        font-family: MicrosoftYaHei;
        font-size: 0.7rem;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 0.2rem;
        letter-spacing: 0rem;
        color: #2c2c2c;
        .auto_login {
          display: flex;
          align-items: center;
          p {
            font-size: 0.6rem;
            margin: 0;
            margin-top: 7px;
            .file {
              color: #6bc839;
              cursor: pointer;
              margin-right: 0.3rem;
            }
          }
          &-tips {
          }
          &-icon {
            width: 1.7rem;
            height: 1.7rem;
            background: #000;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .register {
          cursor: pointer;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          // margin-bottom: -2em;
        }
      }
      &-button{
          height: 50px;
          background-color: #548940;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          border-radius: 5px;
          line-height: 50px;
          margin-top: 15%;
          cursor: pointer;
          .butt{
            width: 100%;
            color: #ffffff;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
          }
      }
    }
  }
}
</style>
