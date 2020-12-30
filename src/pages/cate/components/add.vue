<template>
  <div>
    <el-dialog
      :title="judge.isadd ? '商品添加' : '商品修改'"
      :visible.sync="judge.isshow"
    >
      <el-form :model="cateadddata">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="cateadddata.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in notreelist"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input
            v-model="cateadddata.catename"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="100px"
          v-if="cateadddata.pid != 0 && judge.isadd"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="changeImg"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="imgUrl"
                alt="图片"
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="100px"
          v-if="cateadddata.pid !== 0 && !judge.isadd"
        >
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="cateadddata.status"
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
import { catelist, cateadd, cateinfo, cateedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["judge", "list"],
  data() {
    return {
      cateadddata: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      notreelist: [],
      imgUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      file: {
        imgUrl: "",
      },
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    //验证函数
    checkprops() {
      return new Promise((reslove) => {
        if (this.cateadddata.catename == "") {
          erroralert("分类名称不能为空");
          return;
        }

        reslove();
      });
    },
    changeImg(e) {
      let file = e.raw;
      //判断
      this.cateadddata.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    clear() {
      this.judge.isshow = false;
      this.cateadddata = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    add() {
      this.checkprops().then(() => {
        cateadd(this.cateadddata).then((res) => {
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
        cateedit(this.cateadddata).then((res) => {
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
      cateinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.cateadddata = res.data.list;
          this.cateadddata.id = id;
          this.imgUrl = this.$pre + this.cateadddata.img;
        }
      });
    },
  },
  mounted() {
    //没有树形结构的数据列表，用来渲染上级分类
    catelist().then((res) => {
      if (res.data.code == 200) {
        this.notreelist = res.data.list;
      }
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