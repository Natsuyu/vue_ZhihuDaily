<style lang="scss" scoped>
    .m-header {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        z-index: 99;
        padding: 0 15px;
        .z-back {
            width: 50px;
            cursor: pointer;
        }
        .z-option {
            float: right
        }
    }
    
    .m-title {
        margin-top: 51px;
        height: 200px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .title {
            position: absolute;
            bottom: 20px;
            color: #fff;
            padding: 0 20px;
        }
    }
    
    .m-content {
        padding: 52px 0 55px;
        position: relative;
        .img-title {
            position: absolute;
            top: 190px;
            left: 0;
            padding: 0 15px;
            color: #fff;
            font-size: 20px;
        }
        .img-source {
            position: absolute;
            top: 230px;
            right: 10px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 12px;
        }
    }
    
    .m-footer {
        height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        .item {
            float: left;
            width: 25%;
            height: 100%;
            text-align: center;
        }
        .iconfont {
            line-height: 30px;
            height: 30px;
        }
    }
</style>
<template>
    <div class="m-header">
        <span class="z-back"><a v-link="{ path: '/' }" class="iconfont">&#xe60b;</a></span>
        <span class="z-option iconfont">&#xe609;</span>
    </div>
    <!-- <div class="m-title">
        <div class="img"><img :src="headImg" alt=""></div>
        <div class="title">{{title}}</div>
    </div> -->
    <div class="m-content">
        {{{ body }}}
        <div class="img-title">{{ title }}</div>
    </div>
    <div class="m-footer">
        <div class="item z-wcmt"><div class="iconfont">&#xe604;</div>写评论</div>
        <div class="item z-jump"><div class="iconfont">&#xe600;</div>转推</div>
        <div class="item z-favour"><div class="iconfont">&#xe60d;</div>赞</div>
        <div class="item rcmt"><div class="iconfont">&#xe605;</div>点评</div>
    </div>
</template>
<script>
    var jq = require("../../static/jquery.js")
    module.exports = {
        data: function() {
            return {
                style: ""
            }
        },
        route: {
            // data: function() {
            //     var id = this.$route.params.id,
            //         that = this
            //     return jq.ajax({
            //         url: "/news/" + id
            //     }).then(function(data) {
            //         console.log(data)
            //         var tmp = data.css[0].split('/')
            //         tmp[2] = "localhost:8080"
            //         jq.ajax({
            //             url: tmp.join('/')
            //         }).then(function(res) {
            //             that.style = res.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
            //         })
            //         return {
            //             title: data.title,
            //             headImg: that.getSrc(data.image),
            //             img: that.getSrc(data.images[0]),
            //             body: that.getSrc(data.body),
            //             styleLink: data.css[0],
            //             imgSource: data.image_source
            //         }
            //     })
            // },
            data: function() {
                return this.$http.get('/news/' + this.$route.params.id).then((response) => {
                    console.log(response)
                    return response.json()
                })
            }
        },
        // ready: function() {
        //     this.$http.get(this.css[0]).then((response) => {
        //         console.log(response)
        //         this.style = response
        //     })
        // },

        methods: {
            getSrc: function(src) {
                var tmp = src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
                return tmp
            },
            getStyle: function() {
                var url = this.css[0],
                    that = this
                console.log(url)
                return this.$http.get("/" + url.split("/").slice(3).join("/")).then((response) => {
                    console.log(response)
                    that.style = response.data

                })
            }
        },
        watch: {
            'headImg': function() {
                var sel = document.querySelector(".img-place-holder")
                sel.style.cssText = "background: url(" + this.headImg + ");"
            },
            'css': function() {
                if (this.css)
                    this.getStyle()
            }
        }

    }
</script>