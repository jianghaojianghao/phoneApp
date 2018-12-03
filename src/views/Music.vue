<template>
    <player :musiclist="musiclist.musicData"></player>
</template>

<script>
import axios from 'axios';
import player from '@/components/Player.vue'

    export default {
        data(){
            return{
                musiclist:{}
            }
        },
        created(){
            this.$emit('switchTab','music');
            axios.get('/data/musicdata.json').then(res => {
                this.musiclist = res.data;
            });
        },
        components:{
            player
        }
    }
</script>

<style scoped>

</style>