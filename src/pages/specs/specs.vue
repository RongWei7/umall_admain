<template>
  <div>
      <el-button type="primary" @click="willadd">添 加</el-button>
      <v-list @edit = 'edit($event)'></v-list>
      <v-add :judge='judge' ref="add"></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
  data() {
    return {
      judge:{
        isshow:false,
        isadd:false
      }
    }
  },
  components:{
    vList,
    vAdd
  },
  methods: {
    willadd(){
      this.judge.isshow = true;
      this.judge.isadd = true
    },
    edit(id){
      this.judge.isshow = true;
      this.judge.isadd = false;
      this.$refs.add.getOne(id);
    }
  },
}
</script>

<style>

</style>