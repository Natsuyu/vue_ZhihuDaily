<style lang="scss">
.wrapper
{
    width: 100%;
    .box
    {
        width: 100%;
    }
}
</style>
<template>
    <div class="wrapper">
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
                <div class="cmt"><i></i><span class="num">{{data.cmtNum}}</span></div>
                <div class="favour">
                    <i></i>
                    <span class="num">{{data.favourNum}}</span>
                    <div class="detail"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var setting = require("../../setting.js"),
        url = setting.indexUrl
    module.exports = {
        route: {
            data: function(){
            // return 
               return $.ajax({
                    url: "http://localhost:8080/api/4/news/latest"
                }).then(function(res){
                    console.log(res)
                    return {
                        date: res.date,
                        datas: res.stories,
                    }
                })
            }
        },
        methods: {
            getHref: function(href){
                return "/article/"+href
                // return "http://news-at.zhihu.com/api/4/news/"+href
            },
            getSrc: function(src){
                return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
            }
        }
        
    }
</script>