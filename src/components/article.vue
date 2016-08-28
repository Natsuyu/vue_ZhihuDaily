<style lang="scss" scoped>
    .m-header
    {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #000;
        box-sizing: border-box;
        position: fixed;
        top:0; left:0;
        width: 100%;
        background-color: #fff;
        z-index: 99;
        .z-back
        {
            width:50px;
            cursor: pointer;
        }
        .z-option
        {
            float: right
        }
    }
    .m-title
    {
        margin-top: 51px;
        height: 200px;
        position: relative;
        img
        {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .title
        {
            position: absolute;
            bottom: 20px;
            color:#fff;
            padding:0 20px;
        }
    }
    .m-content
    {
        padding: 52px 15px 55px;

    }
    .m-footer
    {
        height: 50px;
        position: fixed;
        bottom:0; left:0;
        width: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        .item
        {
            float: left;
            width: 25%;
            height: 100%;
            text-align: center;
        }
        .iconfont
        {
            line-height: 30px;
            height: 30px;
        }
    }
    
</style>
<template>
    <div class="m-header">
        <span class="z-back"><a v-link="{ path: '/' }" class="iconfont">&#xe60b;</a></span>
        文章
        <span class="z-option iconfont">&#xe609;</span>
    </div>
    <!-- <div class="m-title">
        <div class="img"><img :src="headImg" alt=""></div>
        <div class="title">{{title}}</div>
    </div> -->
    <div class="m-content">
        {{{ body }}}
    </div>
    <div class="m-footer">
        <div class="item z-wcmt"><div class="iconfont">&#xe604;</div>写评论</div>
        <div class="item z-jump"><div class="iconfont">&#xe600;</div>转推</div>
        <div class="item z-favour"><div class="iconfont">&#xe60d;</div>赞</div>
        <div class="item rcmt"><div class="iconfont">&#xe605;</div>点评</div>
    </div>
</template>
<script>
    var jq = require('jquery')
    module.exports = {
        data: function(){
            return {
                style: ""
            }
        },
        route: {
            data: function(){
                var id = this.$route.params.id,
                    that = this
                return jq.ajax({
                    url: "http://localhost:8080/news/"+id
                }).then(function(data){
                    var tmp = data.css[0].split('/')
                    tmp[2] = "localhost:8080"
                    jq.ajax({
                        url: tmp.join('/')
                    }).then(function(res){
                        that.style = res.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
                    })
                    return {
                        title: data.title,
                        headImg: that.getSrc(data.image),
                        img: that.getSrc(data.images[0]),
                        body: that.getSrc(data.body),
                        styleLink: data.css[0]
                    }
                })
            },
        
        },
        methods: {
            getSrc: function(src){
                var tmp = src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
                return tmp
            }
        },
        watch: {
            'headImg': function(){
                var sel = document.querySelector(".img-place-holder")
                console.log("I am sel: ")
                console.log(sel)
                sel.style.cssText = "background: url(" + this.headImg + ");"
            }
        }

    }
</script>