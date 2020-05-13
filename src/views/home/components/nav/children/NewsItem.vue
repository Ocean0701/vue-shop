<template>
   <div class="wrapper">
        <div class="titleWrapper">
            <div class="title">潮流地带</div>
            <!-- <span class="actionStateText">07:00场</span>
            <div class="actionStateTextEnd">已结束</div> -->
            <span class="more">更多</span>
        </div>

        <div class="itemsWrapper">
             <ul class="clearfix">
                <li style="height: 27px;"><router-link :to="{path:'/dashboard/home/newsinfo'}" tag="a">&nbsp;&nbsp;&nbsp;我讲真，Converse真的不会让人失...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10.27</router-link> </li>
                <li style="height: 27px;"><router-link :to="{path:'/dashboard/home/newsinfo'}" tag="a">&nbsp;&nbsp;&nbsp;每一个有趣的人都像磁带，AB-side轮流...&nbsp;&nbsp;&nbsp;&nbsp;11.02</router-link></li>
                <li style="height: 27px;"><a href="new3.html">&nbsp;&nbsp;&nbsp;人人人人人人的十一假期，穿什么才不...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;03.15</a></li>
                <li style="height: 27px;"><a href="new4.html">&nbsp;&nbsp;&nbsp;Supreme这季大火的桌球系列...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;03.19</a></li>
                <li style="height: 27px;"><a href="new5.html">&nbsp;&nbsp;&nbsp;听说过“球鞋贴膜”吗？90后小伙...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09.26</a></li>
            </ul>
        </div>

    </div>
</template>

<script>

export default {
    name:"NewsItem",
}
</script>

<style lang="less" scoped>
    .wrapper {
        position: relative;
        margin-top: 0.625rem;
        padding: 1.25rem 0 0.9375rem 0;
        background: white; 
    }

    .titleWrapper {
        position: relative;
        margin: 0 0.625rem 0.625rem 0.625rem;
        height: 1.5625rem;
    }

    .title {
        display: inline-block;
        border-left: 4px #3cb963 solid;
        padding-left: 0.3125rem;
        height: 1.3125rem;
        line-height: 1.3125rem;
        vertical-align: middle;
        font-size: 1.1875rem; }

    .actionStateText {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.875rem;
        font-size: 0.875rem;
        border-radius: 3px;
        padding: 0.15625rem;
        /*border: 1px solid #FE3824;*/
        color: #FE3824;
        margin-left: 0.3125rem; }

    .actionStateTextEnd {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.875rem;
        font-size: 0.875rem;
        border-radius: 3px;
        padding: 0.15625rem;
        border: 1px solid #999;
        color: #666;
        margin-left: 0.3125rem;
    }

    .more {
        position: absolute;
        top: 0;
        right: 0;
        height: 1.5625rem;
        line-height: 1.5625rem;
        font-size: 0.875rem;
        color: #2EB257;
    }

    .itemsWrapper {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
    .itemsWrapper>ul>li{
        border-bottom: 1px dashed #666;
    }
    .itemsWrapper>ul>li>a{
        color: #666;
        font-size: 0.9rem;
    }

    .itemsWrapper::-webkit-scrollbar{
        display: none
    }





</style>