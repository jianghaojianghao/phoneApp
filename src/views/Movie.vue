<template>
    <div class="contain">
        <ul>
           <li v-for="item in movie" :key="item.id" class="movie" @click="Moviedetail(item)">
               <div class="movie-img">
                   <img :src=item.images.large alt="">
               </div>
               <div class="movie-content">
                   <ul>
                       <li>{{item.title}}</li>
                       <li><span>评分:</span><span>{{item.rating.average}}</span></li>
                       <li><span>主演:</span><span v-for="casts in item.casts">{{casts.name}}&nbsp;</span></li>
                   </ul>
               </div>
           </li>
        </ul>
        <div class="loading" v-show="isloading">
            <img src="@/assets/timg.gif" alt="">
        </div>
        <div v-show="isend" class="end">
            <span>到底了</span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movie: [],
      isloading: false,
      isend: false,
    };
  },
  methods: {
    getDate() {
      let url = "https://bird.ioliu.cn/v2?url=https://api.douban.com//v2/movie/in_theaters";
      this.isloading = true;
      axios.get(url).then(res => {
        let getlist = res.data.subjects.slice(
          this.movie.length,
          this.movie.length + 5
        );
        if(getlist.length<5){
            this.isend = true;
        };
        this.movie = this.movie.concat(getlist);
        this.isloading = false;
        // console.log(res.data.subjects);
        // console.log(this.movie);
      });
    },
    Moviedetail(item){
      this.$router.push(`/moviedetail/${item.id}`)
    }
  },
  created() {
    this.$emit("switchTab", "movie");
    this.getDate();
  },
  mounted() {
    window.onscroll = () => {
      let scrollTopc = Math.ceil(document.documentElement.scrollTop) || Math.ceil(document.body.scrollTop);
      let scrollTopf = Math.floor(document.documentElement.scrollTop) || Math.ceil(document.body.scrollTop);
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if ((scrollHeight == scrollTopc + clientHeight || scrollHeight == scrollTopf + clientHeight) && !this.isend) {
        this.getDate();
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.contain {
  margin: 0.2rem;
}

.movie {
  width: 100%;
  display: flex;
  margin-top: 0.2rem;

  &-img {
    flex-grow: 1;
    width: 0;
  }

  &-content {
    flex-grow: 3;
    width: 0;
    padding-left: 0.2rem;
  }
}

.loading {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  img {
  }
}

.end{
    width: 100%;
    text-align: center;
}
</style>