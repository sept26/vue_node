<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>

    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png" />
        </a>
      </div>
      <div class="navbar-right-container">
        <div class="navbar-menu-container">
          <a href="javascript:void(0)" class="navbar-link" @click="showLogin" v-if="!hasLogin">
            登录
          </a>
          <a href="javascript:void(0)" class="navbar-link" v-if="hasLogin">{{nickName}}</a>
          <a href="javascript:void(0)" class="navbar-link" @click="logout" v-if="hasLogin">退出</a>
        </div>
        <div class="navbar-cart-container" v-if="hasLogin">
          <span class="navbar-cart-count"></span>
          <router-link class="router-cart" to="/cart">
            <span class="cart-count">{{cartCount}}</span>
            <svg class="navbar-cart-logo cart-logo" style="width:20px;height:20px">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
            </svg>
          </router-link>
        </div>
      </div>
      <div class="login-dialog" v-if="loginVisible">
        <div class="login-title">
          <div>登录</div>
          <div class="close-dialog" @click="closeDialog">
            <i class="icon-close"></i>
          </div>
        </div>

        <div class="login-container">
          <div :class="{'err-remind-show':errorTip,'err-remind-hidden':!errorTip}">用户名或者密码错误</div>
          <div class="login-body">
            <ul>
              <li>
                <label class="icon-Userpersonalinform user"></label>
                <input type="text" class="regi_login_input" v-model="userName" placeholder="用户名">
              </li>
              <li>
                <label class="icon-password"></label>
                <input type="text" class="regi_login_input" v-model="userPwd" placeholder="密码">
              </li>
            </ul>
          </div>
          <div class="login-footer">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
      <div class="modal-back" v-if="loginVisible"></div>
    </div>

    <popBox v-if="popView" :width="250" :height="150" :popVisible="popView" @operatePop="operatePop">
      <div>确定退出吗</div>
    </popBox>
  </header>
</template>
<script>
import {login, checkLogin, logout, getCartCount} from '@/http/login'
import {mapState} from 'vuex'
import popBox from '@/components/popBox'
export default {
  data () {
    return {
      hasLogin: false,
      errorTip: false,
      userName: '',
      userPwd: '',
      loginVisible: false,
      popView: false
    }
  },
  created () {
    this.checkLogin()
  },
  components: {
    popBox
  },
  computed: {
    ...mapState({
      nickName: state => state.simple.nickName,
      cartCount: state => state.simple.cartCount
    })
  },
  methods: {
    // 检查登录情况
    checkLogin () {
      checkLogin().then(res => {
        if (res.status === '0') {
          this.$store.commit('UPDATE_USER_INFO', res.result)
          this.hasLogin = true
          this.getCartCount()
        }
      })
    },
    // 显示登录框
    showLogin () {
      this.loginVisible = true
    },
    // 关闭登录框
    closeDialog () {
      this.loginVisible = false
      this.userName = ''
      this.userPwd = ''
    },
    // 登录
    login () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        setTimeout(() => {
          this.errorTip = false
        }, 1000)
        return
      }
      login(Object.assign({}, {userName: this.userName, userPwd: this.userPwd})).then(resp => {
        if (resp.status === '0') {
          this.loginVisible = false
          this.hasLogin = true
          this.$store.commit('UPDATE_USER_INFO', resp.result.userName)
          this.userName = ''
          this.userPwd = ''
          this.getCartCount()
        } else {
          this.errorTip = true
          setTimeout(() => {
            this.errorTip = false
          }, 1000)
        }
      })
    },
    // 退出
    logout () {
      this.popView = true
    },
    operatePop (data) {
      if (!data) {
        this.popView = false
        return false
      }
      logout().then(resp => {
        if (resp.status === '0') {
          this.hasLogin = false
          this.popView = false
          this.$store.commit('UPDATE_USER_INFO', '')
        }
      })
    },
    // 获取购物车内数量
    getCartCount () {
      getCartCount().then(resp => {
        this.$store.commit('INIT_CART_COUNT', resp.result)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  height: 54px;
  line-height: 54px;
  padding-right: 30px;
  .login-dialog {
    position: fixed;
    width: 520px;
    height: 300px;
    padding: 20px 50px;
    padding-bottom: 30px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    z-index: 99;
    .login-title {
      display: flex;
      justify-content: space-between;
      div:first-child {
        font-size: 20px;
      }
      .close-dialog {
        cursor: pointer;
      }
    }
    .login-container {
      .login-body {
        ul {
          li {
            position: relative;
            .regi_login_input {
              width: 100%;
              height: 40px;
              border-radius: 3px;
              padding-left: 30px;
            }
            label {
              position: absolute;
              left: 10px;
              &.user {
                font-size: 20px;
              }
            }
          }
        }
      }
      .err-remind-show {
        color: red;
        height: 24px;
        line-height: 24px;
        opacity: 1;
        transition: all 1s ease-in-out;
      }
      .err-remind-hidden {
        color: red;
        height: 24px;
        line-height: 24px;
        opacity: 0;
        transition: all 1s ease-in-out;
      }
    }
    .login-footer {
      text-align: center;
      height: 38px;
      line-height: 38px;
      color: #fff;
      font-size: 16px;
      background-color: #009de6;
      border-radius: 3px;
      width: 100%;
      margin-top: 10px;
      .btn-login {
        background-color: #009de6;
      }
    }
  }
  .modal-back {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 9;
  }
  .navbar-right-container {
    display: flex;
    align-items: center;
    .navbar-cart-container {
      .router-cart {
        position: relative;
        .cart-count {
          position: absolute;
          top: -10px;
          font-size: 12px;
          width: 16px;
          height: 16px;
          background-color: red;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-logo {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
