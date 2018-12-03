<template>
<router-link to="/picture">
    <v-touch @swipeleft="left" @swiperight="right" :style="{background:'url('+imgsrc+') no-repeat center/contain #000'}" class="img">
    </v-touch>
</router-link>
    
</template>

<script>
export default {
  data() {
    return {
      nowIndex: -1,
      imgsrc: ""
    };
  },
  created() {
    this.nowIndex = this.$route.params.photoindex;
  },
  watch: {
    nowIndex() {
        let img = this.$store.state.photoList[this.nowIndex].src;
      if (img) {
        this.imgsrc = img;
      }
    }
  },
  methods:{
      right(){
          this.nowIndex--;
          if(this.nowIndex==-1){
              this.nowIndex = this.$store.state.photoList.length-1;
          }
      },
      left(){
          this.nowIndex++;
          if(this.nowIndex == this.$store.state.photoList.length){
              this.nowIndex = 0;
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.img{
    position: absolute;
    left: 0;
    right: 0;
    top: 1rem;
    bottom: 1rem;
}
</style>