<template>
  <div class="login">
    <div class="con">
      <h3 class="loginTit">登录</h3>
      <div class="ipt">
        <el-input
          v-model="user.username"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </div>
      <div class="ipt">
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          clearable
          show-password
          @change="login"
        ></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../../utils/http";
import { successalert, erroralert } from "../../utils/alert";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //封装验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.username == "") {
          erroralert("账号不能为空");
          return;
        }

        if (this.user.password == "") {
          erroralert("请输入密码");
          return;
        }

        resolve();
      });
    },
    login() {
      this.checkProps().then(() => {
        userLogin(this.user).then((res) => {
          if (res.data.code == 200) {
            //用户信息存到store
            this.changeUser(res.data.list);
            this.$router.push("/index");
            successalert(res.data.msg);
          }
        });
      });
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.loginTit {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 20px;
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.ipt {
  margin: 20px;
}
.center {
  width: 400px;
  text-align: center;
}
.center button {
  width: 93%;
}
</style>