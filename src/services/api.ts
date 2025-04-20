import axios from 'axios';
import { Movie, MovieDetails, Genre } from '../types';

// Base URL for TMDB API
const API_BASE_URL = 'https://api.themoviedb.org/3';

// API key
const API_KEY = 'f6a38c12d0f9859fbb2ad393c542ba9c';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Helper to transform data for consistency
const transformMovieData = (data: any[]): Movie[] => {
  return data.map(item => ({
    ...item,
    title: item.title || item.name || 'Unknown Title',
  })).filter(item => item.backdrop_path && item.poster_path);
};

// Get trending movies and shows
export const getTrending = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/trending/all/week');
    return transformMovieData(response.data.results);
  } catch (error) {
    console.error('Error fetching trending items:', error);
    return [];
  }
};

// Get popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular');
    return transformMovieData(response.data.results);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get popular TV shows
export const getPopularTVShows = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/tv/popular');
    return transformMovieData(response.data.results);
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

// Get top rated movies
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/top_rated');
    return transformMovieData(response.data.results);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Get movie or TV show details
export const getDetails = async (id: string, mediaType: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return null;
  }
};

// Search movies and TV shows
export const searchContent = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  
  try {
    const response = await api.get('/search/multi', {
      params: { query }
    });
    return transformMovieData(response.data.results.filter(
      (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
    ));
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};

// Get all genres
export const getGenres = async (): Promise<Record<number, string>> => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      api.get('/genre/movie/list'),
      api.get('/genre/tv/list')
    ]);
    
    const genres: Record<number, string> = {};
    [...movieGenres.data.genres, ...tvGenres.data.genres].forEach((genre: Genre) => {
      genres[genre.id] = genre.name;
    });
    
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {};
  }
};

export default api;