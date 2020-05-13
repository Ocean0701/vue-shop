import Vue from 'vue'
import Router from 'vue-router'

//引入一级组件
import DashBoard from './../views/dashboard/DashBoard'
//以下皆为路由懒加载（当点击后才加载）
const Home = ()=> import('./../views/home/Home.vue');
const Category = ()=> import('./../views/category/Category.vue');
const Cart = ()=> import('./../views/cart/Cart.vue');
//引入潮流新闻
// const Nav = () => import('./../views/home/components/nav')
const NewsInfo = () => import('./../views/home/components/nav/children/NewsInfo.vue')
const NewsBuy = () => import('./../views/home/components/nav/children/NewsBuy.vue')

//引入潮流新闻
const upload = () => import('./../views/home/components/identify/upload.vue')

//引入新品发布组件
const newItem = () => import('./../views/category/components/component/newItem.vue')


//用户中心
const Mine = ()=> import('./../views/mine/Mine.vue');
const UserCenter = () =>import('./../views/mine/children/UserCenter.vue');
const MineOrder = () =>import('./../views/mine/children/MineOrder.vue');
const MineIdentify = () => import('./../views/mine/children/MineIdentify.vue')//我的鉴定

//引入组件相关
const Order = () => import('./../views/order/Order.vue');
const MyAddress = () => import('./../views/order/children/MyAddress.vue')
const AddAddress = () => import('./../views/order/children/children/AddAddress.vue')
const EditAddress = () => import('./../views/order/children/children/EditAddress.vue')

//引入登录
const Login = () => import('./../views/login/Login.vue');

Vue.use(Router)

export default new Router({
    routes:[
        {path:'/',redirect:'/dashboard'},
        {
            path:'/dashboard',
            name:'dashboard',
            component:DashBoard,
            children:[
                {path:'/dashboard',redirect:'/dashboard/home'},
                {
                    path:'home',
                    name:'home',
                    component:Home,
                    meta:{keepAlive:true},
                    // children:[
                    //     {path:'news',name:'news',component:News}
                    // ]
                },
                {path:'category',name:'category',component:Category,meta:{keepAlive:true}},
                {path:'cart',name:'cart',component:Cart},
                {
                    path:'mine',
                    name:'mine',
                    component:Mine,
                    children:[
                        {path:'userCenter',component:UserCenter},//用户中心
                        {path:'mineorder',component:MineOrder},//我的订单
                        {path:'MineIdentify',component:MineIdentify}//我的鉴定
                    ]
                },
            ]
        },
        {
            path:'/confirmOrder',
            name:'order',
            component:Order,
            children:[
                {
                    path:'myAddress',
                    name:'myAddress',
                    component:MyAddress,
                    children:[
                        //添加地址路由
                        {path:'addAddress',name:'addAddress',component:AddAddress},
                        //编辑地址
                        {path:'editAddress',name:'editAddress',component:EditAddress}
                    ]
                }
            ]
        },
        {path:'/login',name:'login',component:Login},
        {path:'/dashboard/home/newsinfo',name:'newsinfo',component:NewsInfo},
        {path:'/dashboard/home/newsbuy',name:'newsbuy',component:NewsBuy},
        {path:'/dashboard/home/upload',name:'upload',component:upload},
        {path:'/dashboard/category/newItem',name:'newItem',component:newItem},
    ]
})