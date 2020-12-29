<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" width="100px">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="100px">
      </el-table-column>
      <el-table-column label="商品价格" width="100px">
          <template slot-scope="scope">
          <div>￥{{scope.row.price|filterPrice}}</div>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" width="100px">
          <template slot-scope="scope">
          <div>￥{{scope.row.market_price|filterPrice}}</div>
        </template>
      </el-table-column>
       <el-table-column label="图片">
        <template slot-scope="scope">
         <img :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
       <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
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
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "goods/reqList",
      reqtotal: "goods/reqTotal",
      changePage: "goods/changePage",
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
img{
    width: 100%;
    height: 100%;
}
</style>