import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ChevronLeft, Star } from 'lucide-react';
import { getDetails, getPopularMovies, getPopularTVShows } from '../services/api';
import { MovieDetails, Movie } from '../types';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MovieSlider from '../components/movies/MovieSlider';
import Button from '../components/common/Button';

const MovieDetail: React.FC = () => {
  const { mediaType = '', id = '' } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();
  
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [similarContent, setSimilarContent] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!mediaType || !id) {
        setError('Invalid URL parameters');
        setIsLoading(false);
        return;
      }
      
      if (mediaType !== 'movie' && mediaType !== 'tv') {
        setError('Invalid content type');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const detailsData = await getDetails(id, mediaType);
        if (!detailsData) {
          setError('Content not found');
          return;
        }
        
        setDetails(detailsData);
        
        let similar;
        if (mediaType === 'movie') {
          similar = await getPopularMovies();
        } else {
          similar = await getPopularTVShows();
        }
        
        const filtered = similar.filter(item => item.id !== parseInt(id)).slice(0, 10);
        setSimilarContent(filtered);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [mediaType, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="border-t-4 border-netflix-red rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">{error || 'Content not found'}</h2>
        <Link to="/" className="text-netflix-red hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // Format title and release date
  const title = details.title || details.name || 'Unknown';
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  
  // Format runtime
  const formatRuntime = (minutes?: number): string => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const runtime = details.runtime 
    ? formatRuntime(details.runtime)
    : details.episode_run_time && details.episode_run_time.length > 0
      ? formatRuntime(details.episode_run_time[0])
      : '';

  return (
    <div className="bg-netflix-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* Back Button */}
        <Link to="/" className="absolute top-24 left-4 z-10 flex items-center text-white hover:text-netflix-red transition-colors">
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </Link>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black to-transparent"></div>
        </div>
      </div>
      
      {/* Content Details */}
      <div className="container mx-auto px-4 md:px-8 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img 
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={title}
              className="w-full rounded-md shadow-xl"
            />
          </div>
          
          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {title} {year && <span className="text-gray-400 font-normal">({year})</span>}
            </h1>
            
            {/* Tagline */}
            {details.tagline && (
              <p className="text-netflix-lightGray text-lg italic mb-4">{details.tagline}</p>
            )}
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center text-sm md:text-base text-netflix-lightGray mb-6 gap-x-4 gap-y-2">
              {/* Rating */}
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="font-medium">{details.vote_average.toFixed(1)}/10</span>
              </div>
              
              {/* Release Date */}
              {releaseDate && <span>{new Date(releaseDate).toLocaleDateString()}</span>}
              
              {/* Runtime */}
              {runtime && <span>{runtime}</span>}
              
              {/* Content Type */}
              <span className="border border-netflix-lightGray px-2 py-0.5 text-xs uppercase">
                {mediaType === 'movie' ? 'Movie' : 'TV Series'}
              </span>
              
              {/* Seasons (TV only) */}
              {mediaType === 'tv' && details.number_of_seasons && (
                <span>{details.number_of_seasons} Season{details.number_of_seasons !== 1 ? 's' : ''}</span>
              )}
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-white mb-2">Overview</h3>
              <p className="text-netflix-lightGray text-base md:text-lg">
                {details.overview || 'No description available.'}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                variant="primary" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                <span>Play</span>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                <span>My List</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-5 w-5" />
                <span>Rate</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Content */}
      {similarContent.length > 0 && (
        <div className="mt-16">
          <MovieSlider 
            title={`More ${mediaType === 'movie' ? 'Movies' : 'TV Shows'} Like This`} 
            movies={similarContent} 
            isPoster={true}
          />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default MovieDetail;