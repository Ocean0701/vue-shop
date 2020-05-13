<template>
    <div id="mine" v-if="userInfo.id">
        <!-- 头部 -->
        <van-nav-bar
          title="我的"
          :fixed=true
          :border=false
        />
        <!-- 用户 -->
        <van-cell-group style="margin-top:2.6rem">
            <van-cell
                is-link
                style="background-color:#2eba5a; color:#fff;"
                :center=true
                label-class="labelClass"
                @click="$router.push('/dashboard/mine/userCenter')"
            >
              <template slot="title">
                <div class="personMsg">
                    <img :src="userInfo.icon_url" alt="">
                    <div class="personInfo">
                        <span>{{userInfo.real_name}}</span>
                        <span>手机号：{{userInfo.phone}}</span>
                    </div>
                </div>
              </template>
            </van-cell>
        </van-cell-group>
        
        <van-cell-group>
            <van-cell 
                icon="label" 
                :title="title"
                value="查看所有的订单" 
                @click="mineRoute"
                is-link
            />
            <router-link tag="div" :to="{path:'/dashboard/mine/mineOrder'}">
                <van-grid>
                    <van-grid-item icon="cart-circle" text="待支付" />
                    <van-grid-item icon="send-gift-o" text="待收货" />
                    <van-grid-item icon="chat-o" text="待评价" />
                    <van-grid-item icon="refund-o" text="售后/退款" />
                </van-grid>
            </router-link>
        </van-cell-group>

        <van-cell-group style="margin-top:0.6rem">
            <van-cell icon="gold-coin" title="我的优惠券" value="查看所有的订单" is-link/>
            <van-cell icon="todo-list" title="我的收货地址"  is-link/>
        </van-cell-group>
        <van-cell-group style="margin-top:0.6rem">
            <van-cell icon="service" title="联系客服" value="客服时间 07:00-22:00" is-link/>
            <van-cell icon="comment" title="意见反馈"  is-link/>
        </van-cell-group>

        <!-- 路由出口 -->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <SelectLogin v-else/>
</template>

<script>
import SelectLogin from './../../views/login/SelectLogin';
import {mapState} from 'vuex';
export default {
    name:"Mine",
    data() {
        return {
            title:"我的订单",
        }
    },
    computed: {
         ...mapState(["userInfo"]),
    },
    methods: {
        mineRoute(){
            if(this.title=="我的订单"){
                this.$router.push({path:'/dashboard/mine/mineOrder'})
            }else{
                this.$router.push({path:'/dashboard/mine/mineIdentify'})
            }
        }
    },
    updated(){
        if(this.$store.state.userInfo.type==1){
            this.title = "我的鉴定";
        }
    },
    created() {
        if(this.$store.state.userInfo.type==1){
            this.title = "我的鉴定";
        }
    },
    components: {
        SelectLogin
    }
}
</script>

<style lang="less" scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .van-nav-bar{
        background-color: #3bba63;
    }
    .van-nav-bar__title{
        color: #fff;
        font-size: 1rem;
    }
    .personMsg{
        display: flex;
        // flex-direction: row;
        align-items: center;
    }
    .personMsg>img{
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.12rem solid #fff
    }
    .personInfo{
        display: flex;
        flex-direction: column;
        margin-left: 0.8rem;
    }
    .van-icon-label:before{
        color: orangered;
        font-size: 1.2rem;
    }
</style>