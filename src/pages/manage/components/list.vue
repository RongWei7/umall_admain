<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="100px">
      </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="num"
      :page-size="2"
      @current-change="pagechange($event)"
    >
    </el-pagination>
  </div>
</template>

<script>
import { userdelete } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["list", "userdata", "num"],
  data() {
    return {};
  },
  mounted() {
    this.pagechange(1);
  },
  methods: {
    pagechange(e) {
      this.$emit("pagechange", e);
    },
    del(id) {
      userdelete({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.$emit('init');
          successalert(res.data.msg);
        }
      });
    },
    edit(id) {
      this.$emit('edit',id);
    },
  },
};
</script>

<style>
</style>