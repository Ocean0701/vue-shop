<template>
   <div class="newsbuy">
       <!-- 导航栏 -->
        <van-nav-bar
            title="最新发售"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        />
        <van-index-bar 
            :index-list="indexList"
            style="margin-top:3rem;"
            v-for="(cate,index) in newsData"
            :key="cate.id"
        >
            <van-index-anchor index="1"><strong>10</strong> OCT</van-index-anchor>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>10.03</span></div>
                    <div><img class="news_img" :src="cate.products[0].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[0].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>10.20</span></div>
                    <div><img class="news_img" :src="cate.products[1].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[1].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>10.25</span></div>
                    <div><img class="news_img" :src="cate.products[2].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[2].product_name}}</div>
                </div>
            </van-cell>

            <van-index-anchor index="2"><strong>9</strong> SEP</van-index-anchor>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>09.05</span></div>
                    <div><img class="news_img" :src="cate.products[3].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[3].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>09.22</span></div>
                    <div><img class="news_img" :src="cate.products[4].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[4].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>09.30</span></div>
                    <div><img class="news_img" :src="cate.products[5].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[5].product_name}}</div>
                </div>
            </van-cell>

            <van-index-anchor index="3"><strong>8</strong> AUG</van-index-anchor>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>08.03</span></div>
                    <div><img class="news_img" :src="cate.products[6].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[6].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>08.20</span></div>
                    <div><img class="news_img" :src="cate.products[7].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[7].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>08.25</span></div>
                    <div><img class="news_img" :src="cate.products[8].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[8].product_name}}</div>
                </div>
            </van-cell>

            <van-index-anchor index="4"><strong>7</strong> JUE</van-index-anchor>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>07.03</span></div>
                    <div><img class="news_img" :src="cate.products[9].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[0].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>07.20</span></div>
                    <div><img class="news_img" :src="cate.products[10].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[1].product_name}}</div>
                </div>
            </van-cell>
            <van-cell class="news_title">
                <div class="containner">
                    <div class="day"><span>07.25</span></div>
                    <div><img class="news_img" :src="cate.products[11].small_image" alt=""></div>
                    <div class="textWrapper">{{cate.products[2].product_name}}</div>
                </div>
            </van-cell>
        </van-index-bar>
   </div>
</template>

<script>
//引入json数据
var dataRight = require('./../../../../../data/categoryDet.json')
export default {
    name:"NewsBuy",
    data() {
        return {
            indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            //右边对应数据
            newsData:[],
        }
    },
    created () {
        // console.log(dataRight)  
        if(dataRight.success){
            // console.log(dataRight.data.cate)
            this.newsData = dataRight.data.cate[0]
        }
    },
    methods: {
        //点击返回
        onClickLeft(){
            this.$router.go(-1);
        },
    },
}
</script>

<style lang="less" scoped>
    #newsbuy{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
        background-color: #f5f5f5;
    }
    .containner{
        height: 6rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .containner>div{
        -webkit-box-flex: 1;
    }
    .containner .news_img{
        width: 4rem;
        height: 6rem;
        overflow: hidden;
        border-radius: 4px;
        margin-left: 2rem;
        margin-right:2rem;
    }
    // .van-index-anchor{
    //     font-size: 2rem;
    // }
    // .news_item{
    //     margin-left: 2rem;
    //     padding-left:2rem;
    //     width: 18rem;
    //     height: 6rem;
    // }
    // .news_item .textWrapper{
    //     position: absolute;
    //     right: 0;
    //     width: 6rem;
    //     height: 6rem;
    // }
    
      
</style>