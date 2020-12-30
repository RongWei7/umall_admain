<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号" width="100">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" >
      </el-table-column>
      <el-table-column prop="phone" label="手机号" >
      </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编 辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { catedelete } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>