import axios from 'axios';
import type { Movie, ApiResponse } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<ApiResponse<Movie>> => {
  const endpoint = query 
    ? `/search/movie` 
    : '/movie/popular';
  
  const response = await axios.get(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  
  return response.data;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  );
  return response.data;
};