<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar
            title="发布鉴别"
            left-arrow
            :fixed=true
            :border=true
            @click=this.$router.go(-1)
        />
        <div class="container" style="margin-top:3rem;">
            <div> 添加鉴别图片(至少露出标牌，全方位无死角图片;鞋子需要展示鞋垫，鞋盒)：</div>
            <van-uploader :after-read="afterRead"  v-model="fileList" />
            <div>添加备注:(选填)</div>
            <div>
                <textarea style="width:100%;" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <van-button style="position:absolute;bottom:0;" type="info" size="large"  @click="onClickLeft">发布鉴别</van-button>
        </div>
    </div>
</template>

<script>
import {animate} from './../../../../config/global'
import axios from 'axios'
import {Toast,Uploader,Button} from 'vant'
export default {
    name:"upload",
    data() {
        return {
            fileList: [
                // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // // Uploader 根据文件后缀来判断是否为图片文件
                // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                // { url: 'https://cloud-image', isImage: true }
            ]
        }
    },
    created(){
        let docB = document.documentElement||document.body;
        //在400ms内以ease-out方式滚到顶部
        animate(docB,{scrollTop:'0'},1,'ease-out');
    },
    methods: {
        //点击返回
        onClickLeft(){
            Toast("发布成功");
            this.$router.go(-1);
        },
        afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
    },
    components:{
        
    }
}
</script>

<style lang="less" scoped>
.container{
    padding: 0 4px;
    
}

</style>