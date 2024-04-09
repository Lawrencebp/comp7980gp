import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', () => {
    const movieId = ref('')
    const movieName = ref('')

    const setMovieName = value => {
      movieName.value = value
    }

    return {
        movieId,
        movieName,
        setMovieName
    }
})
