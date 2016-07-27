<style lang="scss" scoped>
    .m-nav
    {
        overflow: hidden;
        .item
        {
            float:left;
            width: 33.33%;
            height: 40px;
            line-height: 40px;
            background-color: #009dd7;
            text-align: center;
            a { color: #fff}
        }
    }
    .m-header
    {
        height:50px;
        background-color: #009dd7;
        line-height: 50px;
        color: #fff;
    }
</style>
<template>
    <div class="m-header">
        <span>读读日报</span>
        <i class="search iconfont"></i>
        <i class="add iconfont"></i>
    </div>
    <div class="m-nav">
        <div class="item" v-for="item in items"><a v-link="{path: item.href}">{{item.title}}</a></div>
    </div>
    <router-view></router-view>
</template>
<script>
    module.exports = {
        route:{
            data: function(){
                return {
                    items: [
                        { href: "/", title: "首页"},
                        { href: "/explore", title: "发现"},
                        { href: "/message", title: "消息"}
                    ]
                }
            }
        }
        
    }
</script>
