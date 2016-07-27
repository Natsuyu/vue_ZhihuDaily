<style lang="scss">
a
{
    color:#000;
    text-decoration: none;   
}
.wrapper
{
    width: 100%;
    background-color: #eee;
    .box
    {
        width: 100%;
        box-sizing: border-box;
        padding:10px;
        background-color: #fff;
        margin-bottom: 5px;
    }
    img
    {
        float:left;
        border-radius: 3px;
    }
    .m-head
    {
        height: 30px;
        img
        {
            width: 30px;
            height:30px;
        }
        .msg-from, .time
        {
            margin-left:40px;
        }
    }
    .m-body
    {
        margin: 10px 0;
        overflow: hidden;
        .title
        {
            padding:10px 5px;
            margin-left: 50px;
        }
        img
        {
            width: 50px;
            height: 50px;
        }
    }
    .m-footer
    {
        height: 30px;
        margin: 10px 0;
        .cmt, .favour
        {
            float: left;
            width: 50px;
            height: 20px;
            line-height: 20px;
            padding:0 10px;
            // box-sizing: border-box;
        }
        .cmt 
        {
            border-right: 1px solid #c3c3c3;
        }
        .detail
        {
            float: right;
        }
    }
}
</style>
<template>
    <div class="wrapper" v-on:scroll="toLoad">
        <div class="box" v-for="data in datas">
            <div class="m-head">
                <div class="pic"><img :src="getSrc(data.images[0])" alt=""></div>
                <div class="msg-from">知乎日报</div>
                <div class="time">{{date}}</div>
            </div>
            <div class="m-body">
                <div class="pic"><img :src="getSrc(data.images[0])" alt=""></div>
                <div class="title"><a v-link="getHref(data.id)">{{data.title}}</a></div>
            </div>
            <div class="m-footer">
                <div class="cmt"><i class="iconfont">&#xe608;</i>{{data.comments}}</div>
                <div class="favour"><i class="iconfont">&#xe60d;</i>{{data.favour}}</div>
                <div class="detail"><i class="iconfont">&#xe607;</i></div>
            </div>
        </div>
    </div>
</template>
<script>
    var jq = require('jquery')
    var setting = require("../../setting.js"),
        url = setting.indexUrl
    var clientHeight, boxHeight, screenHeight, scrollTop
    module.exports = {
        route: {
            data: function(){
                return this.getData()
            }
        },
        data: function(){
            return {
                test: "hehe",
                datas: [],
                date: 0,
                onLoading: false
            }
        },
        ready: function(){
            console.log("I am ready")                       //however ready is not equal to loaded...
            clientHeight = document.body.clientHeight
            screenHeight = window.screen.height
            window.onscroll = this.toLoad
        },

        methods: {
            getHref: function(href){
                return "/article/"+href
                // return "http://news-at.zhihu.com/api/4/news/"+href
            },
            getSrc: function(src){
                return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
            },
            toLoad: function(){
                if(this.onLoading) return
                clientHeight = document.body.clientHeight
                screenHeight = window.screen.height
                scrollTop = window.scrollY
                console.log(clientHeight, screenHeight)
                if(clientHeight-scrollTop <= screenHeight) {
                    this.onLoading = true
                    this.getData()
                }
            },
            getData: function(ndate){
               var url = "http://localhost:8080/api/4/news/latest",
                   that = this
               if(this.date) url="http://localhost:8080/api/4/news/before/"+this.date
               if(this.datas) console.log(this.datas)
               console.log(url)
               return jq.ajax({
                        url: url,
                        type: 'get'
                    }).then(function(res){
                        console.log(res)
                        var x = res.stories.forEach(function(item){
                            jq.ajax({
                                url: 'http://localhost:8080/api/4/story-extra/'+item.id,
                            }).then(function(res){
                                console.log("Add!!")
                                item.favour = res.popularity
                                item.comments = res.comments
                                that.datas.push(item)
                            })
                        })
                        that.date = res.date
                        that.onLoading = false
                })
            }
        }
        
    }
</script>