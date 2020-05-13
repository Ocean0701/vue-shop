<template>
  <div id="orderDetail">
    <!--导航栏-->
    <van-nav-bar title="我的鉴定" left-arrow :fixed="true" :border="true" @click-left="$router.go(-1)"></van-nav-bar>

    <van-tabs
      v-model="activeName"
      style="margin-top: 2.6rem"
      title-active-color="#75a342"
      color="#75a342"
      @click="dealWithTabClick"
    >
      <van-tab title="全部" name="a">
         <div v-for="(product, index) in order" :key="index" class="infoWrapper">
            <div class="imageWrapper">
                <div class="LazyLoad is-visible">
                    <img class="image" :src="product.small_image" alt=""></div>
            </div>
            <div class="nameWrapper">
                <div class="name">
                    <span class="nameTag nameText">{{product.product_name}}</span>
                </div>
                <div class="spec">
                    {{product.spec}}
                </div>
                <div class="tagsWrapper">
                    <div class="H1B9Rvu">
                      {{product.num}}
                    </div>
                </div>
            </div>
            <div class="priceWrapper">
                <div class="price">
                    ￥{{product.price}}
                </div>
            </div>
        </div>
      </van-tab>
      <van-tab title="未鉴定" name="b">
          <div v-for="(product, index) in sell" :key="index" @click="showPopup" class="infoWrapper">
            <div class="imageWrapper">
                <div class="LazyLoad is-visible">
                    <img class="image" :src="product.small_image" alt=""></div>
            </div>
            <div class="nameWrapper">
                <div class="name">
                    <span class="nameTag nameText">{{product.product_name}}</span>
                </div>
                <div class="spec">
                    {{product.spec}}
                </div>
                <div class="tagsWrapper">
                    <div class="H1B9Rvu">
                      {{product.num}}
                    </div>
                </div>
            </div>
            <div class="priceWrapper">
                <div class="price">
                    ￥{{product.price}}
                </div>
            </div>
        </div>
        <!-- 弹出层 -->
        <van-popup v-model="show">
          <img style="width:300px; height=400px"  src="./../../../images/tabbar/clothes.jpg" alt="">
          <div style="display:flex;justify-content:space-around;">
          <van-button type="primary" >为真</van-button><van-button type="danger" @click="$router.go(-1)">为假</van-button>
          </div>
        </van-popup>
      </van-tab>
      <van-tab title="已鉴定" name="c">
        <div v-for="(product, index) in payed" :key="index" class="infoWrapper">
            <div class="imageWrapper">
                <div class="LazyLoad is-visible">
                    <img class="image" :src="product.small_image" alt=""></div>
            </div>
            <div class="nameWrapper">
                <div class="name">
                    <span class="nameTag nameText">{{product.product_name}}</span>
                </div>
                <div class="spec">
                    {{product.spec}}
                </div>
                <div class="tagsWrapper">
                    <div class="H1B9Rvu">
                      {{product.num}}
                    </div>
                </div>
            </div>
            <div class="priceWrapper">
                <div class="price">
                    ￥{{product.price}}
                </div>
            </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MineOrderItem from "./components/MineOrderItem";
import { getOrder } from "./../../../service/api/index";
import { mapState } from "vuex";
import { Toast } from "vant";
import axios from 'axios'

