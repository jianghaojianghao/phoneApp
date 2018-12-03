<template>
  <div id="app">
    <CommonHeader :selectMenu="selectMenu"></CommonHeader>
    <router-view @switchTab="switchTab"/>
    <CommonFooter :menulist="menulist" :footerbgColor='selectMenu.bgcolor'></CommonFooter>
  </div>
</template>

<style lang="scss" scoped>
  #app{
    margin: 1rem 0;
  }
</style>

<script>
  import CommonHeader from '@/components/CommonHeader.vue';
  import CommonFooter from '@/components/CommonFooter.vue';   
  export default {
    components:{
      CommonHeader,
      CommonFooter,
    },
    data(){
        return{
          menulist:[
          {
            title:'电影',
            bgcolor:'#e54847',
            name:'movie',
            path:'/movie'  
          },{
            title:'音乐',
            bgcolor:'#3f51b5',
            name:'music',
            path:'/music'  
          },{
            title:'书籍',
            bgcolor:'#795548',
            name:'book',
            path:'/book'  
          },{
            title:'图片',
            bgcolor:'#009688',
            name:'picture',
            path:'/picture'  
          }
          ],
          selectMenu:{}
        }
    },
    methods:{
      switchTab(menuName){
        this.menulist.forEach(menu => {
          if(menu.name === menuName){
            this.selectMenu = menu; 
          };
        });
      }
    }

  }
</script>
