<template>
  <div>
    <el-dialog
      :title="isshow.isadd ? '添加菜单' : '编辑菜单'"
      :visible.sync="isshow.isshow"
      modal
      close-on-press-escape
    >
      <el-form :model="adddate">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="adddate.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="adddate.pid" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="adddate.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="adddate.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          label-width="100px"
          v-if="adddate.type == 1"
        >
          <el-select v-model="adddate.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="adddate.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '--' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="adddate.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshow.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="isshow.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="xg" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router";
import { menuadd, menuinfo, menuedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["isshow", "list"],
  data() {
    return {
      adddate: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRoutes,
    };
  },
  methods: {
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.adddate.title == "") {
          erroralert("菜单名称不能为空");
          return;
        }

        reslove();
      });
    },
    clearadd() {
      this.adddate = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      this.checkprops().then(() => {
        //请求数据
        menuadd(this.adddate).then((res) => {
          successalert(res.data.msg);
          //弹框消失
          this.isshow.isshow = false;
          // 清空adddate
          this.clearadd();
          //重新渲染
          this.$emit("init");
        });
      });
    },
    changePid() {
      if (this.adddate.pid === 0) {
        this.adddate.type = 1;
      } else {
        this.adddate.type = 2;
      }
    },
    getOne(id) {
      menuinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.adddate = res.data.list;
          this.adddate.id = id;
        }
      });
    },
    xg() {
      this.checkprops().then(() => {
        //发请求
        menuedit(this.adddate).then((res) => {
          successalert(res.data.msg);
          //门板消失
          this.isshow.isshow = false;
          //初始化adddate
          this.clearadd();
          //重新渲染
          this.$emit("init");
        });
      });
    },
  },
};
</script>

<style>
</style>