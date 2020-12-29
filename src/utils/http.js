import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'postcss-url'
import { erroralert } from "./alert"
import store from '../store'

//开发环境 8080
let baseUrl = '/api'
Vue.prototype.$pre = 'http://localhost:3000'
Vue.prototype.$preimg = 'http://127.0.0.1:3000' //图片地址 

//生产环境 3000
// let baseUrl = ''
// Vue.prototype.$pre = ''


// post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

//请求拦截，设置请求头
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+'/api/userlogin'){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})


//响应拦截
axios.interceptors.response.use(res => {
    // console.group("本次请求的地址是："+res.config.url)
    // console.log(res)
    // console.groupEnd()
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    //统一处理list是null的情况
    if(!res.data.list){
        res.data.list = []
    }
    //掉线处理
    if(res.data.msg==="登录已过期或访问权限受限"){
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser",{})
        //跳到登录页面
        router.push("/login")
    }

    return res
})

//登录请求
export let userLogin = (user) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: "post",
        data: user
    })
}


//获取菜单列表
export let menulist = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }

    })
}

//菜单添加
export let menuadd = (adddate) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: adddate
    })
}

//获取一个菜单
export let menuinfo = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: id

    })
}

//修改菜单
export let menuedit = (adddate) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: adddate
    })
}

//删除菜单
export let menudelete = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: id
    })
}

//获取角色列表
export let rolelist = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    })
}

//获取一个角色信息
export let roleinfo = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: id
    })
}

//角色添加
export let roleadd = (adddata) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: adddata
    })
}

//角色删除
export let roledelete = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: id
    })
}

//角色修改
export let roleedit = (data) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: data
    })
}

//获取管理员总数
export let usercount = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get'
    })
}

//获取管理员列表
export let userlist = (userdata) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: userdata
    })
}

//管理员添加
export let useradd = (adddata) =>{
    return axios({
        url:baseUrl + '/api/useradd',
        method:'post',
        data:adddata
    })
}

//管理员删除
export let userdelete = (id) =>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:id
    })
}

//获取一条管理员信息
export let userinfo = (id) =>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:id
    })
}

//管理员修改
export let useredit = (userdata)=>{
    return axios({
        url:baseUrl + '/api/useredit',
        method:'post',
        data:userdata
    })
}

//获取商品分类列表
export let catelist = (data)=>{
return axios({
    url:baseUrl+'/api/catelist',
    method:'get',
    params:data
})
}

//商品分类添加
export let cateadd = (data)=>{
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:dataToFormData(data)
    })
}

//商品分类删除
export let catedelete = (id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
    })
}

//获取一条分类商品信息
export let cateinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:id
    })
}

//商品分类修改
export let cateedit=(data)=>{
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:dataToFormData(data)
    })
}

//获取轮播图列表
export let bannerlist = ()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get'
    })
}

//轮播图添加
export let banneradd = (data)=>{
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:dataToFormData(data)
    })
}

//获取一条轮播图信息
export let bannerinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:id
    })
}

//轮播图修改
export let banneredit=(data)=>{
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:dataToFormData(data)
    })
}

//轮播图删除
export let bannerdelete = (id) =>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:id
    })
}

//获取会员列表
export let memberlist = ()=>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:'get'
    })
}

//获取一条会员信息
export let memberinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:id
    })
}

//会员信息修改
export let membereditt=(data)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data:data
    })
}

//获取商品规格列表
export let specslist = (data)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:data
    })
}

//获取商品规格总数
export let specscount = ()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get'
    })
}

//商品规格添加
export let specsadd = (data)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:data
    })
}

//获取一条商品规格信息
export let specsinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:id
    })
}

//商品规格修改
export let specsedit=(data)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:data
    })
}

//商品规格删除
export let specsdelete = (id) =>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:id
    })
}

//获取限时秒杀列表
export let secklist = ()=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get'
    })
}

//获取一条限时秒杀信息
export let seckinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:id
    })
}

//限时秒杀添加
export let seckadd = (data)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:data
    })
}

//限时秒杀修改
export let seckedit=(data)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:data
    })
}

//限时秒杀删除
export let seckdelete = (id) =>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:id
    })
}

//获取商品列表
export let goodslist = (data)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:data
    })
}

//商品添加
export let goodsadd = (data)=>{
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:dataToFormData(data)
    })
}

//获取商品规格总数
export let goodscount = ()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get'
    })
}

//获取一条商品信息
export let goodsinfo = (id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:id
    })
}

//商品修改
export let goodsedit=(data)=>{
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:dataToFormData(data)
    })
}

//商品删除
export let goodsdelete = (id) =>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:id
    })
}