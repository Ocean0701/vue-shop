import Vue from 'vue'

//1.底部导航栏
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//2.页面启动时加载Loading
import { Loading } from 'vant';
Vue.use(Loading);

//3.图片懒加载
import { Image } from 'vant';
Vue.use(Image);

//4.弹窗提示
import { Toast } from 'vant';
Vue.use(Toast);

//5.蒙版提示
import {Dialog} from 'vant';
Vue.use(Dialog);

//6.导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//7.地址
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit);
//8.地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);
//9.编辑地址
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

//10.单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

//11.提交订单
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

//12.宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

// 13.弹出层
import { Popup } from 'vant';
Vue.use(Popup);

// 14.日期
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

// 15.tab标签
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

// 16.索引栏（最新发售）
import { IndexBar, IndexAnchor } from 'vant';
Vue.use(IndexBar).use(IndexAnchor);

// 17.按钮
import { Button } from 'vant';
Vue.use(Button);

//18.文件上传
import { Uploader } from 'vant';
Vue.use(Uploader);

//19.输入框
import { Field } from 'vant';
Vue.use(Field);
