<template>
  <div>
    <div class="safe">
      <session-title name="信息与安全中心"></session-title>
      <cloud :arr="[1,2,4]"></cloud>
      <div class="body">
        <div class="tabs">
          <div @click="tagsChange(0)" :class="['tab', isTagActive(0)]">修改密码</div>
          <div @click="tagsChange(1)" :class="['tab', isTagActive(1)]">修改绑定手机</div>
          <div @click="tagsChange(2)" :class="['tab', isTagActive(2)]">个人信息</div>
          <div
            v-show="info.user.identity_auth == '认证机构负责人'  || info.user.identity_auth == '认证导师'"
            @click="tagsChange(3)"
            :class="['tab', isTagActive(3)]"
          >机构信息</div>
        </div>
        <div class="content">
          <div v-show="!success">
            <div
              class="edit-password"
              v-show="tagList[0].active && tagList[0].methods === 'password'"
            >
              <div class="form">
                <div class="item">
                  <span class="title">旧密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.old_password"
                      class="form-control input"
                      placeholder="请输入旧密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.password"
                      class="form-control input"
                      placeholder="请输入新密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <!-- <div class="item">
                <span class="title">二次确认</span>
                <div class="form_input">
                  <input type="password" class="form-control input" placeholder="请输入旧密码" />
                  <div class="form_input-tips">密码错误</div>
                </div>
                </div>-->
                <div class="submit">
                  <!-- <div class="btn">返回</div> -->
                  <div class="btn" @click="updatePassword">更改</div>
                </div>
              </div>
              <div class="tips">
                <span
                  @click="tagList[0].methods = 'phone';ruleForm = resetForm('ruleForm'); getVerificationCode();"
                >忘记密码？更换验证方式</span>
              </div>
            </div>
            <div
              class="edit-password-by-code"
              v-show="tagList[0].active && tagList[0].methods === 'phone'"
            >
              <div class="form">
                <div class="item">
                  <span class="title">验证码</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="ruleForm.verification_code"
                      class="form-control input"
                      placeholder="请输入验证码"
                    />
                    <!-- <div class="getcode" @click="getCodeMessage">{{codeTips.msg}}</div> -->
                    <div class="getcode" @click="getCodeMessage">发送验证码</div>
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新密码</span>
                  <div class="form_input">
                    <input
                      type="password"
                      v-model="ruleForm.password"
                      class="form-control input"
                      placeholder="请输入新密码"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="submit">
                  <div
                    class="btn"
                    @click="() => { 
                      this.tagList[0].methods = 'password';
                      this.ruleForm = this.resetForm('ruleForm');
                      this.resetCode();
                      }"
                  >返回</div>
                  <div class="btn" @click="updatePassword">更改</div>
                </div>
              </div>
              <div class="tips">
                <span>您当前手机号:</span>
                <br />
                <span>{{tel}}</span>
              </div>
            </div>
            <div class="edit-phone" v-show="tagList[1].active">
              <div class="form">
                <div class="item">
                  <span class="title">验证码</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="telForm.verification_code"
                      class="form-control input"
                      placeholder="请输入验证码"
                    />
                    <!-- <div class="getcode" @click="getCode">{{codeTips.msg}}</div> -->
                    <div class="getcode" @click="getCodeMessage">发送验证码</div>
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="item">
                  <span class="title">新手机号</span>
                  <div class="form_input">
                    <input
                      type="text"
                      v-model="telForm.tel"
                      class="form-control input"
                      placeholder="请输入新手机号"
                    />
                    <div class="form_input-tips"></div>
                  </div>
                </div>
                <div class="submit">
                  <!-- <div class="btn">返回</div> -->
                  <div class="btn" @click="updateTel">更改</div>
                </div>
              </div>
              <div class="tips">
                <span>您当前手机号:</span>
                <br />
                <span>{{tel}}</span>
              </div>
            </div>
            <el-dialog
              style="margin-top:1rem;"
              width="35rem"
              title="图形验证码"
              :visible.sync="getCodepass"
            >
              <div class="item-box left">
                <div class="code-title">请在下方填写图形验证码</div>
                <div class="code-img">
                  <img :src="verification.code_img" alt />
                  <div class="change-code" @click="getVerificationCode">看不清？换一张</div>
                </div>
                <div class="box-input">
                  <input type="text" v-model="ruleForm.captcha" />
                </div>
                <!-- <div class="box-tips">{{isError('captcha')}}</div> -->
              </div>
              <span slot="footer">
                <el-button type="primary" @click="getCodeMessage2">确 定</el-button>
              </span>
            </el-dialog>
            <div class="edit-personage" v-show="tagList[2].active && info.user.name">
              <div class="item" style="align-items: flex-start;">
                <div class="lable">用户头像</div>
                <div class="value" style="width:6rem;height:6rem;">
                  <Fileupload ref="fileUpload" :imageUrl="userForm.icon" @getNewIcon="getNewIcon"></Fileupload>
                  <div class="upload-box" style="overflow:hidden;" v-show="false">
                    <div class="upload-img" v-if="userForm.icon">
                      <img style="width:100%;" :src="userForm.icon" alt />
                      <span class="item-actions"></span>
                      <i @click="userForm.icon = ''" class="el-icon-delete"></i>
                    </div>
                    <el-upload
                      v-else
                      action="#"
                      accept="image/jpeg, image/gif, image/png"
                      :before-upload="onBeforeUpload"
                      :class="{disabled:uploadAvatorDisabled}"
                      :on-change="changeAvatorFile"
                      :on-remove="() => this.userForm['icon'] = ''"
                      list-type="picture-card"
                      :limit="1"
                      :auto-upload="false"
                    >
                      <i class="el-icon-plus"></i>
                      <div class="el-upload__tip" slot="tip">支持jpg,jpeg,png格式，图片大小限制在1M之内</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="lable">用户名</div>
                <div class="value">
                  <el-input v-model="userForm.name"></el-input>
                </div>
              </div>
              <div class="item">
                <div class="lable">真实姓名</div>
                <div class="value">
                  <el-input v-model="userForm.real_name"></el-input>
                </div>
              </div>
              <div class="item">
                <div class="lable">性别</div>
                <div class="value">
                  <el-radio-group v-model="userForm.sex">
                    <el-radio :label="2">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="3">保密</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="item">
                <div class="lable">生日</div>
                <div class="value">
                  <el-date-picker
                    v-model="userForm.birthday"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="item" v-show="false">
                <div class="lable">邮箱</div>
                <div class="value"></div>
              </div>
              <div class="item">
                <div class="lable">所在城市</div>
                <div class="value">
                  <v-distpicker
                    :province="userForm.province"
                    :city="userForm.city"
                    :area="userForm.area"
                    @selected="onDistpickerSelected"
                  ></v-distpicker>
                </div>
              </div>
              <div
                class="teach"
                v-show="userForm.identity_auth == '认证教练' || userForm.identity_auth == '认证导师'"
              >
                <div class="item">
                  <div class="lable">系统认证身份</div>
                  <div class="value">{{getIdentity(info.user.identity_auth).text}}</div>
                </div>
                <div class="item">
                  <div class="lable">教龄</div>
                  <div class="value">{{teacherForm.num || '无'}}</div>
                </div>
                <div class="item">
                  <div class="lable">擅长领域</div>
                  <div class="value">{{teacherForm.good_at || '无'}}</div>
                </div>
                <div class="item">
                  <div class="lable">个人简介</div>
                  <div class="value">{{teacherForm.content || '无'}}</div>
                </div>
                <div class="item">
                  <div class="lable">荣誉/感悟</div>
                  <div class="value">
                    <el-input v-model="teacherForm.info" type="textarea"></el-input>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn" @click="updateTeachUser">更改</div>
              </div>
            </div>
            <div class="edit-hall" v-show="tagList[3].active">
              <div class="item">
                <div class="lable">机构名称</div>
                <div class="value">
                  <el-select v-model="club.select_id" @change="changeClub" placeholder="请选择机构名称">
                    <el-option
                      v-for="item in club.list"
                      :key="item.id"
                      :label="item.club_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div v-show="clubForm.club_name">
                <div class="item">
                  <div class="lable">机构电话</div>
                  <div class="value">
                    <el-input v-model="clubForm.club_tel"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">机构所在城市</div>
                  <div class="value">
                    <v-distpicker
                      :province="clubForm.province"
                      :city="clubForm.city"
                      :area="clubForm.area"
                      @selected="onDistpickerSelected"
                    ></v-distpicker>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">机构地址</div>
                  <div class="value" style="flex-grow:1;">
                    <el-input v-model="clubForm.club_address"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">机构联系人</div>
                  <div class="value">
                    <el-input v-model="clubForm.name"></el-input>
                  </div>
                </div>
                <div class="item">
                  <div class="lable">联系人电话</div>
                  <div class="value">
                    <el-input v-model="clubForm.tel"></el-input>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn" @click="updateClub">更改</div>
              </div>
            </div>
          </div>

          <div class="success" v-show="success">
            <span>更改成功！</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SessionTitle from "./SessionTitle";
