<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <v-list :list='list' @pagechange='pagechange($event)' :userdata='userdata' :num='num' @edit='edit($event)' @init='init'></v-list>
      <v-add :judge='judge' @init='init' ref="add" :list='list' ></v-add>
  </div>
</template>

<script>
import {userlist ,usercount} from '../../utils/http'
import vList from './components/list'
import vAdd from './components/add'
export default {
  components:{
    vList,
    vAdd,
  },
  data() {
    return {
      judge:{
        isshow:false,
        isadd:false
      },
      list:[],
      //每页2条数据，
      userdata: {
        size: 2,
        page: 1,
      },
      num:0,
      pagesnow:0,
    }
  },
methods: {
  willAdd() {
      this.judge.isshow = true;
      this.judge.isadd = true;
    },
    //获取用户列表
    getlist() {
      userlist(this.userdata).then((res) => {
        if(res.data.code == 200){
          if(res.data.list.length==0&&this.userdata.page>1){
            this.userdata.page--
            this.getlist();
            return
          }

            this.list = res.data.list
        }
      });
    },
    //页面变化
    pagechange(e){
      this.userdata.page = e;
      this.getlist();
    },
    //点编辑
    edit(id){
      this.judge.isshow = true;
      this.judge.isadd = false;
      this.$refs.add.getOne(id);
    },
    //获取页数
    getpages(){
      usercount().then((res) => {
      if (res.data.code == 200) {
        this.num = res.data.list[0].total;
      }
    });
    },
    //重新渲染
    init(){
      this.getpages();
      this.getlist();
    }
},
mounted() {
  this.getpages()
  this.getlist()
},
}
</script>

<style>

</style>