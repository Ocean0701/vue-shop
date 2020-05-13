<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="msg" placeholder="请输入要评论的内容（最多120字）" maxlength="120"></textarea>
        <van-button type="primary" size="large" @click="postComment">发表评论</van-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentlist" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.uesr_name}}&nbsp;&nbsp;发表时间:{{item.add_time}}
                </div>
                <div class="cmt-body">
                    {{item.content===(''||'undefined')?"此用户很懒":item.content}}
                </div>
            </div>
        </div>
        <van-button type="danger" size="large" plain @click="getMore">加载更多</van-button>
    </div>
</template>
 
<script>
import {button} from 'vant'
import axios from 'axios'
import {Toast} from 'vant'
export default {
    data() {
        return {
            pageindex:1,//默认展示第一页数据
            commentlist:[],
            msg:''
        }
    },
    created(){
        // this.getComments()
    },
    methods:{
        getComments(){
            axios.get('http://www.liulongbin.top:3005/api/getcomments/'+'13'+'?pageindex='+'1').then(result=>{
                if(result.data.status===0){
                    console.log(result)
                    // this.commentlist = result.da.message
                    this.commentlist = this.commentlist.concat(result.data.message)
                }else{
                    Toast('加载评论失败')
                }
            })
        },
        getMore(){//加载更多
            this.pageindex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim()===''){
                return Toast("评论内容不能为空")
            }
            //参数1：url地址
            //参数2：提交给服务器的数据对象{content:this.msg}
            //参数3：定义提交时候，表单中数据的格式{emulateJSON:true}
            axios.post('http://www.liulongbin.top:3005/api/postcomment/'+'13',{content:this.msg.trim()}).then(result=>{
                    console.log(result)
                    if(result.data.status===0){
                        var cmt = {
                            uesr_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()}
                        };
                        console.log(cmt)
                    this.commentlist.unshift(cmt);
                    
                    this.msg='';
                })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    margin-top: 40px;
    h3{
        font-size: 18px;
    }
    textarea{
        width: 100%;
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;

            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
