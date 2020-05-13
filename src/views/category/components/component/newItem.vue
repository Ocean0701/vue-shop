<template>
  <div>
      <!-- 导航栏 -->
        <van-nav-bar
            title="发布新品"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        />
        <!-- 输入数据 -->
        <div class="container" style="margin-top:3rem;">
            <div>添加新品图片:</div> 
            <van-uploader v-model="fileList"  multiple />
            <van-cell-group>
                <van-field
                    v-model="product_name"
                    required
                    clearable
                    label="商品名称"
                    right-icon="question-o"
                    placeholder="请输入商品名称"
                    @click-right-icon="$toast('question')"
                />

                <van-field
                    v-model="spec"
                    required
                    clearable
                    label="商品简称"
                    placeholder="请输入商品简称"
                />
                <van-field
                    v-model="price"
                    required
                    clearable
                    label="定价"
                    placeholder="请输入你的定价"
                />
                <van-field
                    v-model="type"
                    required
                    clearable
                    label="类型"
                    placeholder="请输入你的类型"
                />
            </van-cell-group>
            <van-button @click="insert()" size="large" type="info" style="position:absolute; bottom:0;">确定发布</van-button>
        </div>
  </div>
</template>

<script>
import { Dialog,Uploader,Button} from "vant";
import { Toast } from "vant";
import axios from "axios";
export default {
    name: "newItem",
     data() {
        return {
        fileList: [],
        product_name:'',
        spec:'',
        price:'',
        type:''
      }
    },
    methods: {
        //点击返回
        onClickLeft(){
            this.$router.go(-1);
        },
        
        //发布
        insert(){
            //出售数据放入数据库
        const price = this.price;
        const product_name = this.product_name;
        const small_image = '//img12.static.yhbimg.com/goodsimg/2019/11/02/11/026ab71226d047d731ff8fa3a1c526bdc3.jpg?imageMogr2/thumbnail/420x560/background/d2hpdGU=/position/center/quality/80';
        const spec = this.spec;
        const type = this.type;
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
            
        }
    },
}
</script>

<style scoped>
.container{
    font-size: 0.9rem;
    margin-top:3rem;
}
</style>