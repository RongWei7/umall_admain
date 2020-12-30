<template>
  <div>
    <el-dialog
      :title="judge.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="judge.isshow"
    >
      {{ specsadddata }}
      <el-form :model="specsadddata">
        <el-form-item label="规格名称" label-width="100px">
          <el-input
            v-model="specsadddata.specsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button
              type="primary"
              class="line-btn"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              class="line-btn"
              v-else
              @click="delAttr(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="specsadddata.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="judge.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.judge.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="bj" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert , erroralert} from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import { specsadd, specsinfo, specsedit } from "../../../utils/http";
export default {
  props: ["judge"],
  data() {
    return {
      specsadddata: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqlist: "specs/reqlist",
      reqtotal: "specs/reqtotal",
    }),
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.specsadddata.specsname == "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.attrsArr.some((item) => item.value === "")) {
          erroralert("请正确输入商品规格属性");
          return;
        }

        reslove();
      });
    },
    //清空
    clear() {
      this.specsadddata = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    //弹框消失
    cancel() {
      if (!this.judge.isadd) {
        this.clear();
      }
      this.judge.isshow = false;
    },
    //新增属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    //删除属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    add() {
      this.specsadddata.attrs = JSON.stringify(
        this.attrsArr.map((item) => item.value)
      );
      this.checkprops().then(() => {
        specsadd(this.specsadddata).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.clear();
            successalert(res.data.msg);
            this.reqlist();
            this.reqtotal();
          }
        });
      });
    },
    getOne(id) {
      specsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.specsadddata = res.data.list[0];
          this.specsadddata.attrs = JSON.parse(this.specsadddata.attrs);
          this.attrsArr = this.specsadddata.attrs.map((item) => ({
            value: item,
          }));
        }
      });
    },
    bj() {
      this.specsadddata.attrs = JSON.stringify(
        this.attrsArr.map((item) => item.value)
      );
      this.checkprops().then(() => {
        specsedit(this.specsadddata).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.clear();
            successalert(res.data.msg);
            this.reqlist();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>