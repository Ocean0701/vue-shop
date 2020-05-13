<template>
    <div id="addAddress">
        <!-- 导航栏 -->
        <van-nav-bar
            title="添加地址"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            :search-result="searchResult"
            @save="onSave"
            
            @change-detail="onChangeDetail"
            style="margin-top:3rem;"
        />
    </div>
</template>

<script>
import {Toast} from 'vant'
import areaList from './../../../../config/area'
import {addUserAddress} from './../../../../service/api/index'
import {mapState} from 'vuex'
import PubSub from 'pubsub-js'
export default {
    name:"AddAddress",
    data() {
        return {
            areaList:areaList,
            searchResult: []
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
         //点击返回
        onClickLeft(){
            this.$router.go(-1);
        },
        //保存
        async onSave(content) {
            // console.log(content)
            if(this.userInfo.id){
                let result = await addUserAddress('5d81a771083a85666a923d66',content.name,
                content.tel,content.province+content.city+content.county,
                content.addressDetail,content.postalCode,content.isDefault,
                content.province,content.city,content.county,content.areaCode);
                console.log(result);
                if(result.success_code===200){//成功
                    Toast({
                        message:'添加地址成功',
                        duration:400
                    });
                    this.$router.back();
                    // 发起通知
                    PubSub.publish('backToMyAddress');
                }else{
                    Toast({
                        message:'添加地址失败',
                        duration:400
                    })
                }
            }
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [{
                    name: '黄龙万科中心',
                    address: '杭州市西湖区'
                }];
            } else {
                this.searchResult = [];
            }
        }   
    },
    
}
</script>

<style scoped>
    #addAddress{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }
</style>