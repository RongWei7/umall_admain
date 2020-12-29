<template>
  <div>
      <el-button type="primary" @click="willAdd">添加</el-button>

      <v-list @getrole='getrole' :list='list' @edit="edit($event)"></v-list>
      <v-add :judge='judge' :list='list' @getrole='getrole' ref="add" @init = 'init'></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from './components/add'
import {rolelist} from '../../utils/http'
export default {
  data() {
    return {
      list:[],
      judge:{
        isshow:false,
        isadd:false
      },
    }
  },
  components:{
    vList,
    vAdd
  },
  methods: {
    willAdd(){
      //门板出现
      this.judge.isshow = true;
      //是添加
      this.judge.isadd = true;
    },
    //获取角色列表
    getrole(){
      rolelist().then(res=>{
        if(res.data.code == 200){
          this.list = res.data.list;
        }
      })
    },
    edit(id) {
      //弹框出现
      this.judge.isshow = true;
      //是编辑
      this.judge.isadd = false;
      //触发add的getOne()
      this.$refs.add.getOne(id);
    },
    init(){
      this.getrole();
    }
  },
  mounted() {
    this.getrole();
  },
}
</script>

<style>

</style>