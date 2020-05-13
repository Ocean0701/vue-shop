<template>
    <div class="wrapper" data-index="3">
        <div class="itemWrapper">
            <div class="imageWrapper">
                <van-image
                class="img"
                 round
                 cover
                    width="90"
                    height="90"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </div>
            <div>
                <div class="name">擅长AJ、匡威、VANS等鞋款</div>
                <div class="originPrice">已鉴定：356件</div>
                <div class="priceWrapper">
                    <div class="price">￥10</div>
                    <div class="iconCartWrapper" >
                        <van-button to="./home/upload" type="primary" size="mini">预约</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {button} from 'vant'
    import PubSub from 'pubsub-js'
    export default {
        name: "FlashSaleItem",
        props:{
            product: Object
        },
        methods: {
            // addToCart(goods){
            //     PubSub.publish('homeAddToCart',goods);
            // }
        },
        beforeDestroy() {
            PubSub.unsubscribe('homeAddToCart')
        },
    }
</script>

<style scoped>
    .wrapper {
        display: inline-block;
        padding: 0 0.3125rem;
        margin: 0 0.5rem;
        white-space: normal;
        width: 28%; }

    @media screen and (min-width: 0px) and (max-width: 320px) {
        .itemWrapper {width: 33%; }
    }

    .imageWrapper {
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        margin-bottom: 0.625rem;
        position: relative; }
    .image {
        width: 50%;
        height: auto;
        display: block; 
        }
    .name {
        margin-bottom: 0.625rem;
        height: 2.5rem;
        line-height: 1.25rem;
        font-size: 0.8125rem;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; }
    .originPrice {
        margin-bottom: 0.3125rem;
        font-size: 0.6875rem;
        color: #999999;
    }
    .noticeSoldOut span {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 60%;
        text-align: center;
        color: #FFF;
        font-size: 0.75rem;
        height: 1.25rem;
        line-height: 1.25rem;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1.25rem; }

    .priceWrapper {
        position: relative;
    }

    .price {
        height: 1.875rem;
        line-height: 1.875rem;
        font-size: 0.6875rem;
        color: #FE6263;
    }

    .iconCartWrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.875rem;
    }
</style>