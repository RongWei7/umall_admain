<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @edit="edit($event)" @init="init"></v-list>
    <v-add :isshow="isshow" :list="list" ref="add" @init="init"></v-add>
  </div>
</template>

<script>
import { menulist } from "../../utils/http";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  mounted() {
    this.init();
  },
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      isshow: {
        isshow: false,
        isadd: false,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.isshow.isshow = true;
      this.isshow.isadd = true;
    },
    edit(id) {
      //弹框出现
      this.isshow.isshow = true;
      //43.是编辑
      this.isshow.isadd = false;
      //触发add的getOne()
      this.$refs.add.getOne(id);
    },
    //获取列表/重新渲染
    init() {
      menulist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
  },
};
</script>

<style>
</style>