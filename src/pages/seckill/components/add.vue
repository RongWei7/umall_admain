<template>
  <div>
    <el-dialog
      :title="judge.isadd ? '活动添加' : '活动修改'"
      :visible.sync="judge.isshow"
    >
      <el-form :model="seckilladddata">
        <el-form-item label="活动名称" label-width="100px">
          <el-input
            v-model="seckilladddata.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动时间" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              @change="timechange"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" label-width="100px">
          <el-select
            v-model="seckilladddata.first_cateid"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in goodscate"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select
            v-model="seckilladddata.second_cateid"
            placeholder="请选择"
            @change="change2"
          >
            <el-option
              v-for="sitem in second_list"
              :key="sitem.id"
              :value="sitem.id"
              :label="sitem.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="seckilladddata.goodsid" placeholder="请选择">
            <el-option
              v-for="gitem in goodslists"
              :key="gitem.id"
              :value="gitem.id"
              :label="gitem.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="seckilladddata.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.judge.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="bj" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  catelist,
  goodslist,
  seckadd,
  seckinfo,
  seckedit,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["judge", "list"],
  data() {
    return {
      seckilladddata: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      goodscate: [],
      second_list: [],
      goodslists: [],
      value2: [],
    };
  },
  methods: {
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.seckilladddata.title == "") {
          erroralert("活动名称不能为空");
          return;
        }
        if (
          this.seckilladddata.begintime == "" ||
          this.seckilladddata.endtime == ""
        ) {
          erroralert("请输入正确的活动时间");
          return;
        }
        if (this.seckilladddata.first_cateid == "") {
          erroralert("请选择一级分类");
          return;
        }
        if (this.seckilladddata.second_cateid == "") {
          erroralert("请选择二级分类");
          return;
        }
        if (this.seckilladddata.goodsid == "") {
          erroralert("请选择商品");
          return;
        }

        reslove();
      });
    },
    clear() {
      this.judge.isshow = false;
      this.seckilladddata = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value2 = [];
    },
    timechange() {
      this.seckilladddata.begintime = this.value2[0].getTime();
      this.seckilladddata.endtime = this.value2[1].getTime();
    },
    change(e) {
      //将二级分类清空
      this.seckilladddata.second_cateid = "";
      this.seckilladddata.goodsid = "";
      this.getSecondList();
    },
    getSecondList() {
      let result = this.goodscate.find((item, index) => {
        return item.id == this.seckilladddata.first_cateid;
      });
      this.second_list = result.children;
    },
    change2(e) {
      this.seckilladddata.goodsid = "";

      this.getGoodsList();
    },
    //商品列表
    getGoodsList() {
      goodslist({
        fid: this.seckilladddata.first_cateid,
        sid: this.seckilladddata.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodslists = res.data.list;
        }
      });
    },
    add() {
      this.checkprops().then(() => {
        seckadd(this.seckilladddata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.clear();
            this.$emit("init");
          }
        });
      });
    },
    bj() {
      this.checkprops().then(() => {
        seckedit(this.seckilladddata).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.clear();
            this.$emit("init");
          }
        });
      });
    },
    qx() {
      this.clear();
    },
    getOne(id) {
      seckinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.seckilladddata = res.data.list;
          this.seckilladddata.id = id;
          this.value2 = [
            new Date(parseInt(this.seckilladddata.begintime)),
            new Date(parseInt(this.seckilladddata.endtime)),
          ];
          this.getSecondList();
          this.getGoodsList();
        }
      });
    },
  },
  mounted() {
    //获取商品分类列表，用来渲染一级商品分类
    catelist({ istree: true }).then((res) => {
      this.goodscate = res.data.list;
    });
  },
};
</script>

<style scoped>
.avatar {
  width: 100%;
  height: 100%;
}
</style>