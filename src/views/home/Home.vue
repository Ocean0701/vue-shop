<template>
    <div id="home" v-if="!showLoading">
        <!-- 头部 -->
        <Header/>
        <!-- 轮播图 -->
        <Sowing :sowing_list="sowing_list"/>
        <!-- 中部导航 -->
        <Nav :nav_list="nav_list"/>
        <!-- 抢购 -->
        <FlashSale :flash_sale_product_list="flash_sale_product_list"/>
        <!-- 鉴定 -->
        <identify :flash_sale_product_list="flash_sale_product_list"/>
        <!-- 新闻 -->
        <NewsItem />
        <!-- 猜你喜欢 -->
        <YouLike :you_like_product_list="you_like_product_list" />
        <!-- 返回顶部 -->
        <MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop"/>
    </div>
    
    <van-loading
        v-else type="spinner"
        color="#1989fa" 
        size="24px"
        style="position:absolute; left:50%; top:40%; transform:translate(-50%)"
    >GET正在加载中...</van-loading>

   
</template>

<script>
//引入方法
import {addGoodsToCart} from './../../service/api/index'
//引入头部组件
import Header from './components/header/Header'
//引入轮播图组件
import Sowing from './components/sowing/Sowing'
//引入nav组件
import Nav from './components/nav/Nav'
//引入抢购组件
import FlashSale from './components/flashSale/FlashSale'
//引入鉴定组件
import identify from './components/identify/identify'
//引入新闻组件
import NewsItem from './components/nav/children/NewsItem'
//引入猜你喜欢
import YouLike from './components/youlike/YouLike'
//引入返回顶部组件
import MarkPage from './components/markPage/MarkPage'

//引入处理返回顶部的函数
import {showBack,animate} from '../../config/global'
//引入通知插件
import PubSub from 'pubsub-js'
//引入弹窗插件
import { Toast } from 'vant';
//引入vuex
import {mapMutations,mapState} from 'vuex'
//引入本地json数据
var data = require('./../../data/home.json')

export default {
    name:"Home",
    data(){
        return{
            //首页轮播图数据
            sowing_list:[],
            //中部导航
            nav_list:[],
            //秒杀数据
            flash_sale_product_list:[],
            //猜你喜欢数据
            you_like_product_list:[],
            //是否出现加载图标
            showLoading:true,
            //是否显示回到顶部按钮
            showBackStatus:false
        }
    },
    created(){
        let docB = document.documentElement||document.body;
        //在400ms内以ease-out方式滚到顶部
        animate(docB,{scrollTop:'0'},1,'ease-out');
        //操作数据
        // console.log(data)
            if(data.success){
                //传入数据
                this.sowing_list = data.data.list[0].icon_list;
                this.nav_list = data.data.list[2].icon_list;
                this.flash_sale_product_list = data.data.list[3].product_list;
                this.you_like_product_list = data.data.list[12].product_list;
                // console.log(this.you_like_product_list)
                //隐藏加载动画
                this.showLoading = false

                //开始监听滚动
                showBack((status)=>{
                    this.showBackStatus = status;
                })
            }
        
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
        //订阅消息（添加到购物车的消息）
        PubSub.subscribe('homeAddToCart',(msg,goods)=>{
            if(msg=='homeAddToCart'){
                //判断用户是否登录
                if(this.userInfo.id){//已经登录
                this.dealGoodsAdd(goods)
                    
                }else{//没有登录
                    this.$router.push('/login')
                }
                
            }
        })
    },
    components:{
        Header,
        Sowing,
        Nav,
        FlashSale,
        YouLike,
        MarkPage,
        NewsItem,
        identify
    },
    methods: {
        ...mapMutations(["ADD_GOODS"]),
        // 1.滚回顶部
        scrollToTop(){
            let docB = document.documentElement||document.body;
            //在400ms内以ease-out方式滚到顶部
            animate(docB,{scrollTop:'0'},400,'ease-out');
        },
        //2.添加商品到购物车
        async dealGoodsAdd(goods){
            let result = await addGoodsToCart('5d81a771083a85666a923d66',goods.id,goods.name,goods.price,goods.small_image)
            // console.log(result)
            if(result.success_code === 200){
                this.ADD_GOODS({
                    goodsId:goods.id,
                    goodsName:goods.name,
                    smallImage:goods.small_image,
                    goodsPrice:goods.price
                    });
                    //提示用户
                    Toast({
                        message:'添加到购物车成功',
                        duration:800
                    });
            }
        }
    },
    //用订阅一定要销毁
    beforeDestroy() {
            PubSub.unsubscribe('homeAddToCart')
        }
}
</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: auto;
        background-color: #f5f5f5;
    }
</style>