<template>
  <div>
    <el-dialog
      :title="judge.isadd ? '轮播图添加' : '轮播图修改'"
      :visible.sync="judge.isshow"
    >
      <el-form :model="banneradddata">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="banneradddata.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px" v-if="judge.isadd">
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
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="100px"
          v-if="banneradddata.pid !== 0 && !judge.isadd"
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
            v-model="banneradddata.status"
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
import { banneradd, bannerinfo, banneredit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["judge", "list"],
  data() {
    return {
      banneradddata: {
        title: "",
        img: null,
        status: 1,
      },
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
        if (this.banneradddata.title == "") {
          erroralert("标题不能为空");
          return;
        }

        reslove();
      });
    },
    changeImg(e) {
      let file = e.raw;
      //判断
      this.banneradddata.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    clear() {
      this.judge.isshow = false;
      this.banneradddata = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    add() {
      this.checkprops().then(() => {
        banneradd(this.banneradddata).then((res) => {
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
        banneredit(this.banneradddata).then((res) => {
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
      bannerinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.banneradddata = res.data.list;
          this.banneradddata.id = id;
          this.imgUrl = this.$pre + this.banneradddata.img;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.avatar {
  width: 100%;
  height: 100%;
}
</style>