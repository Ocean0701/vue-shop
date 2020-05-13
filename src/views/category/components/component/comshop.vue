<template>
  <div>
    <div class="item">
      <div class="imageWrapper">
        <div class="LazyLoad is-visible">
          <img class="image" :src="product.small_image" alt />
        </div>
      </div>
      <div style="margin-left:5rem;" class="name">
        <span class="nameTag nameText">{{product.product_name}}</span>
      </div>
    </div>
    <div class="price">
      <div>
        <label for="input">￥</label>
        <input
          style="border-bottom: 1px solid #000;"
          v-model="price_data"
          type="text"
          placeholder="请输入你的定价"
        />
      </div>

      <div>
        <label for="text">保证金:</label>
        <input
          style="float:right; margin-right:1rem; width:5rem;"
          type="text"
          :value="promise_data"
        />
        <p>保证金最低为38</p>
      </div>
      <van-button type="primary" size="large" @click="insert">确定出售</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "comshop",
  data() {
    return {
      price_data: "",
      promise_data: 38,
      product: ""
    };
  },
  created() {
    this.product = this.products;
    const product_name = this.product.product_name;
    // axios.get('api/cart/new_price',{params:{product_name:product_name}}).then(res=>{
    //      this.product.price = res.data.data.price;
    // })

    // console.log(this.product.price)
  },
  props: {
    products: ""
  },
  methods: {
    async insert() {
      //出售数据放入数据库
      const price = this.price_data;
      const product_name = this.product.product_name;
      const small_image = this.product.small_image;
      const spec = this.product.spec;
      const type = this.product.type;
      const data = {
        small_image,
        product_name,
        spec,
        price,
        type
      };
      let dto = {
        small_image,
        product_name,
        spec,
        name,
        price,
        type: 1,
        num: 1
      };
      axios
        .all([
          axios.post("api/cart/insert_shop", data),
          axios.post("api/cart/goods", { data: dto })
        ])
        .then(res => {
          Toast({
            message: "上架成功",
            duration: 1000
          });
        });
      // await axios.post('api/cart/insert_shop',data).then(res=>{
      //     if(res.data.errno===0){
      //         Toast({
      //             message: '上架成功',
      //             duration: 1000
      //         });

      //         // this.$router.push('/dashboard/category');
      //     }else{
      //         Toast({
      //             message: '出售失败',
      //             duration: 500
      //         });
      //     }
      // })

      this.$router.go(0);
    }
  },
  watch: {
    price_data: function() {
      this.promise_data = this.price_data * 0.1;
    },
    products: function(val) {
      console.log(val);
      this.product = val;
    }
  }
};
</script>

<style scoped>
.item {
  width: auto;
  height: 6rem;
  /* background-color: red; */
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
.price {
  margin-top: 1rem;
  padding: 1rem;
}
.price div {
  margin-bottom: 2.5rem;
}
.price p {
  font-size: 0.7rem;
  color: brown;
  position: absolute;
  right: 1.9rem;
}
</style>