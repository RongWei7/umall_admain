<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <!-- 侧边栏 
        background-color 背景色
        text-color 文字的颜色
        active-text-color 激活的时候文字的颜色
        unique-opened	是否只保持一个子菜单的展开
        router 开启路由模式，index就是配置path
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key = 'item.id'>
            <!-- 单纯是菜单 -->
            <el-menu-item v-if="!item.children" :index="'/index'+item.url">{{item.title}}</el-menu-item>
            <!-- 有目录，有菜单 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="'/index'+i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="fr headerInfo">
            <el-button type="info" round @click="logout" class="logout">退出登录</el-button>
            <i>{{userInfo.username}}</i>
            <i class="el-icon-s-tools"></i>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      userInfo:'userInfo'
    })
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    logout(){
      this.changeUser({});
      this.$router.replace('/login');
    },
  },
};
</script>

<style scoped>
.index {
  height: 100vh;
}
.el-aside {
  background: rgb(32, 34, 42);
}
.el-header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
.headerInfo{
  padding: 20px 0;
  font-size: 16px;
}
.logout{
  height: 18px;
  padding: 5px;
}
</style>