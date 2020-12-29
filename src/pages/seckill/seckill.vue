<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <v-list :list='list' @init='init'  @edit='edit($event)'></v-list>
      <v-add :judge='judge' :list='list' @init='init' ref="add"></v-add>
  </div>
</template>

<script>
import {secklist} from '../../utils/http'
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
    }
  },
methods: {
  willAdd(){
    this.judge.isshow = true;
    this.judge.isadd = true;
  },
  //获取列表
  getList(){
    secklist().then(res=>{
      if(res.data.code == 200){
        this.list = res.data.list
      }
    })
  },

  //渲染列表
  init(){
    this.getList();
  },

  //编辑
  edit(id){
      this.judge.isshow = true;
      this.judge.isadd = false;
      this.$refs.add.getOne(id);
    },
  
},
mounted() {
  this.getList();
},
}
</script>

<style>

</style>