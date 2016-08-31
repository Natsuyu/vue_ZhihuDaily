<style lang="scss" scoped>
    .m-nav {
        overflow: hidden;
        position: relative;
        box-shadow: 2px 2px 2px #ccc;
        .item {
            float: left;
            width: 33.33%;
            height: 40px;
            line-height: 40px;
            background-color: #009dd7;
            text-align: center;
            a {
                color: #fff;
                width: 100%;
                display: inline-block;
            }
        }
        .flowFocus {
            width: 33.33%;
            height: 2px;
            background-color: #fff;
            position: absolute;
            transition: all 0.3s;
            left: 0;
            bottom: 0;
        }
    }
    
    .m-header {
        height: 50px;
        background-color: #009dd7;
        line-height: 50px;
        color: #fff;
        padding: 10px;
    }
    
    .mask {
        position: fixed;
        top: 110px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
    }
</style>
<template>
    <div class="m-header">
        <span>读读日报</span>
        <i class="search iconfont"></i>
        <i class="add iconfont"></i>
    </div>
    <div class="m-nav">
        <div class="flowFocus" v-bind:style="{ left: left+'%' }"></div>
        <div class="item" v-for="item in items">
            <a v-link="{path: item.href}" data-index="{{ $index }}" @click="flowBanner">{{item.title}}</a>
        </div>
    </div>
    <div class="m-mask">
        <div class="wrapper"><img src="../assets/logo.png" alt=""></div>
    </div>
    <router-view :init.sync="init" :date.sync="date"></router-view>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                left: 0,
                date: 0,
                init: false,
                items: [{
                    href: "/",
                    title: "首页"
                }, {
                    href: "/explore",
                    title: "发现"
                }, {
                    href: "/message",
                    title: "消息"
                }]
            }
        },
        methods: {
            flowBanner: function(event) {
                var dom = event.target,
                    index = dom.getAttribute('data-index')
                this.left = index * 33.33
            }
        },
        watch: {

        }

    }
</script>