export default {
  name: "MineIdentify",
  data() {
    return {
      activeName: "a",
      allOrderArr: null, // 所有的订单
      allWillOrderArr: null, // 所有待支付的订单
      allPayOrderArr: null, // 所有支付的订单,
      order: [],
      show: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    payed(){
      return this.order.filter(e => e.type===0)
    },
    sell(){
      return this.order.filter(e => e.type === 1)
    }
  },
  mounted() {
    // 获取订单数据
    // this.initOrder();
    this.fetch()
  },
  components: {
    MineOrderItem
  },
  methods: {
    async initOrder() {
      let result = await getOrder("5d81a771083a85666a923d66");
      console.log(result);
      if (result.success_code === 200) {
        this.allOrderArr = result.data;
        console.log(this.allOrderArr);
      } else {
        Toast({
          message: "订单获取失败",
          duration: 600
        });
      }
    },
    async dealWithTabClick(name, title) {
      if (name === "a") {
        this.allOrderArr = await this.getTabOrder();
      } else if (name === "b") {
        this.allWillOrderArr = await this.getTabOrder("will");
      } else if (name === "c") {
        this.allPayOrderArr = await this.getTabOrder("pay");
      }
    },
    async getTabOrder(status) {
      let result = await getOrder("5d81a771083a85666a923d66", status);
      // console.log(result.success_code)
      if (result.success_code === 200) {
        return result.data;
      } else {
        Toast({
          message: "订单获取失败",
          duration: 600
        });
      }
    },
    async fetch(){
        let arr = [0,1]
        let order = []
        let resultArr = await axios.all(arr.map(e => axios.get(`/api/cart/goods_identify?type=${e}`)))
        console.log(resultArr)
        resultArr.forEach(e => {
          if(e.data.errno === 0){
            e.data.data.forEach(element => {
              order.push(element)
            });
          }
        })
        this.order = order
        console.log(order)
    },
    showPopup() {
      this.show = true;
    },
  }
};
</script>

<style scoped>
#orderDetail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120%;
  background-color: #f5f5f5;
  z-index: 200;
}
.imageWrapper {
        position: absolute;
        left: 0;
        top: 0.2375rem;
        width: 4.0625rem;
        height: 5.0625rem;
        overflow: hidden;
        border-radius: 4px;
    }

    .image {
        width: 100%;
        height: 100%;
        display: block;
    }

    .noticeGreen, .noticeGray {
        position: absolute;
        height: 100%;
        text-align: center;
    }

    .noticeGreen {
        background: #76DA96;
        color: #FFF;
    }

    .noticeGray {
        background: rgba(255, 255, 255, 0.6);
    }

    .noticeGray span {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 80%;
        text-align: center;
        color: #FFF;
        font-size: 0.75rem;
        height: 1.25rem;
        line-height: 1.25rem;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1.25rem;
    }

    .infoWrapper {
        position: relative;
        padding: 0 0.285rem 0.4rem 4.6625rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .nameWrapper {
        min-height: 2.1875rem;
    }

    .name {
        line-height: 1.25rem;
        word-break: break-all;
        font-size: 0.9375rem;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .name .nameTag {
        margin-right: 0.125rem;
        vertical-align: middle;
    }
    .name .nameText {
        vertical-align: middle;
    }

    .spec {
        min-height: 1.25rem;
        line-height: 1.25rem;
        font-size: 0.75rem;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .tagsWrapper {
        margin-top: 0.1875rem;
        max-height: 1.0625rem;
        line-height: 0.8125rem;
        overflow: hidden;
    }

    .H1B9Rvu {
        height: 1rem;
    }

    .tag + .tag {
        margin-left: 0.3125rem;
    }

    .priceWrapper {
        display: inline-block;
        position: relative;
        width: 3rem;
    }

    .price {
        display: inline-block;
        height: 1.875rem;
        line-height: 1.875rem;
        font-weight: bold;
        font-size: 0.75rem;
        color: #FE6263;
    }

    .originPrice {
        display: inline-block;
        margin-left: 0.3125rem;
        height: 1.875rem;
        line-height: 1.875rem;
        text-decoration: line-through;
        font-size: 0.6875rem;
        color: #B2B2B2;
    }

    .iconCartWrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.875rem;
    }

    .icon {
        fill: #999;
        width: 1rem;
        height: 1rem;
    }

    .iconCart {
        display: block;
        width: 1.875rem;
        height: 1.875rem;
    }
    .buyWrapper{
        display: inline-block;
        position: absolute;
        margin-left: 1rem;
    }
</style>