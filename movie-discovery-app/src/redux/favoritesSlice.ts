import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../types' 

interface FavoritesState {
  favorites: Movie[]
}

const loadFavorites = (): Movie[] => {
  const saved = localStorage.getItem('favoriteMovies')
  return saved ? JSON.parse(saved) : []
}

const initialState: FavoritesState = {
  favorites: loadFavorites()
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!state.favorites.some(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload)
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favorites))
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload)
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favorites))
    }
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer