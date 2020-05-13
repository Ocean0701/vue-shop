<template>
  <div id="order">
    <!-- 导航栏 -->
    <van-nav-bar title="填写订单" left-arrow :fixed="true" :border="true" @click-left="onClickLeft" />
    <!-- 收货地址 -->
    <van-contact-card
      :type="address_type"
      add-text="选择收货地址"
      :name="address_name"
      :tel="address_phone"
      @click="chooseAddress"
      style="margin-top:3rem;"
    />

    <van-cell-group style="margin-top:0.6rem;">
      <van-cell title="送达时间" :value="arriveDate" @click="showDatePopup" is-link />
      <!-- <van-cell value="内容" is-link :center=true> -->
      <!-- 使用 title 插槽来自定义标题 -->
      <!-- <template slot="title">
                  <img src="./images/detail1.jpg" alt="" style="width:3rem;">
                  <img src="./images/detail1.jpg" alt="" style="width:3rem;">
                  <img src="./images/detail1.jpg" alt="" style="width:3rem;">
              </template>
      </van-cell>-->
    </van-cell-group>

    <van-cell-group style="margin-top:0.6rem;">
      <van-cell title="支付方式" value="微信" is-link />
    </van-cell-group>

    <van-cell-group style="margin-top:0.6rem;">
      <van-cell title="备注" is-link>
        <input style="text-align:right;" type="text" placeholder="选填，备注你的特殊要求" />
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top:0.6rem;">
      <van-cell title="商品金额" :value="`￥${totalPrice}`" is-link />
      <van-cell title="配送费" :value="`￥${disPrice}`" is-link />
    </van-cell-group>

    <!-- 提交订单 -->
    <van-submit-bar
      :price="totalPrice*100 + disPrice*100"
      button-text="提交订单"
      label="实付"
      @submit="onSubmit"
    />

    <!-- 弹出日期组件 -->
    <van-popup v-model="dateShow" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onDateCancel"
        @confirm="onDateConfirm"
      />
    </van-popup>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import Moment from "moment";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
import axios from "axios";
import {
  postOrder,
  orderPaySuccess,
  getWXCode,
  queryPayStatus,
  getAllSelectedGoods,
  delAllSelectedGoods
} from "./../../service/api/index";

export default {
  name: "Order",
  data() {
    return {
      // 地址
      address_type: "add", //地址卡片类型
      address_name: null, //联系人
      address_phone: null, //联系电话
      address_id: null, //收货人id
      // 日期相关
      dateShow: false,
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      // 送达时间
      arriveDate: "请选择送达时间"
    };
  },
  computed: {
    ...mapState(["shopCart", "userInfo"]),
    // 商品总件数
    goodsCount() {
      let selectedGoodsCount = 0;
      Object.values(this.shopCart).forEach((goods, index) => {
        if (goods.checked) {
          selectedGoodsCount += 1;
        }
      });
      return selectedGoodsCount;
    },
    // 商品总价
    totalPrice() {
      let totalPrice = 0;
      Object.values(this.shopCart).forEach((goods, index) => {
        if (goods.checked) {
          totalPrice += goods.price * goods.num;
        }
      });
      return totalPrice.toFixed(2);
    },
    //  取购物车中前三件选中的
    threeShopCart() {
      let shopCart = [];
      Object.values(this.shopCart).forEach((goods, index) => {
        if (goods.checked) {
          shopCart.push(goods);
        }
      });
      return shopCart.slice(0, 3);
    },
    // 配送费
    disPrice() {
      // 商品总价 > 1000 免配送费
      if (this.totalPrice > 1000) {
        return 0;
      } else {
        return 25;
      }
    }
  },
  mounted() {
    // 接收收货地址
    PubSub.subscribe("userAddress", (msg, address) => {
      if (msg === "userAddress") {
        this.address_type = "edit";
        this.address_name = address.name;
        this.address_phone = address.tel;
        this.address_id = address.address_id;
      }
    });
    console.log(this.shopCart);
  },
  methods: {
    ...mapMutations([
      "REDUCE_CART",
      "ADD_GOODS",
      "SELECTED_SINGER_GOODS",
      "SELECTED_All_GOODS",
      "CLEAR_CART"
    ]),
    //点击返回
    onClickLeft() {
      this.$router.back();
    },
    //选择地址
    chooseAddress() {
      this.$router.push("/confirmOrder/myAddress");
    },
    // 3.提交订单
    async onSubmit() {
      // 3.1 数据验证
      if (!this.address_id) {
        Toast({
          message: "请选择收货地址",
          duration: 500
        });
        return;
      }

      if (this.arriveDate === "请选择送达时间") {
        Toast({
          message: "请选择送达时间",
          duration: 500
        });
        return;
      }

      // 3.2 处理订单相关
      if (this.userInfo.id) {
        // 将shopCart 转为数组

        let arr = [];
        for (let i in this.shopCart) {
          console.log(this.shopCart[i]);
          arr.push(this.shopCart[i]);
        }

        // 将数据库中的数据删除
        axios.all(
            arr.map(e => {
              let dto = {
                small_image: e.small_image,
                product_name: e.product_name,
                spec: e.spec,
                name: e.name,
                price: e.price,
                type: 0,
                num: e.num
              };
              return axios.post(`/api/cart/goods`, {
                data: dto
              });
            })
          ).then(resArr => {
            axios
              .all(arr.map(e => axios.get(`/api/cart/del_shop?id=${e.id}`)))
              .then(res => {
                this.CLEAR_CART();
                Toast({
                  message: "订单提交成功！",
                  duration: 500
                });
                this.$router.replace("/dashboard/mine");
              });
          });

        // // 3.2.1 查询购物车订单
        // let goodsResult = await getAllSelectedGoods('5d81a771083a85666a923d66');
        // console.log(goodsResult);
        // // 3.2.2 创建订单
        // if(goodsResult.success_code === 200){
        //     let orderResult = await postOrder('5d81a771083a85666a923d66', this.address_id, this.arrive_time, goodsResult.data, this.notice, this.totalPrice, this.disPrice);
        //     console.log(orderResult);
        //     // 3.3.3 删除购物车中已经生成订单的商品
        //     if(orderResult.success_code === 200){
        //         let delResult = await delAllSelectedGoods('5d81a771083a85666a923d66');
        //         console.log(delResult);
        //         // 3.3.4 发起微信支付
        //         if(delResult.success_code === 200){
        //              // 测试，测试，测试
        //              let urlResult = await getWXCode(orderResult.data.order_id, 1);
        //             //  console.log(urlResult);
        //              if(urlResult.code_url){ // 有值
        //                  this.isPay = true;
        //                  this.qrcode = urlResult.code_url;
        //                  // 3.3.5 验证用户是否扫码
        //                 //  console.log(orderResult.data.order_id);
        //                 //  let payResult = await queryPayStatus(orderResult.data.order_id);
        //                 //  console.log(payResult);
        //                 //  if(payResult.success){
        //                 //      Toast({
        //                 //          message: payResult.message,
        //                 //          duration: 1000
        //                 //      });
        //                 //      this.isPay = false;
        //                 //      // 3.3.6 通知自己服务器订单支付成功
        //                 //      let statusResult = await orderPaySuccess('5d81a771083a85666a923d66', orderResult.data.order_id);
        //                 //      console.log(statusResult);
        //                 //      if(statusResult.success_code === 200){
        //                 //           // 3.3.7 跳转到我的
        //                 //          this.$router.replace('/dashboard/mine');
        //                 //          window.sessionStorage.setItem('tabBarActiveIndex', '3');
        //                 //      }
        //                 //  }
        //                 Toast({
        //                 message: '订单提交成功！',
        //                 duration: 500
        //                 });
        //                 this.$router.replace('/dashboard/mine');
        //              }
        //         }else {
        //             Toast({
        //                 message: '订单处理出现问题！',
        //                 duration: 500
        //             });
        //         }
        //     }else {
        //         Toast({
        //             message: '购物车同步出现问题！',
        //             duration: 500
        //         });
        //     }
        // }else {
        //     Toast({
        //         message: '获取订单商品失败！',
        //         duration: 500
        //     });
        // }
      }
    },

    // 展示日期组件
    showDatePopup() {
      this.dateShow = true;
    },
    // 取消日期组件
    onDateCancel() {
      this.dateShow = false;
    },
    // 确认日期组件
    onDateConfirm(value) {
      this.dateShow = false;
      // 格式化时间
      this.arriveDate = Moment(value).format("YYYY-MM-DD hh:mm");
    }
  },
  beforeDestroy() {
    PubSub.unsubscribe("userAddress");
  }
};
</script>

<style scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>