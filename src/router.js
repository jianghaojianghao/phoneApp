import Vue from 'vue';
import Router from 'vue-router';
import Movie from '@/views/Movie';
import Music from '@/views/Music';
import Picture from '@/views/Picture';
import Book from '@/views/Book';
import Moviedetail from '@/views/Moviedetail.vue';
import Picturedetail from '@/views/Picturedetail.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/movie',
    },{
      path: '/movie',
      name: 'movie',
      component: Movie,
    },{
      path:'/music',
      name:'music',
      component:Music,
    },{
      path:'/book',
      name:'book',
      component:Book,
    },{
      path:'/picture',
      name:'picture',
      component:Picture,
    },{
      path:'/moviedetail/:movieId',
      name:'moviedetail',
      component:Moviedetail,
    },{
      path:'/picturedetail/:photoindex',
      name:'picturedetail',
      component:Picturedetail,
    }
  ],
});