import Fileupload from "@/components/fileupload";
import VDistpicker from "v-distpicker";
import store from "@/store";
import Bus from "@/utils/Bus";
import { mapGetters } from "vuex";
import Cloud from "./cloud";
import {
  postUpdateTeacherInfo,
  getTeacherInfo,
  postUpdateClubInfo,
  getClubInfo,
  postUpdateInfo
} from "@/api/personal";

export default {
  components: {
    VDistpicker,
    Cloud,
    Fileupload
  },
  data() {
    return {
      imageUrl: '',
      success: false,
      getCodepass: false,
      dialogVisible: false,
      dialogImageUrl: "",
      origin_icon: "",
      club: { list: [], select_id: "" },
      codeTips: {
        msg: "发送验证码",
        count: 0
      },
      tagList: [
        { type: "password", active: true, methods: "password" },
        { type: "phone", active: false },
        { type: "personage", active: false },
        { type: "hall", active: false }
      ],
      verification: {
        code_img: "",
        code_key: ""
      },
      ruleForm: {
        old_password: "",
        password: "",
        verification_key: "",
        verification_code: "",
        key: "",
        captcha: ""
      },
      telForm: {
        old_tel: "",
        tel: "",
        verification_key: "",
        verification_code: "",
        key: "",
        captcha: ""
      },
      clubForm: {
        id: "", // 机构id
        name: "",
        tel: "",
        club_tel: "",
        club_name: "",
        club_address: "",
        city: "",
        province: "",
        area: ""
      },
      teacherForm: {
        id: "", // 机构id
        info: "",
        city: "",
        province: "",
        area: ""
      },
      userForm: {
        icon: "",
        name: "", //
        real_name: "", //
        sex: "", // 性别1-女 2-男 3-保密
        birthday: "",
        city: "",
        province: "",
        area: ""
      }
    };
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
    getIdentity() {
      return type => {
        const obj = {
          5: { text: "教练" }
        };
        return obj[type] || {};
      };
    },
    isTagActive() {
      return index => ({
        active: this.tagList[index].active
      });
    },
    /** 手机号码加密 */
    tel() {
      return (
        this.info &&
        this.info.user &&
        this.info.user.tel &&
        `${this.info.user.tel.substr(0, 3)}****${this.info.user.tel.substr(
          7,
          11
        )}`
      );
    },
    uploadAvatorDisabled() {
      return this.userForm.icon;
      // return true
    }
  },
  created() {
  },
  mounted() {
    if (this.isUserNeedLogin) {
      Bus.$emit('login', true);
      return;
    }
    this.getPersonal();
    const { type } = this.$route.query;
    type && this.tagsChange(type);
  },
  methods: {
    getNewIcon(val) {
      this.userForm.icon = val
    },
    changeUserIcon() {
      this.$refs.fileUpload.openFile();
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      console.log(isLt1M, file.size / 1024 / 1024);
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isIMAGE && isLt1M;
    },
    changeAvatorFile(file, fileList) {
      if (!this.onBeforeUpload(file)) {
        this.userForm["icon"] = this.origin_icon;
        return;
      }
      this.changeFile(file, fileList, "icon");
    },
    changeFile(file, fileList, name) {
      // this.userForm[name] = file;
      // return;
      let This = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        this.result; // 这个就是base64编码了
        This.userForm[name] = this.result;
      };
    },
    getCodeMessage() {
      if (this.ruleForm.tel === "") {
        this.getCodepass = false;
      } else {
        this.getCodepass = true;
      }
    },
    getCodeMessage2() {
      const { captcha, key } = this.ruleForm;
      captcha &&
        key &&
        this.$request
          .post("/verificationCode", { captcha, key })
          .then(data => {
            this.msg = data.msg;
            this.getCode();
            if (this.msg == "OK") {
              this.getCodepass = false;
            } else {
              this.getCodepass = true;
              this.ruleForm.captcha = "";
            }
          })
          .catch(() => {});
    },
    getVerificationCode() {
      this.$request("/verificationCode").then(data => {
        const { img, key } = data;
        this.verification.code_img = img;
        this.ruleForm.key = key;
      });
    },
    /** 个人信息 */
    getPersonal() {
      this.$request("/personal/home").then(data => {
        store.dispatch("INFO", data);
        sessionStorage.setItem("user", JSON.stringify(data));
        const {
          area,
          province,
          city,
          birthday,
          sex,
          tel,
          identity_auth,
          name,
          real_name,
          icon
        } = data.user;
        this.origin_icon = icon;
        this.userForm = Object.assign(
          {},
          {
            area,
            province,
            city,
            birthday,
            sex,
            tel,
            identity_auth,
            name,
            real_name,
            icon
          }
        );
      });
    },
    onDistpickerSelected(data) {
      const { area, city, province } = data;
      this.userForm = Object.assign({}, this.userForm, {
        area: area.value,
        city: city.value,
        province: province.value
      });
      this.teacherForm = Object.assign({}, this.teacherForm, {
        area: area.value,
        city: city.value,
        province: province.value
      });
      this.clubForm = Object.assign({}, this.clubForm, {
        area: area.value,
        city: city.value,
        province: province.value
      });
    },
    changeClub(club_id) {
      const club = this.club.list.filter(item => item.id == club_id)[0];
      this.clubForm = Object.assign({}, this.clubForm, club);
    },
    resetForm(name) {
      const form = {
        ruleForm: {
          old_password: "",
          password: "",
          verification_key: "",
          verification_code: ""
        },
        telForm: {
          old_tel: "",
          tel: "",
          verification_key: "",
          verification_code: ""
        }
      };
      return form[name];
    },
    resetCode() {
      // 重置获取验证码
      this.codeTips.msg = "发送验证码";
      this.codeTips.count = 0;
    },

    /* 短信验证码 */
    getCode() {
      if (this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if (this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = "重新获取";
        }
      }, 1000);

      const { tel } = this.info && this.info.user;
      const { captcha, key } = this.ruleForm;
      tel &&
        this.$request
          .post("/getVerificationCode", { tel, key, captcha })
          .then(data => {
            this.$message({ message: "发送成功", type: "success" });
            this.ruleForm.verification_key = data.key;
            this.telForm.verification_key = data.key;
          })
          .catch(_ => {
            this.resetCode();
          });
    },
    /** 修改手机号码 */
    updateTel() {
      const way = this.tagList[1];
      if (!way.active) return;
      const params = Object.assign({}, this.telForm, {
        old_tel: this.info.user.tel
      });
      if (this.checkoutEmpty(params)) return;
      this.$request.post("/personal/updateTel", params).then(data => {
        this.$message({
          type: "success",
          message: "修改成功, 请重新登录"
        });
      });
    },
    checkoutEmpty(form) {
      for (const item of Object.entries(form)) {
        const [k, v] = item;
        if (!v) return true;
      }
      return false;
    },
    /** 修改密码 */
    updatePassword() {
      const way = this.tagList[0];
      if (!way.active) return;
      let params = Object.assign({}, this.ruleForm);
      if (way.methods === "password") {
        delete params.verification_key;
        delete params.verification_code;
        if (this.checkoutEmpty(params)) return;
      } else {
        delete params.old_password;
        if (this.checkoutEmpty(params)) return;
      }
      this.$request.post("/personal/updatePassword", params).then(data => {
        this.$message({
          type: "success",
          message: "修改成功，请重新登录"
        });
        Bus.$emit("login", true);
        store.dispatch("INFO", { user: {} });
      });
    },
    /** 切换选项 */
    tagsChange(cur_index) {
      this.success = false;
      this.resetCode();
      if (cur_index == 1) {
        this.ruleForm = this.resetForm("ruleForm");
        this.getVerificationCode();
      } else {
        this.telForm = this.resetForm("telForm");
      }
      this.tagList = this.tagList.map((item, index) => {
        if (index == cur_index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });

      const obj = {
        2: this.getTeacher,
        3: this.getClub
      };
      obj[cur_index] && obj[cur_index]();
    },
    getTeacher() {
      const {
        area,
        province,
        city,
        birthday,
        sex,
        tel,
        identity_auth,
        name,
        real_name,
        icon
      } = this.info.user;
      this.userForm = Object.assign(
        {},
        {
          area,
          province,
          city,
          birthday,
          sex,
          tel,
          identity_auth,
          name,
          real_name,
          icon
        }
      );
      if (identity_auth === '认证教练' || identity_auth === '认证导师') {
        getTeacherInfo().then(data => {
          data[0] && (this.teacherForm = data[0]);
        });
      }
    },
    getClub() {
      getClubInfo().then(data => (this.club.list = data));
    },
    updateTeachUser() {
      const user = () => {
        // let params = Object.assign({}, this.userForm);
        const {
          area,
          province,
          city,
          birthday,
          sex,
          name,
          real_name,
          icon
        } = this.userForm;
        return postUpdateInfo({
          area,
          province,
          city,
          birthday,
          sex,
          name,
          real_name,
          icon
        }).then(data => {});
      };
      const teacher = () => {
        const { identity_auth } = this.info.user;
        if (identity_auth === '认证教练' || identity_auth === '认证导师') {
          const { id, info, city, province, area } = this.teacherForm;
          let cur_id = id || this.info.user.id
          return postUpdateTeacherInfo({ id: cur_id, info, city, province, area });
        }
      };
      Promise.all([user(), teacher()])
        .then(data => {
          this.$message({
            type: "success",
            message: "修改基础信息成功"
          });
          this.getPersonal();
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateClub() {
      const params = Object.assign({}, this.clubForm);
      postUpdateClubInfo(params).then(data => {
        this.getPersonal();
        this.$message({
          type: "success",
          message: "修改成功"
        });
      });
    }
  }
};
</script>
<style scoped>
.edit-personage >>> .el-input__icon {
  display: none;
}
.edit-personage >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding: 0;
}
.edit-personage >>> .disabled .el-upload--picture-card {
  display: none;
}
.edit-personage >>> .el-input__inner {
  height: 30px;
}

.edit-hall >>> .distpicker-address-wrapper select {
  height: 2em;
  margin-right: 10px;
  font-size: 0.7rem;
  padding: 0;
}
.edit-hall >>> .disabled .el-upload--picture-card {
  display: none;
}
.edit-hall >>> .el-input__inner {
  height: 30px;
}
</style>
<style lang="scss" scoped>
.upload-img {
  width: 148px;
  height: 148px;
  position: relative;
  .el-icon-delete {
    display: none;
  }
  &:hover .item-actions {
    display: block;
  }
  .item-actions {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 1;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
  }
  &:hover .el-icon-delete {
    color: #fff;
    display: block;
    position: absolute;
    font-size: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.code-title {
  height: 37px;
  margin-left: 30px;
}
.code-img {
  // width: 300px;
  height: 60px;
  display: flex;
  margin: 0 auto;
  margin-left: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.box-input {
  width: 47%;
  height: 3rem;
  padding-top: 15px;
  margin-left: 30px;
  input {
    width: 100%;
    height: 100%;
  }
}
.box-tips {
  color: #ce551a;
  padding-top: 10px;
  margin-left: 30px;
  font-size: 0.6rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  height: 1.2rem;
}
.change-code {
  width: 100%;
  padding-top: 20px;
  cursor: pointer;
}
* {
  margin: 0;
  // padding: 0;
  box-sizing: border-box;
}

.edit-hall,
.edit-personage {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .lable {
      width: 8em;
      text-align: right;
      margin-right: 10px;
    }
    .value {
    }
  }
  .btn-wrap {
    margin-top: 3em;
    margin-left: 9em;
    .btn {
      cursor: pointer;
      border: 1px solid #7d7d7d;
      padding: 0.4rem 1.7rem;
      font-size: 0.9rem;
    }
    .btn:hover{
      color: #62923E;
      border: 1px solid #62923E;
    }
  }
}
.safe {
  position: relative;
  width: 60rem;
  margin: 0 auto;
  min-height: 40rem;
  .body {
    display: flex;
    padding-bottom: 5rem;
    .tabs {
      font-size: 0.7rem;
      .tab {
        cursor: pointer;
        margin-bottom: 1.55rem;
        &.active {
          font-weight: 800;
          position: relative;
          z-index: 4;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: -0.4rem;
            transform: translateY(-50%);
            width: 0.2rem;
            height: 0.7rem;
            background: #2c2c2c;
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: -0.35rem;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #afafaf 0%, #ffffff 100%);
            z-index: -1;
            width: 100%;
            height: 100%;
          }
        }
      }
      padding-right: 4.85rem;
    }
    .content {
      border: 1px solid #ccc;
      box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
      border-radius: 0.25rem;
      width: 40rem;
      padding: 2.4rem 1.5rem 1.5rem;
      font-size: 0.7rem;
      .success {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 1.4rem;
          padding-bottom: 2.5rem;
          font-weight: 800;
        }
      }
      .edit-password,
      .edit-password-by-code,
      .edit-phone {
        display: flex;
        .form {
          .item {
            display: flex;
            .title {
              width: 5em;
              line-height: 1.85rem;
              text-align: right;
              padding-right: 0.5rem;
            }
            .input {
              width: 22rem;
              height: 1.85rem;
              font-size: 0.7rem;
              padding-left: 0.6rem;
              overflow: hidden;
            }
            .form_input {
              position: relative;
            }
            .getcode {
              position: absolute;
              top: 0;
              right: 0;
              height: 1.85rem;
              line-height: 1.85rem;
              border-radius: 0.25rem;
              padding: 0 0.85rem;
              border: 1px solid #dcdcdc;
              cursor: pointer;
            }
            .form_input-tips {
              color: #d83211;
              padding-top: 0.2rem;
              padding-left: 0.6rem;
              height: 1.8rem;
            }
          }
          .submit {
            display: flex;
            justify-content: center;
            .btn {
              cursor: pointer;
              border: 1px solid #7d7d7d;
              padding: 0.4rem 1.7rem;
              font-size: 0.9rem;
              &:first-child {
                margin-right: 2.45rem;
              }
            }
            .btn:hover{
              color: #62923E;
              border: 1px solid #62923E;
            }
          }
        }
        .tips {
          margin-left: 2.3rem;
          cursor: pointer;
        }
      }
      .edit-phone,
      .edit-password-by-code {
        .form {
          .title {
          }
          .getcode {
          }
          .form-control {
          }
          .submit {
            .btn {
            }
          }
        }
        .tips {
          padding-top: 2rem;
          span {
            &:nth-of-type(2) {
              display: block;
              padding-top: 0.4rem;
              font-weight: 800;
            }
          }
        }
      }
    }
  }
}
</style>

