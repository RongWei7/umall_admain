<template>
  <div>
    <el-dialog title="角色添加" :visible.sync="judge.isshow">
      <el-form>
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="adddata.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="adddata.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="resdata"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            @check-change="handleCheckChange"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="qd" v-if="judge.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="bj" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import { roleinfo, menulist, roleadd, roleedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["judge", "list"],
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  mounted() {
    menulist().then((res) => {
      this.resdata = res.data.list;
    });
  },
  data() {
    return {
      adddata: {
        rolename: "",
        menus: "",
        status: 1,
      },
      resdata: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.adddata.rolename == "") {
          erroralert("角色名称不能为空");
          return;
        }
        if (this.adddata.menus == "" || this.adddata.menus == "[]") {
          erroralert("角色不能没有权限");
          return;
        }

        reslove();
      });
    },
    //获取一条信息
    getoneinfo(id) {
      let idtorolename = "";
      roleinfo({ id: id }).then((res) => {
        idtorolename = res.data.rolename;
      });
      return idtorolename;
    },
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes();
      this.adddata.menus = JSON.stringify(res.map((item) => item.id));
    },
    //初始化adddata
    clearadddata() {
      this.adddata = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    //清空选中角色
    clearrole() {
      this.$refs.tree.setCheckedKeys([]);
    },
    qx() {
      this.judge.isshow = false;
      this.clearadddata();
      this.clearrole();
    },
    qd() {
      this.checkprops().then(() => {
        roleadd(this.adddata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.qx();
            this.$emit("getrole");
          }
        });
      });
    },
    bj() {
      this.checkprops().then(() => {
        //先存储树形结构数据
        this.adddata.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleedit(this.adddata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            if (this.adddata.id == this.userInfo.roleid) {
              this.changeUser({});
              this.$router.push("/login");
              console.log(111);
              return;
            }
            this.qx();
            this.$emit("init");
          }
        });
      });
    },
    getOne(id) {
      roleinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.adddata = res.data.list;
          this.adddata.id = id;
          let arr = eval("(" + this.adddata.menus + ")");
          this.$refs.tree.setCheckedKeys(arr);
        }
      });
    },
  },
};
</script>

<style>
</style>