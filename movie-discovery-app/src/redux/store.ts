import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movieSlice'
import favoritesReducer from './favoritesSlice'
import type { TypedUseSelectorHook } from 'react-redux' 
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoritesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector