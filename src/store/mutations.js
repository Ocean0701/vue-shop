import {
    ADD_GOODS,
    ADD_SHOP,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_All_GOODS,
    CLEAR_CART,
    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO
}
from './mutations-type'
import { getStore, setStore, removeStore } from '../config/global';
import Vue from 'vue';
export default{
    //1.往购物车添加数据 small_image,product_name,spec,name,price,type
    [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice,productName,spec}){
        let shopCart = state.shopCart;
        //1.1判断商品是否存在
        if(shopCart[goodsId]){//存在
            shopCart[goodsId]['num']++
        }else{//不存在
            shopCart[goodsId] = {
                "num":1,
                "id":goodsId,
                "name":goodsName,
                "small_image":smallImage,
                "price":goodsPrice,
                "checked":true,
                "product_name":productName,
                "spec":spec
            }
        }
        //1.2产生新对象 ES6语法
        state.shopCart = {...shopCart}
        //1.3存入本地
        setStore('shopCart',state.shopCart);
    },
    //添加商品数据
    [ADD_SHOP](state,{goodsId,goodsName,smallImage,goodsPrice}){
        let shopCart = state.shopCart;
        //1.1判断商品是否存在
        if(shopCart[goodsId]){//存在
            shopCart[goodsId]['num']++
        }else{//不存在
            shopCart[goodsId] = {
                "num":1,
                "id":goodsId,
                "name":goodsName,
                "small_image":smallImage,
                "price":goodsPrice,
                "checked":true
            }
        }
        //1.2产生新对象 ES6语法
        state.shopCart = {...shopCart}
        //1.3存入本地
        setStore('shopCart',state.shopCart);
    },
    //2.页面初始化,获取购物车的数据（本地）
    [INIT_SHOP_CART](state){
        let initCart  = getStore('shopCart');
        if(initCart){
            state.shopCart = JSON.parse(initCart);
        }
    },

    //3.把商品移出购物车
    [REDUCE_CART](state,{goodsId}){
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if(goods){
            if(goods['num']>0){
                goods['num']--;
                //3.1是否减到0个
                if(goods['num'] === 0){
                    delete shopCart[goodsId];
                }
            }else{
                goods = null;
            }
            //3.2同步数据（防止深拷贝）
            state.shopCart = {...shopCart};
            setStore('shopCart',state.shopCart);
        }
    },

    //4.单个商品的取消和选中
    [SELECTED_SINGER_GOODS](state,{goodsId}){
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if(goods){
            if(goods.checked){
                goods.checked = !goods.checked;
            }else{
                //在vuex里往一个对象里添加东西
                Vue.set(goods,'checked',true);
            }
            
            state.shopCart = {...shopCart};
            //4.1同步数据
            setStore('shopCart',state.shopCart);
        }
    },

    //5.商品的全选
    [SELECTED_All_GOODS](state,{isSelected}){
        let shopCart = state.shopCart;
        //取出对象的值（值也是一个对象，此对象为需要操作的对象）
        Object.values(shopCart).forEach((goods,index) => {
            if(goods.checked){
                goods.checked = !isSelected;
            }else{
                //在vuex里往一个对象里添加东西
                Vue.set(goods,'checked',!isSelected);
            }
        });
        //重新赋值，防止深拷贝
        state.shopCart = {...shopCart};
    },

    //6.清空购物车
    [CLEAR_CART](state){
        state.shopCart = null;
        //重新赋值，防止深拷贝
        state.shopCart = {...state.shopCart};
        //同步更新
        setStore('shopCart',state.shopCart);
    },

    //7.保存用户信息到本地
    [`USER_INFO`](state,{userInfo}){
        console.log(userInfo);
        state.userInfo = userInfo;
        setStore('userInfo',state.userInfo);
    },

    //8.获取用户信息
    [INIT_USER_INFO](state){
        //8.1获取用户信息
        let userInfo = getStore('userInfo');
        console.log(userInfo);
        //8.2判断
        if(userInfo){
            state.userInfo = JSON.parse(userInfo);
        }
    },

    //9.退出登录
    [RESET_USER_INFO](state){
        state.userInfo = {};
        removeStore('userInfo');
    }
}