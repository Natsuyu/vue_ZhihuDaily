<style scoped>
.expand-transition {
  transition: all 1s ease;
}
.expand-enter{
	opacity: 0;
	background-color: #000;
}
.expand-leave{
	opacity: 1;
	background-color: red;
}
</style>
<template>
<div class="wrapper" transition="expand">
	<h3>娘子！啊哈！</h3>
</div>

</template>
<script>
    export default {
        data: ()=>{
            return {}
        }
    }
</script>