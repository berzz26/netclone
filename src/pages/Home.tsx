import React, { useState, useEffect } from 'react';
import { getTrending, getPopularMovies, getPopularTVShows, getTopRatedMovies } from '../services/api';
import { Movie } from '../types';
import HeroBanner from '../components/movies/HeroBanner';
import MovieSlider from '../components/movies/MovieSlider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  const [trendingContent, setTrendingContent] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data concurrently
        const [trending, movies, tvShows, topRated] = await Promise.all([
          getTrending(),
          getPopularMovies(),
          getPopularTVShows(),
          getTopRatedMovies()
        ]);
        
        setTrendingContent(trending);
        setPopularMovies(movies);
        setPopularTVShows(tvShows);
        setTopRatedMovies(topRated);
        
        // Set featured movie
        if (trending.length > 0) {
          // Choose a random movie from the top 5 trending items
          const randomIndex = Math.floor(Math.random() * Math.min(5, trending.length));
          setFeaturedMovie(trending[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="border-t-4 border-netflix-red rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-black min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}
      
      {/* Content Section */}
      <div className="mt-4 md:mt-8">
        {/* Trending Section */}
        {trendingContent.length > 0 && (
          <MovieSlider title="Trending Now" movies={trendingContent} />
        )}
        
        {/* Popular Movies */}
        {popularMovies.length > 0 && (
          <MovieSlider title="Popular Movies" movies={popularMovies} isPoster={true} />
        )}
        
        {/* Popular TV Shows */}
        {popularTVShows.length > 0 && (
          <MovieSlider title="Popular TV Shows" movies={popularTVShows} />
        )}
        
        {/* Top Rated Movies */}
        {topRatedMovies.length > 0 && (
          <MovieSlider title="Top Rated" movies={topRatedMovies} isPoster={true} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;