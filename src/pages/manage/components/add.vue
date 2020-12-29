<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="judge.isshow">
      <el-form :model="useradddata">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="useradddata.roleid" placeholder="请选择">
            <el-option
              v-for="item in rlist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input
            v-model="useradddata.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            v-model="useradddata.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="useradddata.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="judge.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="judge.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="xg" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rolelist, useradd, userinfo, useredit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["judge", "list"],
  data() {
    return {
      useradddata: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rlist: [],
    };
  },
  methods: {
    clear() {
      this.judge.isshow = false;
      this.useradddata = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    getOne(id) {
      userinfo({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.useradddata = res.data.list;
          this.useradddata.password = "";
        }
      });
    },
    xg() {
      useredit(this.useradddata).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
          this.clear();
        }
      });
    },
    add() {
      if (this.useradddata.roleid != "" && this.useradddata.username != "") {
        useradd(this.useradddata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.$emit("init");
            this.clear();
          }
        });
      } else {
        erroralert("所属角色或用户名不能为空");
      }
    },
  },
  mounted() {
    rolelist().then((res) => {
      if (res.data.code == 200) {
        this.rlist = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>