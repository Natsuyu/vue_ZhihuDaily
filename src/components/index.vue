<style lang="scss">
    $pic-size: 60px;
    .wrapper {
        font-size: 0.8rem;
        width: 100%;
        background-color: #eee;
        .box {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            background-color: #fff;
            margin-bottom: 5px;
        }
        img {
            float: left;
            border-radius: 3px 0 0 3px;
        }
        .m-head {
            height: 30px;
            img {
                width: 30px;
                height: 30px;
            }
            .msg-from,
            .time {
                margin-left: 40px;
            }
        }
        .msg-from {
            color: #009dd7;
        }
        .m-body {
            margin: 10px 0;
            overflow: hidden;
            position: relative;
            .title {
                height: $pic-size;
                padding: 0 15px 0 5px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: 0;
                border-radius: 0 3px 3px 0;
                display: table;
                width: calc(100% - 60px);
            }
            a {
                width: 100%;
                height: 100%;
                vertical-align: middle;
                display: table-cell;
            }
            img {
                width: $pic-size;
                height: $pic-size;
            }
        }
        .m-footer {
            height: 30px;
            margin: 10px 0;
            .cmt,
            .favour {
                float: left;
                width: 30px;
                height: 20px;
                line-height: 20px;
                padding: 0 10px;
                // box-sizing: border-box;
            }
            .cmt {
                border-right: 1px solid #c3c3c3;
            }
            .detail {
                float: right;
            }
        }
    }
</style>
<template>
    <div class="wrapper" v-on:scroll="toLoad" v-for="perDay in Days" transition="loading">
        <div class="box" v-for="data in perDay">
            <div class="m-head">
                <div class="pic"><img src="../assets/app_logo.png"></div>
                <div class="msg-from">知乎日报</div>
                <div class="time">{{date}}</div>
            </div>
            <div class="m-body">
                <div class="pic"><img :src="data.images[0]" alt=""></div>
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
    var jq = require("../../static/jquery.js")
    var setting = require("../../setting.js"),
        url = setting.indexUrl
    var clientHeight, boxHeight, screenHeight, scrollTop
    module.exports = {
        data: function() {
            return {
                Days: [],
                onLoading: false
            }
        },
        props: ['date', 'init'],
        route: {
            data: function() {
                if (!this.date) {
                    return this.getData()
                } else {
                    return this.getStorage()
                }
            },
            canDeactivate: function() {
                this.setStorage()
            }
        },
        ready: function() {
            window.onscroll = this.toLoad
        },
        methods: {
            getHref: function(href) {
                return "/article/" + href
            },
            toLoad: function() {
                if (this.onLoading) return
                clientHeight = document.body.clientHeight
                screenHeight = window.screen.height
                scrollTop = window.scrollY
                console.log(clientHeight, screenHeight)
                if (clientHeight - scrollTop <= screenHeight) {
                    this.onLoading = true
                    this.getData()
                }
            },

            getData: function() {
                var url = "/api/4/news",
                    arr = null,
                    that = this
                if (this.date) url += "/before/" + this.date
                else url += "/latest"
                return this.$http.get(url).then((response) => {
                    var res = response.json()
                    that.date = res.date
                    arr = res.stories
                    return that.getExtra(arr)
                }, (err) => {
                    console.log(err)
                }).then((res) => {
                    that.Days.push(arr)
                    console.log("Days:", that.Days)
                    that.onLoading = false
                })
            },

            getExtra: function(res) {
                var that = this
                return Promise.all(res.map(function(item) {
                    return that.$http.get('/api/4/story-extra/' + item.id)
                        .then(function(response) {
                            var res = response.json()
                            item.favour = res.popularity
                            item.comments = res.comments
                        })
                }))
            },

            getUpdate: function() {
                if (this.onLoading) return
                scrollTop = window.scrollY
                if (scrollTop <= 0) {
                    this.onLoading = true
                    this.getData(true)
                }
            },

            setStorage: function() {
                sessionStorage.setItem(this.date, JSON.stringify(this.Days))
                console.log(this.date, this.getStorage())
            },

            getStorage: function() {
                this.Days = JSON.parse(sessionStorage.getItem(this.date))
            }
        }
    }
</script>