<template>
    <ul class="clearfix">
        <li v-for="(item,index) in $store.state.photoList" class="photo" @click="Detail(index)" :key="item.src">
            <img :src="item.src" alt="">
        </li>
    </ul>
</template>


<script>
import axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper'
    export default {
        created(){
            this.$emit('switchTab','picture');
            axios.get("/data/photodata.json").then(res => {
                this.$store.commit('setPhotolist',res.data.photoData);
            })
        },
        methods:{
            Detail(index){
                this.$router.push(`/picturedetail/${index}`);
            }
        }
    }
</script>

<style scoped>
.clearfix::after{
    content: '';
    display: block;
    clear: both;
}
    .photo{
        float: left;
        width: 50%;
    }
</style>