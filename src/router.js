import Vue from 'vue'
import Router from 'vue-router'

import TodoPage from './components/todo/TodoPage.vue'
import MoviePage from './components/movies/MoviePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo-page',
      component: TodoPage
    },
    {
      path: '/movies',
      name: 'movies-page',
      component: MoviePage
    }
  ]
})
