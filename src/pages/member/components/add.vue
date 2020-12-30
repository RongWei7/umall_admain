<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="judge.isshow">
      <el-form :model="memberdata">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="memberdata.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="memberdata.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="memberdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="memberdata.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="bj">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { memberinfo, membereditt } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["judge", "list"],
  data() {
    return {
      memberdata: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.memberdata.phone == "") {
          erroralert("手机号不能为空");
          return;
        }
        if (this.memberdata.nickname == "") {
          erroralert("昵称不能为空");
          return;
        }
        if (this.memberdata.password == "") {
          erroralert("请输入密码");
          return;
        }

        reslove();
      });
    },
    clear() {
      this.judge.isshow = false;
      this.memberdata = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    bj() {
      this.checkprops().then(() => {
        membereditt(this.memberdata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.clear();
            this.$emit("init");
          }
        });
      });
    },
    qx() {
      this.clear();
    },
    getOne(id) {
      memberinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.memberdata = res.data.list;
          this.memberdata.password = "";
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.avatar {
  width: 100%;
  height: 100%;
}
</style>