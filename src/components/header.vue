<style lang="scss">
    .m-nav
    {
        .item
        {
            width: 33%;
        }
    }
</style>
<template>
    <div class="m-header">
        <div class="logo"><img src="" alt=""></div>
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
</script>
