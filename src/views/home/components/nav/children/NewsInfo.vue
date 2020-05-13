<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar
            title="潮流地带"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        />
            <div class="newsinfo-container" style="margin-top:3rem;">
            <!-- 标题 -->
            <h2 class="title">每一个有趣的人都像磁带，AB-side轮流播放。</h2>
            <!-- 子标题 -->
            <p class="subtitle">
                <span>发表时间:2019-04-16T03:50:28.000Z</span>
                <span>点击:1次</span>
            </p>
            <hr>

            <!-- 内容区域 -->
            <div class="content">
                <p>磁带的AB-side，每一首歌都值得认真欣赏聆听，因为你永远不知道看似不是主打歌的B-side，经常隐藏着令人惊喜的精彩。</p> 
                <p>这就和现在有趣的年轻人一样，不管是你熟知的A面，还是想要可以隐藏的B面，都值得你轮流播放、细细品味。</p> 
                <p>比如藤原浩，他的A-side是潮流圈老铁们都很熟悉的潮流教父，一个闪电⚡️logo，成为了多少人的冲冲日？</p>
                <p>但如果你细细品味他作为德艺双馨的音乐人B-side的话，你会发现藤原浩在音乐上的狂拽与不羁，比在潮流上更令人惊喜意外。不说别的，就冲那首让人听了很治愈的《かすかなしるし》，就让人对他传奇的B-side充满好奇。
</p>
                <img src="http://images.1626.com/public/upload/zixun/2019/09/29/10/b9ea572d4764001f1d255233cfe6bdde.jpg" alt="">
                <p>除了藤原浩，白天在金融办公室扮演着产品经理A面的小王，在城市入夜的时候，也换成B-side“播放”。</p>
                <p>所以，不管是A面的未来，还是B面的复古，在轮流播放你的AB-side的时候，存取你的AB面，解锁两种截然不同维度的碰撞，往往会擦出不一样的花火。就像这次由时装设计师周翔宇设计的ATTRIBUTE系列一样，当安踏的A-side运动属性和ATTRIBUTE的B-side时装属性相互碰撞之后，2019年秋冬「Access for All 任意存取」的全新系列就诞生了。</p>
                <img src="http://images.1626.com/public/upload/zixun/2019/09/29/10/8f18f7502b316d5c2747b9ad5e32d687.jpg" alt="">
            </div>
            <!-- 评论子组件区域 -->
            <comment-box :id="13"></comment-box>
        </div>
    </div>
</template>

<script>
import {animate} from '../../../../../config/global' 
import comment from './../../../../../subcomponents/comment.vue'
import axios from 'axios'
import {Toast} from 'vant'
export default {
    name:"NewsInfo",
    data() {
        return {
            id:this.$route.params.id,//将url地址中传递来的id值，挂载在data上
            newsinfo:[]
        }
    },
    created(){
        let docB = document.documentElement||document.body;
        //在400ms内以ease-out方式滚到顶部
        animate(docB,{scrollTop:'0'},1,'ease-out');
        this.getNewsInfo()
    },
    methods: {
        //点击返回
        onClickLeft(){
            this.$router.go(-1);
        },
        getNewsInfo(){
            axios.get('http://www.liulongbin.top:3005/api/getnew/'+'13').then(result=>{
                // console.log(result)
                if(result.data.status===0){
                    this.newsinfo = result.data.message[0];
                }else{
                    Toast('加载新闻失败')
                }
                
            })
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="less" scoped>
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        color: black;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    p {
        font-size: 14px;
        margin-top: 0;
        margin-bottom: 10px;
        color: #8f8f94;
    }
    .content{
        img{
            width: 20rem;
            margin: 0 auto;
            border: 4px solid #fff;
        }
    }
}

</style>