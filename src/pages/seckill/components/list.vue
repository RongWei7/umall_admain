<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称">
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
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { seckdelete } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      seckdelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.$emit("init");
          successalert(res.data.msg);
        }
      });
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