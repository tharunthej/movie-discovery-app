import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMovies, fetchMovieDetails } from '../services/api'
import type { Movie, ApiResponse } from '../types'

interface MoviesState {
  movies: Movie[]
  currentMovie: Movie | null
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
}

const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
}

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page }: { query: string; page: number }) => {
    return await fetchMovies(query, page)
  }
)

export const getMovieDetails = createAsyncThunk(
  'movies/details',
  async (id: number) => {
    return await fetchMovieDetails(id)
  }
)

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results
        state.totalPages = action.payload.total_pages
        state.currentPage = action.meta.arg.page
        state.loading = false
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch movies'
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.currentMovie = action.payload
        state.loading = false
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch movie details'
      })
  }
})

export default movieSlice.reducer