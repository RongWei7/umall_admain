<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="100">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="warning" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roledelete } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["list"],
  mounted() {
    // console.log(this.list);
  },
  data() {
    return {};
  },
  methods: {
    edit(id) {
      //通知父组件有人点了编辑按钮
      this.$emit("edit", id);
    },
    del(id) {
      roledelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("getrole");
        }
      });
    },
  },
};
</script>

<style>
</style>