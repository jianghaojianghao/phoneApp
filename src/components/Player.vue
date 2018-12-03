<template>
    <div>
        <div class="message">
            <div :style="{background:'url('+selectedimg+')no-repeat center/cover'}" class="message-mask"></div>
            <div class="message-img">
                <img :src="selectedimg" alt="" >
            </div>
            <div class="message-ul">
                <ul>
                    <li><h3>{{title}}</h3></li>
                    <li>{{author}}</li>
                </ul>
                <ul class="message-control clearfix"> 
                  <li class="iconfont icon-ai10" @click="goback"></li>
                  <li class="iconfont icon-bofang" v-show="!isplay" @click="play"></li>
                  <li class="iconfont icon-stop" v-show="isplay" @click="pause"></li>  
                  <li class="iconfont icon-ai09" @click="goto"></li>              
                  <li id="message-control-songlist" @click="musiclistshow" class="message-control-songlist">歌单</li>
                </ul>
            </div>
        </div>
        <div class="musicWord" ref="musicWord">
          <ul>
            <li v-for="(item,index) in musicword" :key="index" :class="wordIndex == index?'selected':''">
              {{item.word}}
            </li>
          </ul>
        </div>
        <transition name="slide">
          <ul class="musicList" v-show="isshow">
                  <li v-for="(music,index) in musiclist" :key="index" class="musicList-li" :class="['musicList-li', Nowindex == index?'selected':'']" @click="selected(music,index)">
                      {{music.title}}
                  </li>
              </ul>
        </transition>  
        <div class="audio">
          <ul class="audio-ul"> 
            <li class="iconfont icon-danquxunhuan" v-show="issimple" @click="changeplay"></li>
            <li class="iconfont icon-xunhuan" v-show="iscycli" @click="changeplay"></li>
            <li class="iconfont icon-icon-" v-show="israndom" @click="changeplay"></li>
          </ul>
          <audio ref="musicAudio" @play="isplay=true" @pause="isplay=false" :src="selectedsrc" autoplay controls class="audio-play"></audio>  
        </div>

    </div>
</template>

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script>
import icon from "@/assets/icon/iconfont.css";
import axios from "axios";
export default {
  props: ["musiclist"],
  data() {
    return {
      Nowindex: -1,
      selectedimg:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=375641047,844994122&fm=27&gp=0.jpg",
      selectedlist: {},
      isplay: false,
      isshow: true,
      title: "",
      author: "",
      selectedsrc: "",
      musicword: [],
      wordIndex: -1,
      issimple: false,
      iscycli: true,
      israndom: false
    };
  },
  methods: {
    selected(music, index) {
      this.Nowindex = index;
    },
    play() {
      this.$refs.musicAudio.play();
    },
    pause() {
      this.$refs.musicAudio.pause();
    },
    musiclistshow() {
      this.isshow = !this.isshow;
    },
    goback() {
      this.Nowindex--;
      if (this.Nowindex == -1) {
        this.Nowindex = this.musiclist.length - 1;
      }
    },
    goto() {
      this.Nowindex++;
      if (this.Nowindex == this.musiclist.length) {
        this.Nowindex = 0;
      }
    },
    parseWord(test) {
      let word = test.split("\n");
      word.forEach(elem => {
        let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
        if (time != null) {
          let musicword = elem.split(time)[1];
          let musictime = time[0];
          let timeReg = musictime.split(/\[(\d{2}):(\d{2}).(\d{2})\]/);
          let time2second =
            parseInt(timeReg[1] * 60) +
            parseInt(timeReg[2]) +
            parseInt(timeReg[3] / 1000);
          this.musicword.push({
            time: time2second,
            word: musicword
          });
        }
      });
    },
    changeplay(){
      if(this.iscycli == true){
        this.issimple = true;
        this.iscycli = false;
      }else if(this.issimple == true){
        this.israndom = true;
        this.issimple = false
      }else if(this.israndom == true){
        this.iscycli = true;
        this.israndom = false;
      }
      return false;
    }
  },
  watch: {
    Nowindex() {
      let nowMusic = this.musiclist[this.Nowindex];
      this.selectedimg = nowMusic.musicImgSrc;
      this.selectedsrc = nowMusic.src;
      this.title = nowMusic.title;
      this.author = nowMusic.author;
      axios.get("/" + nowMusic.lrc).then(res => {
        this.parseWord(res.data);
      });
      this.musicword = [];
      this.wordIndex = -1;
    }
  },
  mounted() {
    let musicAudio = this.$refs.musicAudio;
    this.$refs.musicAudio.addEventListener("timeupdate", () => {
      let currentTime = musicAudio.currentTime;
      this.musicword.forEach((elem, index) => {
        if(index < this.musicword.length-1){
          if (currentTime > elem.time && currentTime < this.musicword[index + 1].time) {
          this.wordIndex = index;
          this.$refs.musicWord.scrollTop = (index + 1) * 30;
        }
      }
      });
    });
    this.$refs.musicAudio.addEventListener("ended", () => {
      if(this.iscycli==true){
        this.Nowindex++;
      }else if(this.issimple==true){
        this.Nowindex=this.Nowindex;
        this.play();
      }else if(this.israndom==true){
        let beforeindex = this.Nowindex;
        this.Nowindex = Math.floor(Math.random()*(this.musiclist.length));
        if(beforeindex == this.Nowindex){
          this.play()
        }
      }
      console.log(this.Nowindex)
    });
  }
}
</script>

<style lang="scss" scoped>
.musicList {
  overflow: scroll;
  height: 2rem;
  position: fixed;
  bottom: 2.0rem;
  left: 0;
  background: rgba(42, 40, 40, 0.6);
  width: 100%;
  &-li {
    color: #fff;
  }
  .selected {
    background: rgb(16, 196, 43);
  }
}
.message {
  position: relative;
  display: flex;
  width: 100%;
  text-align: center;
  &-img {
    flex-grow: 1;
    width: 0;
  }
  &-ul {
    flex-grow: 2;
    width: 0;
    text-align: center;
    color: #ffffff;
  }
  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(20px);
  }
  &-control {
    display: inline-block;
    li {
      float: left;
      font-size: 0.4rem;
      text-align: center;
    }
    &-songlist {
      position: absolute;
      right: 0.2rem;
    }
    #message-control-songlist {
      font-size: 0.3rem;
      margin-top: 0.1rem;
    }
  }
}

.slide {
  &-enter {
    transform: translateY(100%);
    &-to {
      transform: translateY(0);
    }
    &-active {
      transition: transform 1s ease;
    }
  }
  &-leave {
    transform: translateY(0);
    &-to {
      transform: translateY(100%);
    }
    &-active {
      transition: transform 1s ease;
    }
  }
}

.audio {
  bottom: 1rem;
  position: fixed;
  height: 1rem;
  background: #f1f3f4;
  width: 100%;
  overflow: hidden;
  &-ul{
    position: absolute;
    right:.2rem;
    z-index: 1;
    top: -20%;
    transform: translateY(50%);
     li{
       font-size: .4rem
     }
  }
  &-play{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.musicWord {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 3.2rem;
  bottom: 2rem;
  z-index: -1;
  padding-top: 3rem;
  overflow: scroll;
  li {
    height: 0.5rem;
  }
  .selected {
    color: #2cec79;
    font-size: 0.4rem;
    height: 0.8rem;
  }
}
</style>