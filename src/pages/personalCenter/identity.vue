<template>
  <div>
    <div class="body">
      <div class="back">
        <span class="back-btn" @click="back">返回上一步</span>
      </div>
      <div class="identity" v-show="step.type === 'identity'">
        <div class="box">
          <figure>
            <div class="img">
              <img :src="icon.identity_1" alt />
            </div>
              <figcaption>
                <p>您好，欢迎您参与中国瑜伽村机构认证！</p>
                <p>中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。</p>
                <p>认证机构参与积分兑换，可兑换中国瑜伽村手机端和网络端广告位展示，获得更多曝光机会。<p>
                <p>您的机构在中国瑜伽村平台获取点赞数越多，机构展示排名越靠前，可让更多人关注您的机构。<p>
                <p>感谢您的加入！</p>
              </figcaption>
            <div class="type" @click="myIdentity('2')">我是机构负责人</div>
          </figure>
        </div>

        <div class="box id2">
          <figure>
            <div class="img">
              <img :src="icon.identity_2" alt />
            </div>
            <figcaption>
              <p>您好，欢迎您参与中国瑜伽村导师认证！</p>
              <p>中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。</p>
              <p>认证导师可展示您更详细全面的瑜伽培训信息，让更多机构发现您。</p>
              <p>您获取的点赞数越多，排名越靠前，可让更多人关注您，参与您的课程。</p>
              <p>参与积分换礼，可兑换瑜伽礼品及活动礼遇。</p>
              <p>感谢您的加入！</p>
            </figcaption>
            <div class="type" @click="myIdentity('7')">机构负责人&amp;教练</div>
          </figure>
        </div>

        <div class="box id3">
          <figure>
            <div class="img">
              <img :src="icon.identity_3" alt />
            </div>
            <figcaption>
              <p>您好，欢迎您参与中国瑜伽村教练认证！</p>
              <p>中国瑜伽村，全国培训信息最丰富的瑜伽行业平台。</p>
              <p>认证教练可参与积分兑换,兑换丰富的瑜伽课程及活动礼遇.</p>
              <p>享受中国瑜伽村教练专属瑜伽用品及课程折扣.</p>
              <p>感谢您的加入！</p>
            </figcaption>
            <div class="type" @click="myIdentity('4')">我是教练</div>
          </figure>
        </div>
      </div>
      <div class="to-certification" v-show="step.type === 'certification'">
        <certification v-if="step.type == 'certification'" :certificate="certificate"></certification>
      </div>
      <div class="my-identity" v-show="step.type === 'my-card'">
        <div class="icon">
          <div class="img">
            <img :src="icon.active" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance">
            <div class="title">
              <span>账户金币</span>
              <span
                v-if="hiddenMoney"
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = ''"
              >显示金币</span>
              <span
                v-else
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = '**.**'"
              >隐藏金币</span>
            </div>
            <div class="money">
              <span>{{hiddenMoney || info.user.money}}</span>
              <div class="recharge" @click="step.type = 'recharge'">充值</div>
              <!-- <div class="cash">提现</div> -->
            </div>
            <span class="all-card" v-show="false">我的全部银行卡</span>
          </div>
          <div class="card-wrap" v-show="false">
            <div class="title">
              <span>银行卡管理</span>
              <span style="color:#4093A5;margin-left:10px;" @click="step.type = 'input-card'">添加银行卡</span>
            </div>
            <div class="card-box">
              <div class="cards">
                <span class="name">工商</span>
                <span class="number">尾号</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-card" v-show="step.type === 'input-card'">
        <div class="icon">
          <div class="img">
            <img :src="icon.active" alt />
          </div>
        </div>
        <div class="card">
          <div class="title">
            尊贵的
            <span>{{info.user.identity_auth}}</span> 未查询到您的银行卡信息，请完整信息：
          </div>
          <div style="padding-bottom:1em;">请填写银行卡号码</div>
          <div class="input-box">
            <el-input v-model="ruleForm.bank_card" type="text" />
            <div class="bank-card">
              <div v-show="false">
                <div class="name">建设银行</div>
                <div class="tipd">识别有误，手动填写</div>
              </div>
            </div>
          </div>
          <div style="padding-top:2rem;">
            <span class="sure" @click="changeBankCard">确定</span>
          </div>
        </div>
      </div>
      <div class="pay-card" v-show="step.type === 'recharge'">
        <div class="icon">
          <div class="img">
            <img :src="getIdentityIcon(info.user.identity_auth)" alt />
          </div>
        </div>
        <div class="info">
          <div class="balance">
            <div class="titles">
              <span>账户金币</span>
              <span
                v-if="hiddenMoney"
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = ''"
              >显示金币</span>
              <span
                v-else
                style="color:#4093A5;margin-left:10px;"
                @click="hiddenMoney = '**.**'"
              >隐藏金币</span>
            </div>
            <div class="money">
              <span style="min-width: 4em;display: inline-block;">{{hiddenMoney || info.user.money}}</span>
              <!-- <div class="recharge" @click="step.type = 'recharge'">充值</div> -->
              <!-- <div class="cash">提现</div> -->
            </div>
            <span class="all-card" v-show="false">我的全部银行卡</span>
          </div>
          <div class="card-wrap">
            <div class="title">
              <span>充值金币</span>
            </div>
            <div class="money-wrap">
              <span :class="[isRechangeActive(100)]" @click="rechargeChange('num', 100)">100</span>
              <span :class="[isRechangeActive(300)]" @click="rechargeChange('num', 300)">300</span>
              <span :class="[isRechangeActive(500)]" @click="rechargeChange('num', 500)">500</span>
              <span :class="[isRechangeActive(800)]" @click="rechargeChange('num', 800)">800</span>
              <span :class="[isRechangeActive(1000)]" @click="rechargeChange('num', 1000)">1000</span>
              <span :class="[isRechangeActive(2000)]" @click="rechargeChange('num', 2000)">2000</span>
              <span :class="[isRechangeActive(5000)]" @click="rechargeChange('num', 5000)">5000</span>
              <div class="input-money">
                <input v-model.number.lazy.trim="money" @change="changeMoney" type="text" placeholder="填写金币" />
                <div class="waring" v-if="isInputWrong">输入金币不能低于100金币</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="pay-way" v-show="rechargeForm.num || money"> -->
        <div class="pay-way">
          <div style="padding-left: 1.5rem;font-size: 0.8rem;">支付方式</div>
          <div class="way">
            <span :class="[isPayActive(3)]" @click="rechargeChange('payment', '3')">微信</span>
            <span :class="[isPayActive(2)]" @click="rechargeChange('payment', '2')">支付宝</span>
            <!-- <span>银行卡</span> -->
          </div>
          <div class="sure" style="padding-top:2em;">
            <!-- <span @click="reCharge">确定</span> -->
          </div>

          <div class="pay-code" v-show="playcode.show">
            <div class="code">
              <img :src="playcode.src" alt />
            </div>
            <!-- <div class="tips">刷新二维码</div> -->
            <div class="tips">{{playcode.count}}s后重新获取</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import identity_1 from "@/assets/personal/identity_1.png";
