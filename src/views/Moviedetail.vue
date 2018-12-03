<template>
    <div>
       <h1>
          <h1>{{selectMovie.title}}</h1>
        <p>{{selectMovie.summary}}</p>
       </h1>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectMovie: []
    };
  },
  created() {
    let url = `https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/subject/${
      this.$route.params.movieId
    }`;
    axios.get(url).then(res => {
      this.selectMovie = res.data;
      console.log(this.selectMovie);
    });
  }
};
</script>

<style scoped>
</style>