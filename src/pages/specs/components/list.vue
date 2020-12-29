<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" width="100px">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="100px">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.attrs"
            type="success"
            :key="item"
            effect="dark"
            class="tag"
            >{{ item }}</el-tag
          >
          &nbsp;
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="warning" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changepages"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successalert } from "../../../utils/alert";
import { specsdelete } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "specs/reqlist",
      reqtotal: "specs/reqtotal",
      changePage: "specs/changePage",
    }),
    changepages(e) {
      this.changePage(e);
    },
    edit(id){
        this.$emit('edit',id)
    },
    del(id) {
      specsdelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.reqlist();
          this.reqtotal();
          successalert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqlist();
    this.reqtotal();
  },
};
</script>

<style scoped>
.tag {
  margin: 0 5px;
}
</style>