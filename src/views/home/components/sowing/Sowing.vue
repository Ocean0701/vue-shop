<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(sowing,index) in sowing_list" :key="sowing.public_id">
            <img :src="sowing.icon_url" :alt="sowing.public_name">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
//引入轮播图
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name:"Sowing",
    data(){
        return{
            swiperOption:{
                //组件则不会通过NextTick来实例化swiper，第一时间获取到swiper对象
                notNextTick:true,
                //配置分页（圆点）
                pagination:{
                    el:'.swiper-pagination',
                    clickable:true
                },
                //循环
                loop:true,
                //切换时长
                autoplay:{
                    delay:1000
                },
                //速度
                speed:600,
                //滑动后回调函数
                on:{
                    slideChangeTransitionEnd(){//在当前Slide切换到另一个Slide后执行
                        // console.log(this.activeIndex)
                    }
                }
            }
        }
    },
    props: {
        sowing_list: Array
    },
    computed:{
        swiper(){
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted(){
        //指定滑动到第几页
        // this.swiper.slideTo(5,1000,false)
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style scoped>
    #swiper{
        width: 100%;
        height: 14rem;
        background-color: white;
    }
    #swiper img{
        width: 100%;
        height: 100%;
    }
</style>