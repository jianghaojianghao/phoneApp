<template>
    <header class="header" :style="{background:selectMenu.bgcolor}">
        <span class="header-home">
            <router-link to="/">首页</router-link>
        </span>
        <h4 class="header-title">{{selectMenu.title ? selectMenu.title:'电影'}}</h4>
    </header>
</template>


<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  color: #fff;
  background-color: #e54847;

  &-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-home {
    line-height: 1rem;
    margin-left: 0.2rem;
    & a{
        color: #fff;
        outline: none;
        -webkit-tap-highlight-color:rgba(255,0,0,0);
    }
  }
}
</style>


<script>
import movie from '@/views/Movie.vue'
    export default{
        props:['selectMenu','menulist'],
    }
</script>
