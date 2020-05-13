import ajax from './ajax'

// //http://demo.itlike.com/web/xlmc/api/homeApi

// 1.定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';

// export const getHomeData = ()=>ajax(BASE_URL+'/api/homeApi');


//2.用户中心的接口
// http://demo.itlike.com/web/xlmc/api/send_code
//2.1获取短信验证码
export const getPhoneCode = (phone)=> ajax(BASE_URL+'/api/send_code',{phone});
//http://demo.itlike.com/web/xlmc/api/login_code
//2.2手机验证码登录(post)
export const phoneCodeLogin = (phone,code)=> ajax(BASE_URL+'/api/login_code',
{phone,code},'POST');
//2.3用户名密码登录(post)
// export const pwdLogin = (user_name,user_pwd,captcha) => ajax(BASE_URL+'/api/login_pwd',
// {user_name,user_pwd,captcha},'POST');


//3.1添加商品
export const addGoodsToCart = (user_id,goods_id, goods_name, goods_price,small_image) => ajax('http://demo.itlike.com/web/xlmc/api/cart/add',{user_id,goods_id, goods_name, goods_price,small_image},'POST')
// 3.5 单个商品的选中和取消选中
export const singerGoodsSelect = (user_id, goods_id)=>ajax(BASE_URL + '/api/cart/singer_select', {user_id, goods_id}, 'POST');

// 3.6 所有商品的选中和取消选中
export const allGoodsSelect = (user_id, flag)=>ajax(BASE_URL + '/api/cart/all_select', {user_id, flag}, 'POST');

// 3.7 查询所有已经被选中的商品
export const getAllSelectedGoods = (user_id) => ajax(BASE_URL+ '/api/cart/selected/'+ user_id);

// 3.8 删除已经生成订单的商品
export const delAllSelectedGoods = (user_id) => ajax(BASE_URL+ '/api/cart/del_checked/'+ user_id);




//4.地址接口
//4.1获取当前用户的地址
export const getUserAddress = (user_id) => ajax(BASE_URL+ '/api/address/search/'+'5d81a771083a85666a923d66');

//4.2添加新的地址
export const addUserAddress = ( user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(BASE_URL + '/api/address/add', {user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

//4.3编辑用户的地址
export const changeUserAddress = ( address_id,user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(BASE_URL + '/api/address/edit', {address_id,user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

//4.4删除用户的地址
export const delUserAddress = (address_id) => ajax(BASE_URL+ '/api/address/del/'+ address_id);

//4.5获取单条地址
export const getCurrentUserAddress = ( user_id, address_id)=>ajax(BASE_URL + '/api/address/one', {user_id, address_id}, 'POST');


// 5. 订单接口
// 5.1 提交订单
export const postOrder = ( user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price)=>ajax(BASE_URL + '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST');

// 5.2 订单支付成功
export const orderPaySuccess = (user_id, order_id)=>ajax(BASE_URL + '/api/order/change_status', {user_id, order_id}, 'POST');

// 5.3 查询订单
export const getOrder = (user_id, status)=>ajax(BASE_URL + '/api/order/get', {user_id, status}, 'POST'); // pay will


// 6. 微信支付接口部署
// const PAY_URL = 'http://47.98.157.152/WXPayProject/pay';
const PAY_URL = '/pay';
// 6.1 获取支付的URL
export const getWXCode = (outTradeNo, totalFee) => ajax(PAY_URL+ '/createNative.do', {outTradeNo, totalFee});
// 6.2 查询是否支付成功
export const queryPayStatus = (out_trade_no) => ajax( 'http://47.98.157.152/WXPayProject/pay/queryPayStatus.do', {out_trade_no});

