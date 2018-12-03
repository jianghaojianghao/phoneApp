<template>
    <ul class="footer" :style="{background:footerbgColor}">
        <li class="footer-menu" v-for="(menu,index) in menulist" :key="index">
          <router-link :to="menu.path"> {{menu.title}} </router-link>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1rem;
  background-color: #e54847;
  width: 100%;
  display: flex;
  line-height: 1rem;
  &-menu {
    flex-grow: 1;
    text-align: center;
    a {
      color: #fff;
      outline: none;
      -webkit-tap-highlight-color:rgba(255,0,0,0);
      &.router-link-active {
        color: #ccc;
      }
    }
  }
}
</style>

<script>

// setTimeout(function() {
// document.getElementsByClassName("router-link-active")[0].click();
// }, 0);

export default { 
  props: ['menulist','footerbgColor'],
}
</script>
