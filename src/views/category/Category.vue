<template>
    <div id="category">
        <!-- 头部 -->
        <Header/>
        <!-- 内容 -->
        <div class="listWrapper"  v-if="!showLoading">
            <!--左边-->
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li
                        class="categoryItem"
                        :class="{selected:currentIndex === index}"
                        @click="clickLeftLi(index)"
                        v-for="(cate,index) in categoriesData"
                        :key="cate.id"
                        ref="menuList"
                    >
                        <span class="textWrapper">{{cate.name}}</span>
                    </li>
                </ul>
            </div>
            <!-- 右边 -->
            <ContentView :categoriesDetailData="categoriesDetailData"/>
        </div>
        
        <van-loading
            v-else type="spinner"
            color="#1989fa" 
            size="24px"
            style="position:absolute; left:50%; top:40%; transform:translate(-50%)"
        >GET正在加载中...</van-loading>
    </div>
</template>

<script>
import axios from 'axios'
//引入头部组件
import Header from './components/Header'
//引入左边栏组件
import ContentView from './components/ContentView'
//引入滚动组件 
import BScroll from 'better-scroll'

//引入通知插件
import PubSub from 'pubsub-js'
//引入弹窗插件
import { Toast } from 'vant';
//引入vuex
import {mapMutations} from 'vuex'

//引入左边json数据
var dataLeft = require('./../../data/category.json')
//引入右边json数据
var dataRight = require('./../../data/categoryDet.json')
export default {
    name:"Category",
    data(){
        return{
            //是否出现加载图标
            showLoading:true,
            //左边列表数据
            categoriesData:[],
            //右边对应数据
            categoriesDetailData:[],
            //当前被选中的索引
            currentIndex:0

        }
    },
    created () {
        //渲染左边数据
        if(dataLeft.success){
            this.categoriesData = dataLeft.data.cate

            //隐藏loading
            this.showLoading = false;
            //初始化滚动框架
            //$nextTick是将回调延迟到下次dom更新循环后执行
            this.$nextTick(()=>{
                this.leftScroll = new BScroll('.leftWrapper',{probeType:3})
            });
        }
        //渲染右边数据
        axios.get('/api/cart/data',{params:{type:0}}).then(res=>{
            console.log(res.data.data)
            this.categoriesDetailData = res.data.data;
        })
        // if(dataRight.success){
        //     console.log(dataRight.data.cate)
        //     this.categoriesDetailData = dataRight.data.cate[0]
        // }
    },
    mounted() {
        
    },
    methods: {
        ...mapMutations(["ADD_GOODS"]),
        initData(){
            
        },
        //左边被点击后
        clickLeftLi(index){
            //改变索引
            this.currentIndex = index;
            //滚动到对应位置
            let menuList = this.$refs.menuList;
            let el = menuList[this.currentIndex];
            this.leftScroll.scrollToElement(el,300);

            //获取右边数据
            //再次引入右边json数据
            // var dataRight = require('./../../data/categoryDet.json')
            // console.log(dataRight.data.cate[index])
            //显示点击对应的数据
            // this.categoriesDetailData = dataRight.data.cate[index]
            axios.get('/api/cart/data',{params:{type:index}}).then(res=>{
                console.log(res.data.data)
                this.categoriesDetailData = res.data.data;
            })
        }
    },
    components: {
        Header,
        ContentView
    }
}
</script>

<style scoped>
    #category {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        overflow: hidden;
    }

    .listWrapper {
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 3rem;
        width: 100%;
        overflow: hidden;
    }

    .leftWrapper {
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }

    .categoryItem {
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
        position: relative;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }

    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }

        .wrapper .categoryItem {
            background: #fff;
        }
    }
</style>