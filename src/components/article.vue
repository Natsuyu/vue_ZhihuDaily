<template>
    <div class="m-header">
        <div class="iconfont z-back"></div>
        <div class="title">文章</div>
        <div class="option"></div>
    </div>
    <div class="m-title">
        <div class="img"><img :src="{getSrc(headImg)}" alt=""></div>
        <div class="title">{{title}}</div>
    </div>
    <div class="m-content">
        <div class="m-header">
            <div class="img"><img :src="" alt=""></div>
            <!--<div class="author">{{author}}</div>-->
        </div>
        <div class="m-content">{{{body}}}</div>
        <div class="m-footer">
            <div class="iconfont z-wcmt"></div>
            <div class="iconfont z-jump"></div>
            <div class="iconfont z-favour"></div>
            <div class="iconfont rcmt"></div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        route: {
            data: function(){
                // console.log("Here!!!:"+id)
                var id = this.$route.params.id
                return $.ajax({
                    url: "http://localhost:8080/news/"+id
                }).then(function(data){
                    console.log(data)
                    return {
                        title: data.title,
                        headImg: data.image,
                        authorImg: data.images[0],
                        body: data.body,
                        // author: data.recommenders
                    }
                })
            },
            methods: {
                getSrc: function(src){
                    return src.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
                }
            }
        }
    }
</script>