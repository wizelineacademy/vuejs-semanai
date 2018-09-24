import Vue from 'vue'
import Vuex from 'vuex'

import MovieService from './services/MovieService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hello: 'world',
    movies: [],
    genres: [],
    savedMovies: [],
    selectedGenre: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    currentSection: 'discover'
  },
  actions: {
    fetchMovies (context, page = 1) {
      context.commit('setLoading', true)
      MovieService.getMovies({
        page,
        genre: context.state.selectedGenre
      })
      .then(response => {
        context.commit('setMovies', response.data)
      })
      .finally(() => context.commit('setLoading', false))
    },
    fetchGenres (context) {
      MovieService.getGenres()
      .then(response => {
        context.commit('setGenres', response.data)
      })
    },
    fetchByGenre (context, genre) {
      context.commit('setSelectedGenre', genre)
      context.dispatch('fetchMovies')
    },
    fetchPage (context, page) {
      context.dispatch('fetchMovies', page)
    }
  },
  mutations: {
    setMovies (state, moviesData) {
      state.movies = moviesData.results
      state.pages = moviesData.total_pages
      state.currentPage = moviesData.page
    },
    setGenres (state, genresData) {
      state.genres = genresData.genres
    },
    setSelectedGenre (state, genre) {
      state.selectedGenre = genre
    },
    setLoading (state, isLoading) {
      state.loading = isLoading
    },
    setSection (state, section) {
      state.currentSection = section
    },
    saveMovie (state, movie) {
      state.savedMovies.push(movie)
    },
    removeSavedMovie (state, movie) {
      const movieIndex = this.getters.savedMoviesIds.indexOf(movie.id)
      if (movieIndex > -1) {
        state.savedMovies.splice(movieIndex, 1)
      }
    }
  },
  getters: {
    movieCards (state) {
      if (state.currentSection === 'backlog') {
        return state.savedMovies
      }

      const imageBasePath = 'http://image.tmdb.org/t/p/w370_and_h556_bestv2'
      return state.movies.map(movie => ({
        id: movie.id,
        image: `${imageBasePath}${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        voteAverage: movie.vote_average
      }))
    },
    selectedGenreName (state) {
      const genre = state.genres.filter(genre => genre.id === state.selectedGenre)
      return genre[0] ? genre[0].name : null
    },
    savedMoviesIds (state) {
      if (!state.savedMovies) return []
      return state.savedMovies.map(movie => movie.id)
    }
  }
})