import identity_2 from "@/assets/personal/identity_2.png";
import identity_3 from "@/assets/personal/identity_3.png";
import certification from "./certification";
import store from "@/store";
import { mapGetters } from "vuex";
import {
  postChangeBankCard,
  getBankCardInfo,
  postRecharge
} from "@/api/personal.js";
import {
  postGetAlipayCode,
  postGetWechatpayCode,
  postGetAlipayOrder,
  postGetWechatOrder
} from "@/api/market";
let timer = null;
export default {
  components: {
    certification
  },
  data() {
    return {
      icon: {
        identity_1,
        identity_2,
        identity_3
      },
      certificate: {
        identity: ""
      },
      isInputWrong: false,
      playcode: { show: false, src: "", count: 0, success: false },
      hiddenMoney: "",
      money: "",
      step: {
        cur_index: 1,
        type: "identity"
      },
      ruleForm: {
        bank_card: ""
      },
      apply: {
        money: ""
      },
      rechargeForm: {
        num: "",
        payment: ""
      }
    };
  },
  watch: {
    money(newvalue, oldvalue) {
      this.rechargeForm.num = "";
    },
    $route() {
      const { type = "identity" } = this.$route.query;
      this.step.type = type;
    }
  },
  computed: {
    ...mapGetters(["info"]),
    getIdentityIcon() {
      return item => {
        const obj = {
          '认证机构负责人': this.icon.identity_1,
          '认证教练': this.icon.identity_3,
          '认证导师': this.icon.identity_2
        };

        return obj[item] || "";
      };
    },
    isPayActive() {
      return payment => {
        return { active: this.rechargeForm.payment == payment };
      };
    },
    isRechangeActive() {
      return money => {
        return { active: this.rechargeForm.num === money };
      };
    }
  },
  mounted() {
    // this.getBankCardInfo();
    const { type = "identity" } = this.$route.query;
    this.step.type = type;
  },
  updated() {
    this.$nextTick(function() {});
  },
  beforeDestroy() {
    timer && clearInterval(timer);
  },
  methods: {
    // 改变金币的额度
    changeMoney() {
      if(this.money <= 100) {
        this.isInputWrong = true
      }else{
        this.isInputWrong = false
      }
    },
    back() {
      const { type } = this.step;
      const obj = {
        identity: "identity",
        certification: "identity",
        "my-card": "my-card",
        "input-card": "my-card",
        recharge: "recharge"
      };
      if (type === "identity" || type === "recharge") {
        this.$router.go(-1);
      }
      this.step.type = obj[type];
    },
    myIdentity(identity) {
      this.step.type = "certification";
      this.certificate.identity = identity;
    },
    rechargeChange(name, num) {
      this.rechargeForm[name] = num;
      // if (name === "payment") {
      timer && clearInterval(timer);
      this.playcode = { show: false, src: "", count: 0, success: false };
      (this.rechargeForm.num || this.money) && this.reCharge();
      // }
    },
    /** 充值 */
    reCharge() {
      timer && clearInterval(timer);
      if (this.rechargeForm.payment == "" || this.isInputWrong) {
        return;
      }
      const params = Object.assign({}, this.rechargeForm);
      params.num = params.num || this.money;
      this.$request.post(`/personal/recharge`, params).then(data => {
        const { payment, out_trade_no, body, totalPrice } = data;
        // const totalPrice = 0.01;
        if (parseInt(payment) === 2) {
          postGetAlipayCode({ out_trade_no, total_fee: totalPrice, body })
            .then(data => {
              this.playcode.show = true;
              this.playcode.success = false;
              this.playcode.count = 59;
              this.playcode.src = data;
            })
            .then(_ => {
              if (this.playcode.show) {
                timer = setInterval(() => {
                  if (this.playcode.success) {
                    clearInterval(timer);
                  }
                  if (this.playcode.count <= 1 || !this.playcode.show) {
                    this.rechargeChange("payment", "2");
                    // this.playcode.show = false;
                    clearInterval(timer);
                  }
                  this.playcode.count -= 1;
                  if (this.playcode.count % 5 !== 0) return;
                  postGetAlipayOrder({ out_trade_no }).then(data => {
                    if (data.msg === "支付成功") {
                      // this.playcode.show = false;
                      this.playcode.success = true;
                      this.$message({
                        type: "success",
                        message: "支付成功"
                      });
                      this.$alert("前往个人中心", "成功", {
                        confirmButtonText: "立即前往",
                        callback: action => {
                          this.$router.push({
                            name: "personal"
                          });
                        }
                      });
                    }
                  });
                }, 1000);
              }
            });
        }
        if (parseInt(payment) === 3) {
          postGetWechatpayCode({
            out_trade_no,
            total_fee: totalPrice,
            body
          })
            .then(data => {
              this.playcode.show = true;
              this.playcode.success = false;
              this.playcode.count = 59;
              this.playcode.src = data;
            })
            .then(_ => {
              if (this.playcode.show) {
                timer = setInterval(() => {
                  if (this.playcode.success) {
                    clearInterval(timer);
                  }
                  if (this.playcode.count <= 1 || !this.playcode.show) {
                    this.rechargeChange("payment", "3");
                    // this.playcode.show = false;
                    clearInterval(timer);
                  }
                  this.playcode.count -= 1;
                  if (this.playcode.count % 5 !== 0) return;
                  postGetWechatOrder({ out_trade_no }).then(data => {
                    if (data.msg === "支付成功") {
                      // this.playcode.show = false;
                      this.playcode.success = true;
                      this.$message({
                        type: "success",
                        message: "支付成功"
                      });
                      this.$alert("前往个人中心", "成功", {
                        confirmButtonText: "立即前往",
                        callback: action => {
                          this.$router.push({
                            name: "personal"
                          });
                        }
                      });
                    }
                  });
                }, 1000);
              }
            });
        }
      });
    },
    /** 提现申请 */
    cashWithdrawal() {
      const params = Object.assign({}, this.apply);
      this.$request.post(`/personal/cashWithdrawal`, params).then(data => {});
    },
    /** 修改银行卡 */
    changeBankCard() {
      const params = Object.assign({}, this.ruleForm);
      this.$request.post(`/personal/changeBankCard`, params).then(data => {});
    },
    /** 银行卡信息 */
    getBankCardInfo() {
      this.$request(`/personal/getBankCardInfo`).then(data => {});
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 0.7rem;
  box-sizing: border-box;
}

.box{
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 1s ease;
  }
.box:hover{
  transition: all 1s ease;
}
.box:hover figcaption{
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  // background-color: rgba(255, 255, 255, 0.6);
  display: block;
  transition: background-color 0.75s ease-in;
  // transition: all 1s ease;
  // height: 15rem;
  height: 100%;
}
.box figcaption{
      width:100%;
      height: 100%;
      padding: 1rem;
      position: absolute;
      top: 0%;
      display: none;
    }       


img {
  width: 100%;
  height: 100%;
}
.body {
  position: relative;
  margin-bottom: 3rem;
}
.back {
  width: 60rem;
  margin: 0 auto;
  padding-top: 1rem;
  &-btn {
    cursor: pointer;
    padding: 0.2rem 0.3rem;
    background: #000;
    color: #fff;
  }
}
img {
  width: 100%;
  height: 100%;
}
.identity {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 60rem;
  padding-top: 4rem;
  min-height: 30rem;
  .box {
    width: 17rem;
    height: 22rem;
    background: #e6f9f1;
    // margin-right: 2.5rem;
    border-radius: 6px;
    &:hover {
      box-shadow: 0.1rem 0.2rem 1.3rem 0.1rem rgba(164, 164, 164, 0.39);
      transition: box-shadow 0.75s;
    }
    &.id1 {
      background: #e6f9f1;
    }
    &.id2 {
      background: #e6f5f9;
    }
    &.id3 {
      background: #fbecd2;
    }
    .img {
      width: 13rem;
      height: 13rem;
      margin: 1rem auto;
    }
    .type {
      cursor: pointer;
      margin: 2rem auto;
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      background: #fff;
      position: relative;
      z-index: 1000;
    }
  }
}
.my-identity {
  // min-height: 30rem;
  display: flex;
  min-height: 20rem;
  width: 60rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .info {
    flex-grow: 1;
    position: relative;
    cursor: pointer;
    padding: 30px 40px 30px 40px;
    .balance {
      .titles {
        font-size: 1.1rem;
        padding-bottom: 0.4rem;
      }

      .money {
        padding-bottom: 0.4rem;
        .recharge {
          display: inline-block;
          padding: 2px 20px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
        .cash {
          border: 1px solid #ccc;
          padding: 2px 20px;
          display: inline-block;
        }
      }
      .all-card {
        position: absolute;
        right: 10px;
        top: 20px;
        color: #4093a5;
      }
    }
    .card-wrap {
      padding-top: 2rem;
      .title {
        padding-bottom: 0.4rem;
      }
      .card-box {
        .cards {
          width: 300px;
          height: 200px;
          border-radius: 10px;
          border: 1px solid #ccc;
          background: #fff;
          display: flex;
          padding-top: 20px;
          position: relative;
          &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2rem;
            position: absolute;
            top: 70px;
            background: #000;
          }
          .name {
            display: inline;
            margin-left: 20px;
          }
          .number {
            flex-grow: 1;
            margin-right: 20px;
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
}
.input-card {
  display: flex;
  min-height: 20rem;
  border: 1px solid #ccc;
  width: 60rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .card {
    flex-grow: 1;
    padding: 4rem 5rem 0 3rem;
  }
  .title {
    padding-bottom: 1.85rem;
  }
  .input-box {
    .bank-card {
      padding: 1em 0;
      .name {
        cursor: pointer;
        display: inline-block;
        padding: 0.3em 0.6em;
        border: 1px solid #ccc;
      }
      .tipd {
        display: inline-block;
      }
    }
  }
  .sure {
    cursor: pointer;
    display: inline;
    background: #000;
    color: #fff;
    padding: 0.3em 1em;
  }
}
.pay-card {
  display: flex;
  min-height: 20rem;
  // border: 1px solid #ccc;
  width: 60rem;
  margin: 0 auto;
  margin-top: 4rem;
  margin-bottom: 10rem;
  box-shadow: 0.1rem 0 0.35rem rgba(36, 36, 36, 0.2);
  border-radius: 0.25rem;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 3.6rem;
    border-right: 1px solid #ccc;
    .img {
      width: 9rem;
      height: 9rem;
    }
  }
  .info {
    flex-grow: 1;
    position: relative;
    cursor: pointer;
    padding: 30px 40px 30px 40px;
    .balance {
      .titles {
        span {
          font-size: 0.8rem;
        }
        padding-bottom: 0.4rem;
      }

      .money {
        padding-bottom: 0.4rem;
        span {
          font-size: 0.8rem;
        }
        .recharge {
          display: inline-block;
          padding: 2px 20px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
        .cash {
          border: 1px solid #ccc;
          padding: 2px 20px;
          display: inline-block;
        }
      }
      .all-card {
        position: absolute;
        right: 10px;
        top: 20px;
        color: #4093a5;
      }
    }
    .card-wrap {
      padding-top: 2rem;
      .title {
        padding-bottom: 0.4rem;
        span {
          font-size: 0.8rem;
        }
      }
      .money-wrap {
        display: flex;
        flex-wrap: wrap;
        span {
          flex-shrink: 0;
          border: 1px solid #d6d6d6;
          width: 3rem;
          text-align: center;
          margin-right: 1rem;
          margin-bottom: 1rem;
          height: 2.5rem;
          line-height: 2.5rem;
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 200;
          transition: border-color 0.3s linear;
          &:hover {
            border-color: #3cb015;
          }
          &.active {
            // background: #e8f5db;
            border-color: #3cb015;
          }
        }
        .input-money {
          width: 8em;
          // margin-top: 1em;
          position: relative;
          &::after {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            content: "元";
            display: inline-block;
            padding-left: 1em;
            font-size: 1rem;
          }
          input {
            width: 100%;
            border: 1px solid #efefef;
            height: 2.5rem;
            padding: 0 1rem;
            transition: border-color 0.3s linear;
            &:focus {
              border: 1px solid #aed164;
              outline: none;
            }
          }
          .waring{
            margin-top: 0.23rem;
            width: 200%;
            font-size: 0.5rem;
            color: red;
          }
        }
      }
    }
  }
  .pay-way {
    width: 15rem;
    border-left: 1px solid #ccc;
    padding-top: 2rem;
    position: relative;
    .way {
      padding-left: 0.5rem;
      padding-top: 0.5rem;
      span {
        font-size: 0.8rem;
        padding: 0 1em;
        margin-right: 0.5em;
        width: 6em;
        height: 40px;
        line-height: 38px;
        text-align: center;
        border: 1px solid #d6d6d6;
        cursor: pointer;
        display: inline-block;
        transition: border-color 0.3s linear;
        &:hover {
          border-color: #3cb015;
        }
        &.active {
          // background: #e8f5db;
          border-color: #3cb015;
        }
      }
    }
    .pay-code {
      height: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .code {
        width: 10rem;
        height: 10rem;
        border: 1px solid #ccc;
      }
      .tips {
        text-align: right;
      }
    }
    .sure {
      text-align: center;
      span {
        cursor: pointer;
        display: inline;
        background: #000;
        color: #fff;
        padding: 0.3em 1em;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
      }
    }
  }
}
</style>